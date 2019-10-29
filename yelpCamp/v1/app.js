var express = require("express")
var app = express()
var bodyParser =  require("body-parser")

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c722d79d69f49c051_340.jpg"},
    {name: "Grantie Hill", image: "https://pixabay.com/get/52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c722d79d69f49c051_340.jpg"},
    {name: "Moutain ", image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c722d79d69f49c051_340.jpg"},
    {name: "Salmon Creek", image: "https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c722d79d69f49c051_340.jpg"},
    {name: "Grantie Hill", image: "https://pixabay.com/get/52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c722d79d69f49c051_340.jpg"},
    {name: "Moutain ", image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c722d79d69f49c051_340.jpg"},
    {name: "Salmon Creek", image: "https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c722d79d69f49c051_340.jpg"},
    {name: "Grantie Hill", image: "https://pixabay.com/get/52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c722d79d69f49c051_340.jpg"},
    {name: "Moutain ", image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c722d79d69f49c051_340.jpg"}
]

app.get("/", function(req, res) {
    res.render("landing");
});


app.get("/campgrounds", function(req, res) {
    

    res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.img;
    var newCamp = {name:name, image:image};
    campgrounds.push(newCamp);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
})

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Server has started!");
});