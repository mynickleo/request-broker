package services

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"request-broker/internal/interfaces"
	"request-broker/internal/models"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type QueueService struct {
	collection     *mongo.Collection
	archiveService interfaces.ArchiveService
}

func NewQueueService(db *mongo.Database, archiveService interfaces.ArchiveService) *QueueService {
	return &QueueService{
		collection:     db.Collection("queue"),
		archiveService: archiveService,
	}
}

func (s *QueueService) AddToQueue(item *models.Queue) error {
	now := time.Now()
	item.CreatedAt = now
	item.UpdatedAt = now

	_, err := s.collection.InsertOne(context.TODO(), item)
	return err
}

func (s *QueueService) GetAll(page, limit int) ([]models.Queue, int64, error) {
	skip := (page - 1) * limit
	opts := options.Find().SetSkip(int64(skip)).SetLimit(int64(limit))

	cursor, err := s.collection.Find(context.TODO(), bson.M{}, opts)
	if err != nil {
		return nil, 0, err
	}

	var items []models.Queue
	if err := cursor.All(context.TODO(), &items); err != nil {
		return nil, 0, err
	}

	count, err := s.collection.CountDocuments(context.TODO(), bson.M{})
	return items, count, err
}

func (s *QueueService) ProccessQueue() {
	for {
		log.Println("Starting fetching queue")

		completed := 0
		failed := 0

		cursor, err := s.collection.Find(context.TODO(), bson.D{})
		if err != nil {
			log.Println("Error fetching queue: ", err)
			time.Sleep(30 * time.Second)
			continue
		}

		for cursor.Next(context.TODO()) {
			var item models.Queue
			if err := cursor.Decode(&item); err != nil {
				log.Println("Error decoding item: ", err)
				continue
			}

			if err := s.SendRequest(&item); err != nil {
				item.RetryCount--
				if item.RetryCount <= 0 {
					_ = s.archiveService.MoveToArchive(item, "failed")
					_, _ = s.collection.DeleteOne(context.TODO(), bson.M{"_id": item.ID})
				} else {
					_, _ = s.collection.UpdateOne(
						context.TODO(),
						bson.M{"_id": item.ID},
						bson.M{"$set": bson.M{"retry_count": item.RetryCount}},
					)
				}
				failed++
			} else {
				_ = s.archiveService.MoveToArchive(item, "success")
				_, _ = s.collection.DeleteOne(context.TODO(), bson.M{"_id": item.ID})
				completed++
			}
		}

		if err := cursor.Close(context.TODO()); err != nil {
			log.Println("Error closing cursor: ", err)
		}

		log.Println("Completed: ", completed)
		log.Println("Failed: ", failed)
		log.Println("End fetching queue")

		time.Sleep(30 * time.Second)
	}
}

func (s *QueueService) SendRequest(item *models.Queue) error {
	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	var body *bytes.Buffer
	if item.Body != nil {
		jsonBody, err := json.Marshal(item.Body)
		if err != nil {
			log.Printf("Error marshalling request body: %v\n", err)
			return err
		}
		body = bytes.NewBuffer(jsonBody)
	} else {
		body = bytes.NewBuffer(nil)
	}

	req, err := http.NewRequest(item.Method, item.URL, body)
	if err != nil {
		log.Printf("Error creating request: %v\n", err)
		return err
	}

	req.Header.Set("Content-Type", "application/json")

	q := req.URL.Query()
	for key, value := range item.Query {
		q.Add(key, value)
	}
	req.URL.RawQuery = q.Encode()

	resp, err := client.Do(req)
	if err != nil {
		log.Printf("Error sending request: %v\n", err)
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		return errors.New("request failed with status " + resp.Status)
	}

	return nil
}
