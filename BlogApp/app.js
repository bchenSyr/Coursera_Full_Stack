var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");
var app = express();

// ---< App Configure >---
mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// ---< Mongoose model Configure >---
var blogSchema = new mongoose.Schema({
    title: String,
    body: String,
    image: String,
    created:  {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

Blog.create({
    title: "test blog",
    image: "https://placekitten.com/400/300",
    body:"This is a blog post"
});

// ---< RESTful Routes >---
app.get("/", function(req, res){
    res.redirect("/blogs");
})

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR!");
        } else {
             // passing the data coming back in the database through Blog.find() to the index page
            res.render("index", {blogs: blogs});
        }
    })
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Blog App Server is running");
})