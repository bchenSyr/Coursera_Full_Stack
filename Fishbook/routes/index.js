var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");


router.get("/", function(req, res){
    res.render("register");
})

//HOME - show all the posts
router.get("/home", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("home",{campgrounds:allCampgrounds, currentUser: req.user});
       }
    });
})

// ====================
// AUTH ROUTES
// ====================
router.get("/register", (req, res) => {
    res.render("register");
});

// handle sign up logic
router.post("/register", (req, res) => {
    var newUser = new User({username: req.body.username, email: req.body.email});
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect("register");
        } else {
            passport.authenticate("local")(req, res, () =>{
                res.redirect("home");
            })
        }
    })
});

// log in logic
// passport.authenticate("/login", middleware, callback)
router.post("/login", 
    passport.authenticate("local", 
    {
        successRedirect:"home",
        failureRedirect:"login"
    }),
    (req, res) => {
        res.send("log in page");
    }
);

router.get("/login", (req, res) => {
    res.render("login");
})

// log out 
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("login");
});

//middleware
function isLoogedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
}

module.exports = router;