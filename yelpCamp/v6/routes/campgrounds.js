var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment");

router.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if(err){
            console.log(err);
        }
        else{
            res.render("campground/campgrounds", {campgrounds:campgrounds});
        }
    })
});

router.post("/campgrounds", isLoggedin, function(req, res) {
    var name = req.body.name;
    var image = req.body.img;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCamp = {name:name, image:image, description:description, author:author};
    //Create a new campground and save to DB
    Campground.create(newCamp, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        }
        else {
            res.redirect("/campgrounds");
        }
    });
    
});

router.get("/campgrounds/new", isLoggedin, function(req, res) {
    res.render("campground/new");
})

router.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp) {
        if(err){
            console.log(err);
        }
        else{
            res.render("campground/show", {campground: foundCamp});
        }
    });
    
});

function isLoggedin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;