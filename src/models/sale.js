const mongoose = require('mongoose');

const salesSchema = mongoose.Schema({
  product: {type: String},
  quantity: {type: Number},
  price: {type: Number},
  date: {type: Date}
});

const salesModel = mongoose.model('sales', salesSchema);

module.exports = salesModel;
