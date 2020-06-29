//jshint esversion: 6

const express =  require("express");
const bodyParser = require("body-parser");
const app = express();
const request = require("request");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(request,response){
  response.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req, res){
  var firstname = req.body.fname;
  var lastname = req.body.lname;
  var email = req.body.email;
  //console.log(firstname,lastname,email);
  //res.send(fname,lname,email);
  var data = {
    members: [
      {
      email_address :email,
      status :  "subscribed",
      id : "12133123",
      merge_fields: {
        FNAME:firstname,
        LNAME:lastname
        }
      }
    ]
};
  var jsonData = JSON.stringify(data);
  console.log(jsonData);
  var options = {
    url: "https://ankush:46f065c110709c6c63e9b9329414b2d7-us10@us10.api.mailchimp.com/3.0/lists/5a362f1d33",
    method : "POST",
    body:jsonData
  };

  request(options,function(error,response,body){
  //  console.log(response);
    console.log(response.statusCode);
    if(response.statusCode != 200 ){
      res.sendFile(__dirname + "/failure.html");
    }else{
    res.sendFile(__dirname + "/success.html");
    }
  });
});
app.post("/failure",function(req,res){
  res.redirect("/");
})
app.post("/success",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
  console.log("server started successfully on port 3000");
})


//api
// 46f065c110709c6c63e9b9329414b2d7-us10

//list
//5a362f1d33
