var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundPost){
        if(err){
            console.log(err);
        } else {
            // console.log(foundCampground)
            res.render("posts/show", {post : foundPost});
        }
    });
})

module.exports = router;