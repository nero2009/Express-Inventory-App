const express = require("express");
const router = express.Router();

const Product = require('../models/product.js')
const Warehouse = require('../models/warehouse.js')


//get products
router.get("/", (req, res, next) => {
  if (req.isAuthenticated() && req.user.isMember()) {
    Product.getProduct((err,products)=>{
      if(err){
        res.send(err);
      }
  
      res.render("make_order", {
        title: "Make Order",
        products:products
      });
    })
} else {
  res.render('unauthorized')  // Forbidden
}
  
  
});

router.post("/",(req,res,next)=>{
  if (req.isAuthenticated() && req.user.isMember()) {
    let product = new Product();

    const query = {part_number: req.body.part_number}
    const quantity = req.body.quantity
    const update ={
      $inc : { quantity : -Math.abs(quantity) }

    }
    const options ={}
    
    Product.makeOrder(query, update, {}, (err, product)=>{
        if(err){
            res.send(err)
          }
          res.redirect('/orders')
    })
} else {
    res.render('unauthorized') // Forbidden
}
  
  
  
})


module.exports = router;