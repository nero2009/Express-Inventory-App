const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  quantity:{
    type: Number
  },
  warehouse:{
    type: String
  },
  part_number:{
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  created_by:{
      type:String
  }
});
const Product = (module.exports = mongoose.model("Product", productSchema));

module.exports.getProduct = (callback, limit) => {
  Product.find(callback)
    .limit(limit)
    .sort([["title", "ascending"]]);
};

module.exports.addProduct = (product, callback) => {
  Product.create(product, callback);
};

module.exports.getWarehouseProducts =(warehouseId, callback)=>{
  let query = {warehouse: warehouseId}
  Product.find(query, callback)
  
}

module.exports.getProductById = (id, callback) => {
  Product.findById(id, callback);
};

module.exports.makeOrder =(query, update, options, callback)=>{
  Product.findOneAndUpdate(query, update, options, callback);
}

module.exports.updateProduct = (query, update, options, callback) => {
  Product.findOneAndUpdate(query, update, options, callback);
};


module.exports.removeProduct =(query,callback)=>{
  Product.remove(query, callback)
}