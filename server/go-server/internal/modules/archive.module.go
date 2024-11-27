package modules

import (
	"request-broker/internal/controllers"
	"request-broker/internal/interfaces"
	"request-broker/internal/services"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

type ArchiveModule struct {
	db      *mongo.Database
	app     *fiber.App
	service interfaces.ArchiveService
}

func NewArchiveModule(db *mongo.Database, app *fiber.App) *ArchiveModule {
	return &ArchiveModule{
		db:  db,
		app: app,
	}
}

func (m *ArchiveModule) Initialization() error {
	m.service = services.NewArchiveService(m.db)
	controller := controllers.NewArchiveController(m.service)

	m.app.Get("/api/archive", controller.GetAll)
	m.app.Delete("/api/archive", controller.DeleteAll)

	return nil
}

func (m *ArchiveModule) GetService() interfaces.ArchiveService {
	return m.service
}
