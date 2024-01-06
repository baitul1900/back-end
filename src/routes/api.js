const express = require("express");
const router = express.Router();
const totalRevenue = require('../controller/salesControoler');

router.get('/total-revenue',totalRevenue.totalRevenue);
router.get('/quantity-by-product',totalRevenue.productByQuantity);
router.get('/top-products',totalRevenue.topProduct);
router.get('/average-price',totalRevenue.averagePrice);
router.get('/revenue-by-month',totalRevenue.revenueByMonthYear);
router.get('/highest-quantity-sold',totalRevenue.highestQuantitySold);
router.get('/department-salary-expense',totalRevenue.departmentSalary);









module.exports = router;
