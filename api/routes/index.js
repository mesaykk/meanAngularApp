const express = require("express");

const controllerGames = require("../controller/games.controller");
const controllerPublisher = require("../controller/publisher.controller");

//Game routes
const router = express.Router();
router.route("/games")
    .get(controllerGames.gamesGetAll)  
    .post(controllerGames.gamesAddOne);
router.route("/games/:gameId")
    .get(controllerGames.gamesGetOne)
    .put(controllerGames.gamesFullUpdateOne)
    .patch(controllerGames.gamesParialUpdateOne)
    .delete(controllerGames.gamesDeleteOne)

//Publisher routes
router.route("/games/:gameId/publisher")
    .get(controllerPublisher.publisherGetOne)
router.route("/games/:gameId/publisher")
    .post(controllerPublisher.publisherAddOne)
module.exports = router;