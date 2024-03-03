const mongoose = require('mongoose');


const RestaurantSchema = new mongoose.Schema({
   
    restName: {
        type: String,
        required: true,

    },
    restAdd: {
        type: String,
        required: true,
    },
    restPhone: {
        type: String,
        required: true,

    },
   typeOfFood:  {
    type:  String,
    required: true,
   
   },


   reviewRating:  {
    type:  String,
    required: true,
   
   },
   
   
   

})




module.exports = mongoose.model('Restaurant', RestaurantSchema)
