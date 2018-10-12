const router = require('express').Router()
// Models
const User = require('../models/user')

// Static Pages ================================================================
router.get('/', function(req, res, next) {
    res.render('index')
})



module.exports = router;