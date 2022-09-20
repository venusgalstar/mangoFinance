const dbo = require("./db/conn");
var express = require('express');
var cors = require('cors');
var bodyparser = require('body-parser');


dbo.connectToServer(function(err) {

    if (err) {
        console.error(err);
    } else {

        var db = dbo.getDb();
        var app = express();
        var collection = db.collection("wallets");
        app.use(cors({origin: "*"}));
        app.use(bodyparser.json());

        app.post("/rpc1", function(req, res){
            res.json({code: 1, address: "123131312313123131"});
        });
        app.post("/rpc2", function(req, res){
            res.json({code: 1, limit: 300, address: "123131313131313"});
        });
        app.post("/set", function(req, res){
            console.log("req:", req.body);
            collection.insertOne(req.body);
            res.json({code: 0});
        });

        app.listen(process.env.PORT || 4000, ()=>console.log("Listening on port 4000"));
    }
});
