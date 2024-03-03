var express = require('express');
var router = express.Router();
const RestaurantCtrl = require('../controllers/restaurant')// this associates to the controllers/restaurant.js file

// GET request to /foodies 
router.get('/', RestaurantCtrl.index);
router.get('/new', RestaurantCtrl.new);
router.get('/:id', RestaurantCtrl.show);
router.post('/', RestaurantCtrl.create);
router.delete('/:id', RestaurantCtrl.delete);
router.put('/:id', RestaurantCtrl.update)





module.exports = router;
