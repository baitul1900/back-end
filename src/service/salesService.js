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


const topProductService = async (req) => {
  try {
    const data = await salesModel.aggregate([
      {
        $group: {
          _id: '$product', // Grouping by the 'product' field
          totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } } // Calculate total revenue for each product
        }
      },
      {
        $sort: { totalRevenue: -1 } // Sorting by totalRevenue in descending order
      },
      {
        $limit: 5 // Limiting to the top 5 results
      }
    ]);

    return {status:'sucess',data:data}
  }
  catch (e) {
    return { status: 'fail', message: 'Something went wrong' }  
  }
}


const averageProductPriceService = async (req) => {
  try {
    const data = await salesModel.aggregate([
      {
        $group: {
          _id: null, // Grouping by the 'product' field
          averagePrice: { $avg: "$price" } // Calculate total revenue for each product
        }
      }
    ]);

    return {status:'sucess',data:data[0].averagePrice}
  }
  catch (e) {
    return { status: 'fail', message: 'Something went wrong' }  
  }
}


// I failed to resolve this oen and take help from chatGPT even I failed again

const revenueByMonthService = async (req) => {
  try {
    const revenueByMonth = await salesModel.aggregate([
      {
        $match: {
          date: { $type: "date" } // Filter to ensure 'date' field is of type Date
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: { $toDate: "$date" } } // Convert 'date' to Date type and then group by month-year combination
          },
          totalRevenue: {
            $sum: { $multiply: ["$quantity", "$price"] }
          }
        }
      },
      {
        $sort: {
          "_id": 1
        }
      }
    ]);

    return { status: 'success', data: revenueByMonth };
  } catch (e) {
    return { status: 'fail', message: 'Something went wrong' };
  }
};


const highestQuantitySoldOnSingleDay = async (req, res) => {
  try {
    const highestQuantity = await salesModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          maxQuantity: { $max: "$quantity" },
          product: { $first: "$product" }
        }
      },
      {
        $sort: { maxQuantity: -1 }
      },
      {
        $limit: 1
      },
      {
        $project: {
          _id: 0,
          product: "$product",
          maxQuantity: "$maxQuantity"
        }
      }
    ]);

    // Return the product with the highest quantity sold on a single day
    return ({ status: 'success', data: highestQuantity });
  } catch (error) {
    return { status: 'fail', message:'Something went wrong'  };
  }
};

const departmentSalaryService = async (req)=> {
  try {
    const departmentExpense = await salesModel.aggregate([
      {
        $group: {
          _id: "$department",
          totalSalaryExpense: { $sum: { $multiply: ["$quantity", "$price"] } } // Assuming quantity and price represent salary and number of employees respectively
        }
      },
      {
        $project: {
          _id: 0,
          department: "$_id",
          totalSalaryExpense: 1
        }
      }
    ]);

    return ({ status: 'success', data: departmentExpense });
  }
  catch (e) {
    return { status: 'fail', message:'Something went wrong'  };
  }
}







module.exports = {
    totalRevenueService,
    quantityByProductService,
    topProductService,
    averageProductPriceService,
    revenueByMonthService,
    highestQuantitySoldOnSingleDay,
    departmentSalaryService
}