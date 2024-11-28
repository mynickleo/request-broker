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

func (s *ArchiveService) MoveToArchive(ctx context.Context, item models.Queue, status string) error {
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

	_, err := s.collection.InsertOne(ctx, archiveItem)
	return err
}

func (s *ArchiveService) GetAll(ctx context.Context, page, limit int) ([]models.Archive, int64, error) {
	skip := (page - 1) * limit
	opts := options.Find().SetSkip(int64(skip)).SetLimit(int64(limit))

	cursor, err := s.collection.Find(ctx, bson.M{}, opts)
	if err != nil {
		return nil, 0, err
	}

	var items []models.Archive
	if err := cursor.All(context.TODO(), &items); err != nil {
		return nil, 0, err
	}

	count, err := s.collection.CountDocuments(ctx, bson.M{})
	return items, count, err
}

func (s *ArchiveService) DeleteAll(ctx context.Context) error {
	_, err := s.collection.DeleteMany(ctx, bson.D{})
	return err
}
