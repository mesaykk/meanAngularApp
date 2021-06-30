const mongoose = require("mongoose");
const Game = mongoose.model("Game");

const _addPublisher = function(req, res, game){
    console.log("_AddPublisher ::: ", game);
    if(!game.publisher){
        game.publisher = {};
    }
    game.publisher.name=req.body.name;
    //game.publisher.location.address = req.body.address;
    //game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    game.save(function(err, updatedGame){
        const response = {
            status: 201,
            message: updatedGame
        }

        if(err){
            console.log("Error finding publisher")
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message)
    })
}
module.exports.publisherGetOne = function(req, res){
    console.log("GetOne publisher request recieved");
    const gameId= req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err, publisher){
        res.status(200).json(publisher);
    })
}
module.exports.publisherAddOne = function (req, res) {
    console.log("POST new Publisher")
    console.log(req.body);
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err, game){
        const response = {
            status: 201,
            message: game
        }
        if(err){
            console.log("Error creating publisher");
            response.status = 500;
            response.message = err;
        } else if(!game) {
            console.log("Error creating publisher");
            response.status = 404;
            response.message = {"message": "Game ID not found"};
        } 
        if(game){
            console.log("game is", game)
            _addPublisher(req, res, game);
            // game.publisher.name=req.body.name;
            // game.publisher.location.address = req.body.address;
            // game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)]
        } else {
            res.status(response.status).json(response.message)
        }
    })   
}