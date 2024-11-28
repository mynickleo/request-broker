package interfaces

import (
	"context"
	"request-broker/internal/models"
)

type ArchiveService interface {
	MoveToArchive(ctx context.Context, item models.Queue, status string) error
	GetAll(ctx context.Context, page, limit int) ([]models.Archive, int64, error)
	DeleteAll(ctx context.Context) error
}

type QueueService interface {
	AddToQueue(ctx context.Context, item *models.Queue) error
	GetAll(ctx context.Context, page, limit int) ([]models.Queue, int64, error)
	ProccessQueue(ctx context.Context)
	SendRequest(item *models.Queue) error
}
