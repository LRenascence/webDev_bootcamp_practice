var express           = require("express"),
    app               = express(),
    bodyParser        = require("body-parser"),
    mongoose          = require("mongoose"),
    passport          = require("passport"),
    localStrategy     = require("passport-local"),
    seedDB            = require("./seeds"),
    Comment           = require("./models/comment"),
    User              = require("./models/user"),
    Campground        = require("./models/campground");


mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelpcamp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

seedDB();


// passport
app.use(require("express-session")({
    secret: "secret page!",
    resave: false,
    saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.get("/", function(req, res) {
    res.render("landing");
});


app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if(err){
            console.log(err);
        }
        else{
            res.render("campground/campgrounds", {campgrounds:campgrounds});
        }
    })
});

app.post("/campgrounds", function(req, res) {
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

app.get("/campgrounds/new", function(req, res) {
    res.render("campground/new");
})

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp) {
        if(err){
            console.log(err);
        }
        else{
            res.render("campground/show", {campground: foundCamp});
        }
    });
    
});

app.get("/campgrounds/:id/comments/new", isLoggedin, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCamp) {
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {campground: foundCamp});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res) {
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

// authentication
app.get("/register", function(req, res){
    res.render("register");
})

app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }), function(req, res){
    
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedin(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Server has started!");
});