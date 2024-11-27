package controllers

import (
	"request-broker/internal/interfaces"
	"request-broker/internal/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

type ArchiveController struct {
	service interfaces.ArchiveService
}

func NewArchiveController(s interfaces.ArchiveService) *ArchiveController {
	return &ArchiveController{
		service: s,
	}
}

func (c *ArchiveController) GetAll(ctx *fiber.Ctx) error {
	page, _ := strconv.Atoi(ctx.Query("page", "1"))
	limit, _ := strconv.Atoi(ctx.Query("limit", "10"))

	items, total, err := c.service.GetAll(page, limit)
	if err != nil {
		if err.Error() != "document is nil" {
			return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": err.Error(),
			})
		}
		items = []models.Archive{}
		total = 0
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"data":  items,
		"total": total,
	})
}

func (c *ArchiveController) DeleteAll(ctx *fiber.Ctx) error {
	err := c.service.DeleteAll()
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	return ctx.JSON(fiber.Map{"message": "OK"})
}
