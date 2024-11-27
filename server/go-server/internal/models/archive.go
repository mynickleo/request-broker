package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Archive struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	URL       string             `bson:"url" json:"url"`
	Method    string             `bson:"method" json:"method"`
	Body      map[string]any     `bson:"body,omitempty" json:"body,omitempty"`
	Query     map[string]string  `bson:"query,omitempty" json:"query,omitempty"`
	Status    string             `bson:"status" json:"status"`
	CreatedAt time.Time          `bson:"created_at" json:"createdAt"`
	UpdatedAt time.Time          `bson:"updated_at" json:"updatedAt"`
}
