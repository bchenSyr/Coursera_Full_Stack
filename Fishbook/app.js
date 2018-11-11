// File name: app.js
// Application: entry point for Fishboook 

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");

var seedDB = require("./seeds");

//requring DB models
var User = require("./models/user");
var Comment = require("./models/comment");
var Campground = require("./models/campground");

//requring routes
var commentRoutes    = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes      = require("./routes/index")
    
mongoose.connect('mongodb://localhost/fishbook', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB(); // remove the original data and add some campgrounds

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:"Bell is the best",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// authenticate(), serializeUser(), deserializeUser() come from package passportLocalMongoose
passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.reqUrl = req.url;
    next();
})

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.get("/follower", function(req, res){
    res.render("follower");
})

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Fishboook Server Has Started!");
});



