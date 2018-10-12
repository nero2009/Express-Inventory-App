const express = require("express");
const router = express.Router();

Product = require('../models/product.js')
Warehouse = require('../models/warehouse.js')



router.get("/products", (req, res, next) => {
    if (req.isAuthenticated() && req.user.isAuthor()) {
      Product.getProduct((err,products)=>{
        if(err){
          res.send(err)
        }
        res.render("manage_products", {
          
              title: "Manage Products",
              products : products
            });
      })
  } else {
    res.render('unauthorized') // Forbidden
  }
  
});

//get products


router.get("/warehouse", (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAuthor()) {
    Warehouse.getWarehouse((err,warehouse)=>{
      if(err){
        res.send(err);
      }
  
      res.render("manage_warehouse", {
        title: "Warehouse",
        warehouse:warehouse
      });
    })
  } else {
    res.render('unauthorized') // Forbidden
  }
    
});

router.get("/products/add", (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAuthor()) {
    Warehouse.getWarehouse((err, warehouse)=>{
      if(err){
        res.send(err)
      }
      res.render("add_product", { 
        title: "Create Product",
        warehouse:warehouse
     });
    })
} else {
  res.render('unauthorized') // Forbidden
}
  
  
});

router.get("/warehouse/add", (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAuthor()) {
    res.render("add_warehouse", { title: "Create Warehouse" });
} else {
  res.render('unauthorized') // Forbidden
}
 
});



router.get("/warehouse/edit/:id",(req, res, next) => {
  if (req.isAuthenticated() && req.user.isAuthor()) {
    Warehouse.getWarehouseById(req.params.id,(err, warehouse)=>{
      if(err){
        res.send(err)
      }
      res.render("edit_warehouse", {
        title: "Edit warehouse",
        warehouse:warehouse
      });
    })
} else {
  res.render('unauthorized') // Forbidden
}
  
 
});

router.get("/products/edit/:id", (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAuthor()) {
    Product.getProductById(req.params.id,(err, product)=>{
      if(err){
        res.send(err)
      }
      Warehouse.getWarehouse((err, warehouse)=>{
        res.render("edit_product", {
          title: "Edit Product",
          product:product,
          warehouse: warehouse
        });
      })
      
    })
} else {
  res.render('unauthorized') // Forbidden
}
  
 
});



module.exports = router;
