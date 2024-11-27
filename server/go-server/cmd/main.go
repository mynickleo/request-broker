package main

import (
	"log"
	"request-broker/internal/app"
)

func main() {
	err := app.Initialization()
	if err != nil {
		log.Fatal(err)
	}
}
