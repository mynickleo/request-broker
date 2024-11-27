package services

import (
	"context"
	"request-broker/internal/models"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type ArchiveService struct {
	collection *mongo.Collection
}

func NewArchiveService(db *mongo.Database) *ArchiveService {
	return &ArchiveService{
		collection: db.Collection("archive"),
	}
}

func (s *ArchiveService) MoveToArchive(item models.Queue, status string) error {
	archiveItem := models.Archive{
		ID:        primitive.NewObjectID(),
		URL:       item.URL,
		Method:    item.Method,
		Body:      item.Body,
		Query:     item.Query,
		Status:    status,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	_, err := s.collection.InsertOne(context.TODO(), archiveItem)
	return err
}

func (s *ArchiveService) GetAll(page, limit int) ([]models.Archive, int64, error) {
	skip := (page - 1) * limit
	opts := options.Find().SetSkip(int64(skip)).SetLimit(int64(limit))

	cursor, err := s.collection.Find(context.TODO(), bson.M{}, opts)
	if err != nil {
		return nil, 0, err
	}

	var items []models.Archive
	if err := cursor.All(context.TODO(), &items); err != nil {
		return nil, 0, err
	}

	count, err := s.collection.CountDocuments(context.TODO(), bson.M{})
	return items, count, err
}

func (s *ArchiveService) DeleteAll() error {
	_, err := s.collection.DeleteMany(context.TODO(), bson.D{})
	return err
}
