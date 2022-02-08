
const express = require("express");
const path = require("path");
const { getMaxListeners } = require("process");
const port = 8000;

// require mongodb database
const db = require('./config/mongoose');

const Contact = require('./models/contact');

const app = express();

// set template Engine

app.set("view engine", "ejs");
//  Join the path from views
app.set("views", path.join(__dirname, "views"));
// middleware function
app.use(express.urlencoded());

// Adding Static Files

app.use(express.static('assets'))



var contactList = [
    {
        name:"Meena",
        phone:9814327701,
        email: 'meena@gmail.com'
    },
    {
        name:"Sahil",
        phone:8360035194,
        email: 'sahil@gmail.com'
    },
    {
        name:"Khushi",
        phone: 9518644427,
        email: 'khushi@gmail.com'
    },

]

app.get("/", function (req, res) {


    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in Fetching From Db:')
            return;
        }
         return res.render('home', {
           titleName: "Contact List",
           contact_List: contacts,
         });
    });
   
});



app.post("/create-contact", function (req, res) {
   
    Contact.create({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    }, function(err, newContact){
        if(err){
           console.log('Error in Creating a Contact!!');
           return; 
        }

        console.log('Hurray!!', newContact);
        res.redirect('back');
    });
    
});


app.get('/delete-contact/',function(req,res){
    console.log(req.query);

    let id  = req.query.id;


    Contact.findByIdAndDelete(id,function(err,){
        if(err){
            console.log('Error In deleting the object from the database');
            return ;
        }
        return res.redirect("back");
    });

    

});



app.listen(port, function (error) {
    if (error) {
        console.log("Error in running the server", error);
    }
    else{
    console.log("My Express server are running on port", port);
    }
});