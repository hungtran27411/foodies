var express = require('express');
var router = express.Router();
const foodieCtrl = require('../controllers/foodies')

// GET request to /foodies 
router.get('/', foodieCtrl.index);
router.get('/new', foodieCtrl.new);
router.get('/:id', foodieCtrl.show);
router.post('/', foodieCtrl.create);
router.delete('/:id', foodieCtrl.delete);
router.put('/:id', foodieCtrl.update)





module.exports = router;
