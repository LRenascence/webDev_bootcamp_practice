var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment");

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

router.post("/campgrounds/:id/comments",isLoggedin, function(req, res) {
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
                    //add username and id to comment
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    //save comment
                    newComment.save();
                    foundCamp.comments.push(newComment);
                    foundCamp.save();
                    res.redirect("/campgrounds/" + foundCamp._id);
                }
            });
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