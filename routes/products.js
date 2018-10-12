const express = require("express");
const router = express.Router();

const Product = require('../models/product.js')
const Warehouse = require('../models/warehouse.js')


//get products
router.get("/", (req, res, next) => {
    Product.getProduct((err,products)=>{
      if(err){
        res.send(err);
      }
  
      res.render("products", {
        products:products
      });
    })
    
});


router.post("/add",(req,res,next)=>{
  if (req.isAuthenticated() && req.user.isAuthor()) {
    let product = new Product();
    product.name = req.body.name
    product.description = req.body.description
    product.quantity = req.body.quantity
    product.warehouse = req.body.warehouse
    product.part_number = req.body.part_number

    Product.addProduct(product, (err, product)=>{
        if(err){
            res.send(err)
        }
        res.redirect('/manage/products')
    })
  } else {
    res.render('unauthorized') // Forbidden
  }
    
})

router.get("/warehouse/:warehouse_id", (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAuthor()) {
    Product.getWarehouseProducts(req.params.warehouse_id,(err,products)=>{
      Warehouse.getWarehouseById(req.params.warehouse_id,(err, warehouse)=>{
        res.render("warehouses", {
          title: warehouse.name,
          products:products
        });
       
      })
      
    })
    
} else {
  res.render('unauthorized') // Forbidden
}
    
  });

router.post('/edit/:id',(req,res,next)=>{
  if (req.isAuthenticated() && req.user.isAuthor()) {
    let product = new Product();

    const query = {_id: req.params.id}
    const update ={
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        warehouse: req.body.warehouse,
        part_number : req.body.part_number
      }
    
    Product.updateProduct(query, update, {}, (err, product)=>{
        if(err){
            res.send(err)
          }
          res.redirect('/manage/products')
    })
} else {
  res.render('unauthorized') // Forbidden
}
   
})

// Delete Product - Delete
router.delete('/delete/:id',(req,res,next)=>{
  if (req.isAuthenticated() && req.user.isAuthor()) {
    const query = {_id: req.params.id}
    
    Product.removeProduct(query,  (err, product)=>{
      if(err){
        res.send(err)
      }
      res.status(200)
    })
} else {
  res.render('unauthorized') // Forbidden
}
 
    
})

module.exports = router;
