var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment"),
    middleware  = require("../middleware/index.js");

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

router.post("/campgrounds", middleware.isLoggedin, function(req, res) {
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
            req.flash("success", "Successfully added a new campground!");
            res.redirect("/campgrounds");
        }
    });
    
});

router.get("/campgrounds/new", middleware.isLoggedin, function(req, res) {
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

// Edit camp
router.get("/campgrounds/:id/edit", middleware.checkCampOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCamp){
        res.render("campground/edit", {campground: foundCamp});
    });
});


// Update camp
router.put("/campgrounds/:id", middleware.checkCampOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
        req.flash("success", "Successfully updated campground!");
        res.redirect("/campgrounds/" + req.params.id);
    });
});

// Delete camp
router.delete("/campgrounds/:id", middleware.checkCampOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        req.flash("success", "Successfully deleted campground")
        res.redirect("/campgrounds");
    });
});


module.exports = router;