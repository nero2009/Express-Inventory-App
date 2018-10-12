const express = require("express");
const router = express.Router();



const Warehouse = require('../models/warehouse.js')

router.get("/", (req, res, next) => {
    Warehouse.getWarehouse((err,warehouses)=>{
    if(err){
      res.send(err);
    }

    res.render("warehouse", {
        title:'Warehouse',
        warehouses:warehouses
    });
  })
  
});



 
router.post('/add',(req,res,next)=>{
  
  if (req.isAuthenticated() && req.user.isAuthor()) {
    let warehouse = new Warehouse();
    warehouse.name = req.body.name
    warehouse.description = req.body.description
  
    Warehouse.addWarehouse(warehouse,(err, warehouse)=>{
      if(err){
        res.send(err)
      
      }
      res.redirect('/manage/warehouse')
    })
} else {
  res.render('unauthorized') // Forbidden
}
    
  }

)

//Edit warehouse -POST
router.post('/edit/:id',(req,res,next)=>{

  if (req.isAuthenticated() && req.user.isAuthor()) {
    let warehouse = new Warehouse();

    const query = {_id: req.params.id}
    const update ={
        name: req.body.name,
        description: req.body.description
    }

    Warehouse.updateWarehouse(query, update, {}, (err, warehouse)=>{
        if(err){
        res.send(err)
        }
        res.redirect('/manage/warehouse')
    })
  
} else {
  res.render('unauthorized') // Forbidden
}
    
  
})

// Delete Category - DELETe
router.delete('/delete/:id',(req,res,next)=>{
  if (req.isAuthenticated() && req.user.isAuthor()) {
    const query = {_id: req.params.id}
  
    Warehouse.removeWarehouse(query,  (err, warehouse)=>{
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
