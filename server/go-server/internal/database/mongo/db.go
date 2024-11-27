package mongo

import (
	"context"
	"log"
	"request-broker/config"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func Connect() (*mongo.Database, error) {
	uri := config.AppConfig.DBUri

	clientOptions := options.Client().ApplyURI(uri)

	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		return nil, err
	}

	err = client.Ping(context.Background(), nil)
	if err != nil {
		return nil, err
	}

	log.Println("Successfully connected to MongoDB")
	return client.Database(config.AppConfig.DBName), nil
}

func CloseConnection(client *mongo.Client) {
	if err := client.Disconnect(context.Background()); err != nil {
		log.Fatal("Error while closing MongoDB connection: ", err)
	}
	log.Println("MongoDB connection closed")
}
