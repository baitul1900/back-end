const {totalRevenueService, quantityByProductService, topProductService, averageProductPriceService, revenueByMonthService, highestQuantitySoldOnSingleDay, departmentSalaryService} = require('../service/salesService');


// create 
exports.totalRevenue = async (req, res) => {
    let data = await totalRevenueService(req);
    res.status(200).json(data);
}

exports.productByQuantity = async (req, res) => {
    let data = await quantityByProductService(req);
    res.status(200).json(data);
}

exports.topProduct = async (req, res) => {
    let data = await topProductService(req);
    res.status(200).json(data);
}

exports.averagePrice = async (req, res) => {
    let data = await averageProductPriceService(req);
    res.status(200).json(data);
}

exports.revenueByMonthYear = async (req, res) => {
    let data = await revenueByMonthService(req);
    res.status(200).json(data);
}


exports.highestQuantitySold = async (req, res) => {
    let data = await highestQuantitySoldOnSingleDay(req);
    res.status(200).json(data);
}

exports.departmentSalary = async (req, res) => {
    let data = await departmentSalaryService(req);
    res.status(200).json(data);
}