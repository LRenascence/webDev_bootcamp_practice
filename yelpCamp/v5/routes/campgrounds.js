var express     = require("express"),
    router      = express.Router();
    Campground  = require("../models/campground")
    Comment     = require("../models/comment")

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

router.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.img;
    var description = req.body.description;
    var newCamp = {name:name, image:image, description:description};
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

router.get("/campgrounds/new", function(req, res) {
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

module.export = router;