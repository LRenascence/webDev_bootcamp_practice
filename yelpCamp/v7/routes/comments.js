var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment"),
    middleware  = require("../middleware/index.js");

router.get("/campgrounds/:id/comments/new", middleware.isLoggedin, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCamp) {
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {campground: foundCamp});
        }
    });
});

router.post("/campgrounds/:id/comments",middleware.isLoggedin, function(req, res) {
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
                    req.flash("success", "Successfully added a new comment");
                    res.render("/campgrounds/" + foundCamp._id);
                }
            });
        }
    });
});

// edit comment
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        res.render("comments/edit", {campground_id:req.params.id, comment: foundComment});
    });
});
// update comment
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        req.flash("success", "Successfully updated comment");
        res.redirect("/campgrounds/" + req.params.id);
    });
});
// delete comment
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        req.flash("success", "Successfully deleted comment");
        res.redirect("/campgrounds/" + req.params.id);
    });
});


module.exports = router;