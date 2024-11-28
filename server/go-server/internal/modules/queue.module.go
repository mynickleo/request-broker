package modules

import (
	"context"
	"request-broker/internal/controllers"
	"request-broker/internal/interfaces"
	"request-broker/internal/services"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

type QueueModule struct {
	db             *mongo.Database
	app            *fiber.App
	archiveService interfaces.ArchiveService
}

func NewQueueModule(db *mongo.Database, app *fiber.App, archiveService interfaces.ArchiveService) *QueueModule {
	return &QueueModule{
		db:             db,
		app:            app,
		archiveService: archiveService,
	}
}

func (m *QueueModule) Initialization() error {
	service := services.NewQueueService(m.db, m.archiveService)
	controller := controllers.NewQueueController(service)

	m.app.Post("/api/queue", controller.AddToQueue)
	m.app.Get("/api/queue", controller.GetAll)

	go m.RunProcessQueue(service)

	return nil
}

func (m *QueueModule) RunProcessQueue(s interfaces.QueueService) {
	time.Sleep(3 * time.Second)
	s.ProccessQueue(context.Background())
}
