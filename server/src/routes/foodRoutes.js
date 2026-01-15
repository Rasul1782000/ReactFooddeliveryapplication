const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

router.get('/categories', foodController.getCategories);
router.get('/popular', foodController.getPopularItems);
router.get('/all', foodController.getAllFood);
router.get('/search', foodController.searchFood);
router.get('/category/:categoryId', foodController.getFoodByCategory);
router.get('/:id', foodController.getFoodById);

module.exports = router;
