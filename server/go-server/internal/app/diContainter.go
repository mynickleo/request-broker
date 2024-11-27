package app

import (
	"request-broker/internal/interfaces"
	"request-broker/internal/modules"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

type DIContainer struct {
	db            *mongo.Database
	app           *fiber.App
	queueModule   interfaces.QueueModule
	archiveModule interfaces.ArchiveModule
	readyModule   interfaces.ReadyModule
}

func NewDIContainer(db *mongo.Database, app *fiber.App) *DIContainer {
	return &DIContainer{
		db:  db,
		app: app,
	}
}

func (di *DIContainer) InitializationModules() error {
	err := di.InitializationArchiveModule()
	if err != nil {
		return err
	}

	err = di.InitializationQueueModule()
	if err != nil {
		return err
	}

	err = di.InitializationReadyModule()
	if err != nil {
		return err
	}

	return nil
}

func (di *DIContainer) InitializationArchiveModule() error {
	di.archiveModule = modules.NewArchiveModule(di.db, di.app)
	return di.archiveModule.Initialization()
}

func (di *DIContainer) InitializationQueueModule() error {
	di.queueModule = modules.NewQueueModule(di.db, di.app, di.archiveModule.GetService())
	return di.queueModule.Initialization()
}

func (di *DIContainer) InitializationReadyModule() error {
	di.readyModule = modules.NewReadyModule(di.app)
	return di.readyModule.Initialization()
}
