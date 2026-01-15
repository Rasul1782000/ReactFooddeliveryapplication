const FoodService = require('../services/foodService');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { z } = require('zod');

// Schema for Validation
const categoryIdSchema = z.object({
  categoryId: z.string().regex(/^\d+$/, "Category ID must be a number"),
});

exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await FoodService.getCategories();
  new ApiResponse(res, 200, categories).send();
});

exports.getPopularItems = asyncHandler(async (req, res) => {
  const items = await FoodService.getPopularItems();
  new ApiResponse(res, 200, items).send();
});

exports.getAllFood = asyncHandler(async (req, res) => {
  const items = await FoodService.getAllFood();
  new ApiResponse(res, 200, items).send();
});

exports.getFoodByCategory = asyncHandler(async (req, res) => {
  const { categoryId } = categoryIdSchema.parse(req.params);
  const items = await FoodService.getFoodByCategory(categoryId);
  new ApiResponse(res, 200, items).send();
});

exports.getFoodById = asyncHandler(async (req, res) => {
  const items = await FoodService.getFoodById(req.params.id);
  if (!items) {
      throw { statusCode: 404, message: "Item not found" };
  }
  new ApiResponse(res, 200, items).send();
});

exports.searchFood = asyncHandler(async (req, res) => {
  const { query } = req.query;
  const items = await FoodService.searchFood(query || '');
  new ApiResponse(res, 200, items).send();
});
