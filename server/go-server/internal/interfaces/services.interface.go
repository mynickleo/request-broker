package interfaces

import (
	"request-broker/internal/models"
)

type ArchiveService interface {
	MoveToArchive(item models.Queue, status string) error
	GetAll(page, limit int) ([]models.Archive, int64, error)
	DeleteAll() error
}

type QueueService interface {
	AddToQueue(item *models.Queue) error
	GetAll(page, limit int) ([]models.Queue, int64, error)
	ProccessQueue()
	SendRequest(item *models.Queue) error
}
