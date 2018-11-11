var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
var User = require("./models/user");
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://s3.amazonaws.com/photos.fishidy.com/5614814166b01a04d00c5e98_800",
        description: "10 lb sea trout"
    },
    {
        name: "Desert Mesa", 
        image: "https://s3.amazonaws.com/photos.fishidy.com/5bc9e8506e8bb808b8f23b38_800",
        description: "3 lb. Largemouth Bass"
    },
    {
        name: "Canyon Floor", 
        image: "https://s3.amazonaws.com/photos.fishidy.com/5b9de33f6e8bc80530a301f0_800",
        description: "Cutbow Trout with a Lucky Leech"
    },
    {
        name: "Rusty Suender", 
        image: "https://s3.amazonaws.com/photos.fishidy.com/5b1b3cda6e8bb70b2c32eec8_800",
        description: "32 in. Red Drum"
    },
    {
        name: "Noah Shapiro", 
        image: "https://s3.amazonaws.com/photos.fishidy.com/5bc34fdf6e8bb8065848a9d2_800",
        description: "32 in. Red Drum"
    },
    {
        name: "Adam Mullins", 
        image: "https://s3.amazonaws.com/photos.fishidy.com/5b92d04e6e8bc50530b19636_800",
        description: "19 in. Walleye"
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            
            console.log("removed comments!");
            
            // User.remove({}, (err) => {
            //     if (err) {
            //         console.log(err);
            //     }
            //     console.log("removed user!");
            // })
            
            //add a few campgrounds
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            }
                        );
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;