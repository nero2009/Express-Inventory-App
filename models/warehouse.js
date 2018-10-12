const mongoose = require("mongoose");

const warehouseSchema = mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  
  created_at: {
    type: Date,
    default: Date.now
  },
  
});
const Warehouse = (module.exports = mongoose.model("Warehouse", warehouseSchema));

module.exports.getWarehouse = (callback, limit) => {
    Warehouse.find(callback)
    .limit(limit)
    
};

module.exports.addWarehouse = (product, callback) => {
    Warehouse.create(product, callback);
};

module.exports.getWarehouseById = (id, callback) => {
    Warehouse.findById(id, callback);
};

module.exports.updateWarehouse = (query, update, options, callback) => {
    Warehouse.findOneAndUpdate(query, update, options, callback);
};


module.exports.removeWarehouse =(query,callback)=>{
  Warehouse.remove(query, callback)
}