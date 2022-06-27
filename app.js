const express = require("express")
const app = express();
const request = require("request");
const https = require("https");
const bodyParser = require("body-parser");
const exp = require("constants");
const config = require('./config.js');
var API_Key = config.My_API_Id;
var ListId = config.My_List_Id;
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
// Providing the route page
app.get("/",function(req,res){
    res.sendFile(__dirname + "/signUp.html" )
})



app.post("/",function(req,res){ 
    var firstName = req.body.FirstName
    var lastname = req.body.lastName
    var emaill = req.body.email
    const data ={
        members :[
            {
                email_address : emaill,
                status : "subscribed",
                merge_fields :{
                    FNAME : firstName,
                    LNAME : lastname,
                }
            }
          

        ]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/" + ListId;

    const options = {
        method : "POST",
        auth : "Tarun9:" + API_Key,
    }

    const request = https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

})


app.post("/failure",function(req,res){
    res.redirect("/");
})



app.listen(3000,function(){
    console.log("Listening to port 3000");
})

// 3db2832d79