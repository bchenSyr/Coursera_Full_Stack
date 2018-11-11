var mongoose = require("mongoose");

//SCHEMA SETUP 
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

// Compile the schema into a model. The line following is used before putting database schema into a separate file
// var Campground = mongoose.model("Campground", campgroundSchema); 

// When other file requiring "campground.js", they will get a model of schema
module.exports = mongoose.model("Campground", campgroundSchema); 

// the following shows how to pass a object that we want to create into the database
// Campground.create(
//     {
//         name: "WINNER - Island", 
//         image: "https://kpopreviewed.files.wordpress.com/2017/08/winnerlmlmisland.png?w=1085&h=600&crop=1",
//         description: "2017 EP"

//     }, function(err, campground){
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("newly created campground");
//             console.log(campground);
//         }
//     }
// )

