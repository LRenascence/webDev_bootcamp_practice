var express   = require("express"),
    router    = express.Router();

router.get("/campgrounds/:id/comments/new", isLoggedin, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCamp) {
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {campground: foundCamp});
        }
    });
});

router.post("/campgrounds/:id/comments", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCamp) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            Comment.create(req.body.comment, function(err, newComment) {
                if(err){
                    console.log(err);
                }
                else{
                    foundCamp.comments.push(newComment);
                    foundCamp.save();
                    res.redirect("/campgrounds/" + foundCamp._id);
                }
            });
        }
    });
});

module.export = router;