var mongoose = require("mongoose")
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/test");

var testdSchema = new mongoose.Schema({
    id: Number,
    name: String
});

var Test = mongoose.model("Test", testdSchema);
Test.create(
    {id: 2, 
    name: "b"
    }, function(err, test) {
        if(err){
            console.log(err);
        } 
        else{
            console.log("new created campground: ")
            console.log(test)
        }
    })