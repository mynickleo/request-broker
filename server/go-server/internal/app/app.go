package app

import (
	"log"
	"request-broker/config"
	"request-broker/internal/database/mongo"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func Initialization() error {
	err := config.InitConfig()
	if err != nil {
		return err
	}

	db, err := mongo.Connect()
	if err != nil {
		return err
	}

	app := fiber.New()
	app.Use(logger.New())

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,PUT,DELETE",
		AllowHeaders: "Content-Type,Authorization",
	}))

	diContainer := NewDIContainer(db, app)
	diContainer.InitializationModules()

	log.Fatal(app.Listen(":" + config.AppConfig.Port))

	return nil
}
