var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

mongoose.connect("mongodb://localhost:52032/simpleApplication");
var serverModel = mongoose.model("server",{Server_id: String, Environment: String});

app.get("/",function(req,res){
    //console.log(req);
    serverModel.find(function (err,server){
        res.send(server);
    })
});

app.post("/add", function (req,res){
    //console.log(req);
    var server_id = req.body.Server_id;
    var serverDocument = new serverModel({Server_id: server_id, Environment:"Production"});
    serverDocument.save(function(err){
        res.send();
    })
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.listen(3000);

/*
var serverDocument = new serverModel({Server_id: "MUSHNI-EBZDBZ1P", Environment:"Production"});
serverDocument.save(function(err){
    if(err) {
        console.log("failed");
    }else{
        console.log("saved");
    }
});
*/