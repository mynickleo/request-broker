package controllers

import (
	"context"
	"request-broker/internal/interfaces"
	"request-broker/internal/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

type QueueController struct {
	service interfaces.QueueService
}

func NewQueueController(s interfaces.QueueService) *QueueController {
	return &QueueController{
		service: s,
	}
}

func (c *QueueController) AddToQueue(ctx *fiber.Ctx) error {
	var item models.Queue
	if err := ctx.BodyParser(&item); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	item.RetryCount = 3
	item.Status = "processing"

	if err := c.service.AddToQueue(context.Background(), &item); err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return ctx.SendStatus(fiber.StatusCreated)
}

func (c *QueueController) GetAll(ctx *fiber.Ctx) error {
	page, _ := strconv.Atoi(ctx.Query("page", "1"))
	limit, _ := strconv.Atoi(ctx.Query("limit", "10"))

	items, total, err := c.service.GetAll(context.Background(), page, limit)
	if err != nil {
		if err.Error() != "document is nil" {
			return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": err.Error(),
			})
		}
		items = []models.Queue{}
		total = 0
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"data":  items,
		"total": total,
	})
}
