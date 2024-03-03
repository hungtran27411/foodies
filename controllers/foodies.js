// import our model so we can talk to the database and performs
// our CRUD operations
const { default: mongoose } = require('mongoose')
const FoodieModel = require('../models/foodies');


module.exports = {
	
	new:newFoodie,
	create: create,
	delete: deleteOne,
	index,
	show,
	update: updateName,
	update: updateTypeOfFood

}	


// CRUD -> Create, Read, Update, Delete

// 2. Read
async function index(req, res){
	
	// then we want to send a ejs page with all the movies to the browser
	try {
		// We want our model to go to the database and get all the movies
		// .find({}) is mongoose model query method
		const foodieDocumentsFromTheDB = await FoodieModel.find({})
		console.log(foodieDocumentsFromTheDB)
		// then we want to send a ejs page with all the movies to the browser
		// movies/index is looking in the views folder for the ejs page
		res.render('foodies/index', {foodieDocs: foodieDocumentsFromTheDB})
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
		  const foodieFromTheDatabase = await FoodieModel
											  .findById(req.params.id)
										 	  .exec()				//  cast: [{ <--- movie Model
															//     type: Schema.Types.ObjectId, // this is from mongoose
															//     ref: 'Performer' // Performer is referencing the model name that 
															//     // you are creating the relationship with, mongoose.model('Performer', performerSchema);
															//   }],
										
										
	  
										
	  
		  console.log(foodieFromTheDatabase);
		  
			
		  res.render("foodies/show", {
			foodie: foodieFromTheDatabase, 
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
		const createdFoodieDoc = await FoodieModel.create(req.body); 
		console.log(createdFoodieDoc);
	  	res.redirect('foodies/new')
  
	} catch (err) {
	  console.log(err);
	  res.render("foodies/new");
	}
}
// 3. Update
async function updateName(req, res) {
	try {
		const filter = { _id: req.params.id }; // Assuming your ID field is _id
		const updateName = { nameOnReserv: req.body.nameOnReserv }; // Update object containing the new nameOnReserv value
		const updatedFoodie = await FoodieModel.findOneAndUpdate(filter, updateName, { new: true });
	} catch (err) {
		console.log(err);
		res.send(err);
	}
}
async function updateTypeOfFood(req, res) {
	try {
		const filter = { _id: req.params.id }; // Assuming your ID field is _id
		const updateTypeOfFood = { typeOfFood: req.body.typeOfFood }; // Update object containing the new nameOnReserv value
		const updatedFoodie = await FoodieModel.findOneAndUpdate(filter, updateTypeOfFood, { new: true });
	} catch (err) {
		console.log(err);
		res.send(err);
	}
}

// 4. Delete
async function deleteOne(req, res) {
	try {
	  const deletedFoodie = await FoodieModel.findByIdAndDelete(req.params.id);
	  console.log(deletedFoodie);
	  res.redirect('/foodies');
	} catch (err) {
	  console.log(err);
	  res.send(err);
	}
}
  
  
function newFoodie(req, res){
	
	res.render('foodies/new')
}
