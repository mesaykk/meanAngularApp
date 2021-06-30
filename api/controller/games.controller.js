
const mongoose = require("mongoose");
const Game = mongoose.model("Game");

// const runGeoQuery = function(req, res){
//     const distance = parseFloat(req.query.distance);
//     // const lng = parseFloat(req.query.lng);
//     // const lat = parseFloat(req.query.lat);
//     // console.log("lat ", lat, " Lng ", lng);
//     const query = {
//         "publisher.location": {
//             $near: {
//                 $geometry: {
//                     type: "point",
//                     condinates: [91.9637, 47.0076]
//                 },
//                 $maxDistance: distance,
//                 $minDistance: 0
//             }
//         }
//     };
//     Game.find(query).exec(function(err, games){
//         if(err){
//             console.log("Error ", err);
//             res.status(500).json({"error": err});
//         }else {
//             console.log("Found games ", games)
//             res.status(200).json(games)
//         }
//     })
// }

module.exports.gamesGetAll = function (req, res) {
    console.log("JSON Request Received");
    let offset = 0;
    let count = 5;
    const maxCount = 8;
    // if(req.query && req.query.distance){
    //     runGeoQuery(req, res);
    //     return;
    // }
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count);
    }
    if(isNaN(offset) || isNaN(count)){
        res.status(400).json({"massage": "QueryString offset and count is must be a number."})
        return;
    }
    if(count > maxCount){
        count = maxCount;
        // console.log("Error finding games", err);
        // res.status(400).json({"massage": "Cannot exceed cont of "+maxCount});
    }

    console.log("offset", offset, " count", count);

    Game.find().skip(offset).limit(count).exec(function(err, games){
        if(err){
            console.log("Error finding games ", err);
            res.status(500).json(err);
        }else {
            console.log("Found games",games);
            res.status(200).json(games);
        }        
    })
}
module.exports.gamesGetOne = function(req, res) {
    console.log("GetOne request received")
    //console.log(req.body);
    const gameId = req.params.gameId;
    if(gameId.length != 24){
        res.status(400).json({"massage": "request parameter gameId is not correct ", err});
        return;
    }
    Game.findById(gameId).exec(function(err, game){
        const response = {
            status: 200,
            message: game
        }

        if(err){
            console.log("Error finding game")
            response.status = 500;
            response.message = err;
        } else if (!game){
            response.status = 400;
            response.message = {"message": "Game ID not found"}
        }
        res.status(response.status).json(response.message);
        console.log(game);
    }); 
}
module.exports.gamesAddOne = function(req, res) {
    console.log("POST new game")
    console.log(req.body);
    const newGame = {
        title: req.body.title,
        price: parseFloat(req.body.price),
        year: parseInt(req.body.year),
        minPlayers: parseInt(req.body.minPlayers),
        maxPlayers: parseInt(req.body.maxPlayers),
        minAge: parseInt(req.body.minAge),
        rate: parseInt(req.body.rate),
        designers: req.body.designers,
        publisher: {}
    };
    console.log("Print game ", newGame);
    Game.create(newGame, function(err, game){
        const response = {
            status: 201,
            message: game
        }
        if(err){
            console.log("Error creating game");
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    })   
}
module.exports.gamesFullUpdateOne = function(req, res){
    console.log("FullUpdateOne request received");
    const gameId = req.params.gameId;
    if(gameId.length != 24){
        res.status(400).json({"message": "RequestParam gameId is not correct"})
        return;
    }
    Game.findById(gameId).exec(function(err, game){
        const response = {
            status: 204,
            message: game
        };
        if(err){
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        }else if(!game){
            
            response.status = 400;
            response.message = {"message": "Game ID not found"};
        }
        if(response.status !== 204){
            res.status(response.status).json(response.message);
        }else {
            game.title =  req.body.title;
            game.price = parseFloat(req.body.price);
            game.year = parseInt(req.body.year);
            game.minPlayers = parseInt(req.body.minPlayers);
            game.maxPlayers = parseInt(req.body.maxPlayers);
            game.minAge= parseInt(req.body.minAge);
            game.rate = parseInt(req.body.rate);
            game.designers = req.body.designers;
            game.publisher = {};
            game.save(function(err, updatedGame){
                if(err){
                    response.status = 500;
                    response.massage = err;
                } else {
                    response.message = updatedGame;
                }
                res.status(response.status).json(response.message);
            })
        }

    })
}
module.exports.gamesParialUpdateOne = function(req, res){
    console.log("Full UpdateOne resquest received");
    const gameId = req.params.gameId;
    if(gameId.length != 24){
        res.status(400).json({"message": "RequestParam gameId is not correct"});
        return;
    }
    Game.findById(gameId).exec(function(err, game){
        const response = {
            status: 204,
            message: game
        } 
        if(err){
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        }else if(!game){
            
            response.status = 400;
            response.message = {"message": "Game ID not found"};
        }
        if(response.status !== 204){
            res.status(response.status).json(response.message);
        } else {
            if(req.body.title){
                game.title = req.body.title;
            }
            if(req.body.year){
                game.year = req.body.year;
            }
            if(req.body.minPlayer){
                game.minPlayers = req.body.minPlayers;
            }
            if(req.body.maxPlayer){
                game.maxPlayers = req.body.maxPlayers;
            }
            if(req.body.minAge){
                game.minAge = req.body.minAge;
            }
            if(req.body.rate){
                game.rate = req.body.rate;
            }
            if(req.body.designers){
                game.designers = req.body.designers;
            }
            game.save(function(err, updatedGame){
                if(err){
                    response.status = 500;
                    response.massage = err;
                } else {
                    response.message = updatedGame;
                }
                res.status(response.status).json(response.message);
            })
        }
    })
}
module.exports.gamesDeleteOne = function(req, res){
    console.log("GetOne Request received");
    const gameId = req.params.gameId;
    // if(gameId != 24){
    //     res.status(400).json({"message": "RequestParam gameId is not correct"});
    //     return;
    // }
    Game.findByIdAndRemove(gameId).exec(function(err, deletedGame){
        const response = {
            status: 204,
            message: game
        } 
        if(err){
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        }else if(!deletedGame){
            response.status = 404;;
            response.message = {"message": "Game ID not found"}
        } 
        res.status(response.status).json(response.message);       
    })
}