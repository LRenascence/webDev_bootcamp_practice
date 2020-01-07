var Campground     = require("../models/campground"),
    Comment        = require("../models/comment");


var middlewareObj = {};

middlewareObj.checkCampOwnership = function(req, res, next){
    // is user logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCamp){
            if(err){
                res.redirect("back");
            }
            else{
                //does user own the camp
                if(foundCamp.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    }
    // if not, redirect
    else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    // is user logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            }
            else{
                //does user own the comment
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    }
    // if not, redirect
    else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.isLoggedin = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/login");
};

module.exports = middlewareObj;