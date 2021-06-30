const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
    name: String,
    // {
    //     type: String,
    //     // required: true
    // },
    address: String
    // location: {
        
    //     coordinate: {
    //         type: [Number],
    //         index: "2dshere"
    //     }
    // }
})

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: Number,
    year: Number,
    minPlayers: {
        type: Number,
        min: 1, 
        max: 10
    },
    maxPlayers: {
        type: Number,
        min: 1, 
        max: 10
    },
    minAge: {
        type: Number,
        min: 4, 
    },
    rate:{
        type: Number,
        min: 1, 
        max: 5,
        "default": 1
    },
    designers: String, 
    publisher: publisherSchema
});
mongoose.model("Game", gameSchema, "games");
