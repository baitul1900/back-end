const mongoose = require('mongoose');
const salesModel = require('../models/sale');

const totalRevenueService = async (req) => {
    try {
      const totalRevenue = await salesModel.aggregate([
        {
          $group: {
            _id: null,
            total: {
              $sum: { $multiply: ["$quantity", "$price"] } // Enclose field references in double quotes
            }
          }
        }
      ]);
  
      return { status: 'success', data: totalRevenue[0].total };
    } catch (e) {
      return { status: 'fail', message: 'Something went wrong' };
    }
};


const quantityByProductService = async (req) => {
    try {
      const productTotalQuantity = await salesModel.aggregate([
        {
          $group: {
            _id: "$product",
            totalByQuantity: {
              $sum: "$quantity" // Enclose field references in double quotes
            }
          }
        }
      ]);
  
      return { status: 'success', data: productTotalQuantity };
    } catch (e) {
      return { status: 'fail', message: 'Something went wrong' };
    }
};





module.exports = {
    totalRevenueService,
    quantityByProductService
}