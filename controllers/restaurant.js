// import our model so we can talk to the database and performs
// our CRUD operations
const { default: mongoose } = require('mongoose')
const restaurantModel = require('../models/restaurant');


module.exports = {
	
	new:newRestaurant,
	create: create,
	delete: deleteOne,
	index,
	show,
	update: updateRestName,
	update: updateTypeOfFood

}	


// CRUD -> Create, Read, Update, Delete

// 2. Read
async function index(req, res){
	
	// then we want to send a ejs page with all the movies to the browser
	try {
		// We want our model to go to the database and get all the movies
		// .find({}) is mongoose model query method
		const restaurantDocumentsFromTheDB = await restaurantModel.find({})
		console.log(restaurantDocumentsFromTheDB)
		// then we want to send a ejs page with all the movies to the browser
		// movies/index is looking in the views folder for the ejs page
		res.render('restaurants/index', {restaurantDocs: restaurantDocumentsFromTheDB})
		// movieDocs is now a variables inside of views/movies/index.ejs 
	} catch(err){
		console.log(err)
		res.redirect('/')
	}
}
async function show(req, res) {

  
		try {
	  
			// req.params.id value is coming from the browsers request
			// the name `.id` is defined in the routes/movies show route
			// router.get('/:id', movieCtrl.show);
		  const restaurantFromTheDatabase = await restaurantModel
											  .findById(req.params.id)
										 	  .exec()				//  cast: [{ <--- movie Model
															//     type: Schema.Types.ObjectId, // this is from mongoose
															//     ref: 'Performer' // Performer is referencing the model name that 
															//     // you are creating the relationship with, mongoose.model('Performer', performerSchema);
															//   }],
										
										
	  
										
	  
		  console.log(restaurantFromTheDatabase);
		  
			
		  res.render("restaurants/show", {
			restaurant: restaurantFromTheDatabase, 
		  });
		} catch (err) {
		  console.log(err)
		  res.send(err);
		}
}



// 1. Create a new reservation
async function create(req, res) {
	console.log(req.body, " <- is the contents of our form!")
	req.body.nowShowing = !!req.body.nowShowing;
	// req.body.cast = req.body.cast.trim();

	// if (req.body.cast) req.body.cast = req.body.cast.split(/\s*,\s*/);

	try {
		const createdRestaurantDoc = await restaurantModel.create(req.body); 
		console.log(createdRestaurantDoc);
	  	res.redirect('restaurants/new') ///views/restaurants/new
  
	} catch (err) {
	  console.log(err);
	  res.render("restaurants/new");
	}
}
// 3. Update
async function updateRestName(req, res) {
	try {
		const filter = { _id: req.params.id }; // Assuming your ID field is _id
		const updateRestName = { updateRestName: req.body.updateRestName }; // Update object containing the new nameOnReserv value
		const updatedFoodie = await restaurantModel.findOneAndUpdate(filter, updateRestName, { new: true });
	} catch (err) {
		console.log(err);
		res.send(err);
	}
}
async function updateTypeOfFood(req, res) {
	try {
		const filter = { _id: req.params.id }; // Assuming your ID field is _id
		const updateTypeOfFood = { typeOfFood: req.body.typeOfFood }; // Update object containing the new nameOnReserv value
		const updatedRestaurant = await restaurantModel.findOneAndUpdate(filter, updateTypeOfFood, { new: true });
	} catch (err) {
		console.log(err);
		res.send(err);
	}
}

// 4. Delete
async function deleteOne(req, res) {
	try {
	  const deleteRestaurant = await restaurantModel.findByIdAndDelete(req.params.id);
	  console.log(deleteRestaurant);
	  res.redirect('/restaurants');
	} catch (err) {
	  console.log(err);
	  res.send(err);
	}
}
  
  
function newRestaurant(req, res){
	
	res.render('restaurants/new')
}
