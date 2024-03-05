const mongoose = require('mongoose');


const foodieSchema = new mongoose.Schema({
   
   restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant', // Reference the Restaurant model
      
    },

   nameOnReserv:  {
    type:  String,
    required: true,
   
   },

   numberOfGuest:  {
    type:  String,

    
   },
   restaurantName: {
      type: String,
   }
   
});





module.exports = mongoose.model('Foodie', foodieSchema)
