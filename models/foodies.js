const mongoose = require('mongoose');


const foodieSchema = new mongoose.Schema({
   
   restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'restaurant',
      required: true
   },
   
   
   nameOnReserv:  {
    type:  String,
    required: true,
   
   },

   numberOfGuest:  {
    type:  String,

    
   },
   

})




module.exports = mongoose.model('Foodie', foodieSchema)
