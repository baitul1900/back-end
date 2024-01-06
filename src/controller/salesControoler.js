const {totalRevenueService, quantityByProductService} = require('../service/sales');


// create 
exports.totalRevenue = async (req, res) => {
    let data = await totalRevenueService(req);
    res.status(200).json(data);
}

exports.productByQuantity = async (req, res) => {
    let data = await quantityByProductService(req);
    res.status(200).json(data);
}


