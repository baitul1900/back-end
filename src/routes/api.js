const express = require("express");
const router = express.Router();
const totalRevenue = require('../controller/salesControoler');

router.get('/total-revenue',totalRevenue.totalRevenue);
router.get('/quantity-by-product',totalRevenue.productByQuantity);







module.exports = router;
