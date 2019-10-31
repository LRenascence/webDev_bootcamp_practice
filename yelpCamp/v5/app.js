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

var commentRoutes     = require("./routes/comments"),
    campgroundRoutes  = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index")

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

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Server has started!");
});