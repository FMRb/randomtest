var express = require('express');
var router = express.Router();
var PublishModel = require('../database/PublishModel');
var publishData = require('../database/publishData');
var graphData = require('../database/reachData');
var socketio = require("socket.io");

router.socket = null; //INITIALIZE WHEN THE SERVER RUNS
router.socketServer = function(server){
    router.io = socketio.listen(server);
};
//middleware to user for all the requests

router.use(function(req, res, next) {
   //debug
    console.log('Pass middleware');
    next();
});

/* API */

router.route('/publish')
    //Create an publish (accessed at POST http://localhost:3000/api/publish)
    .post(function(req, res) {
        var publish = new PublishModel(req.body); // Create a new publish TODO implement object
        publish.save();
        router.io.sockets.emit('newPublish',req.body);
        res.json({responde: 'publish created', status:"OK"});

    })
    //get all the publishs (accessed at GET http://localhost:3000/api/publish)
    .get(function(req, res) {
        res.json({response:publishData, status:"OK"});
    });

router.route('/publish/:publish_id')
    //get the publish by id (accessed at GET http://localhost:3000/api/publish/:publish_id)
    .get(function(req, res) {
        var idPublish = req.params.publish_id;
        var response = [];
        var i;
        for(i = 0; i < publishData.length; i++){
            if(publishData[i].id == idPublish) {
                response = publishData[i];
            }
        }
        res.json({response:response, status: "OK"});
    })
    //update the publish with this id (accessed at PUT http://localhost:3000/api/publish/:publish_id)
    .put(function(req, res) {
        //obtain parameters
        var idPublish = req.params.publish_id;
        for(i = 0; i < publishData.length; i++){
            if(publishData[i].id == idPublish) {
                publishData[i] = req.body;
                res.json({reponse:"Update item", status:"OK"});
                return;
            }
        }
        res.json({reponse:"error", status:"fail"});
        //Change publish with the req.body
    })
    //delete the publish with this id (accessed at DELETE http://localhost:3000/api/publish/:publish_id)
    .delete(function(req, res){
        //Obtain the element and remove it from the JSOn
        var idPublish = req.params.publish_id;
        var i;
        for(i = 0; i < publishData.length; i++){
            if(publishData[i].id == idPublish) {
                publishData.splice(i,1);
                response = "Element with id: " + idPublish + " deleted";
            }
        }

        res.json({response:response, status: "OK"});
    });

router.route('/graph')
    //get the graph data (accessed at GET http://localhost:3000/api/graph)
    .get(function(req, res) {
        res.json({response:graphData, status:"OK"});
    })
    .post(function(req, res) {

        var saveObj = {};
        saveObj[req.body.typePost] = [{ "timestamp": req.body.time, "value":req.body.value}];

        graphData.push(saveObj);

        router.io.sockets.emit('newGraphValue',graphData);
        res.json({responde: 'publish created', status:"OK"});
    });
module.exports = router;
