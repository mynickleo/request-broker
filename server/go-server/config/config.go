package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port   string
	DBUri  string
	DBName string
}

var AppConfig *Config

func getEnv(key string, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}

func InitConfig() error {
	err := godotenv.Load()

	if err != nil {
		return err
	}

	AppConfig = &Config{
		Port:   getEnv("PORT", "3000"),
		DBUri:  getEnv("DB_URI", "mongodb://localhost:27017"),
		DBName: getEnv("DB_NAME", "request-broker"),
	}

	return nil
}
