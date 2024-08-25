const mongoose = require("mongoose")
const { Schema } = require("mongoose");

const ChallengeSchema = new mongoose.Schema({
    title:{
        type: String
    },
    language:{
        type: String
    },
    difficulty:{
        type: String
    },
    solved:{
        type: Number,
        default: 0
    },
    rate:{
        type: Number
    },
    date:{
        type: Date
    },
    duration:{
        type: Number
    },
    description:{
        type: String
    },
    inputForm:{
        type: String
    },
    outputForm:{
        type: String
    },
    sampleInput:{
        type: String
    },
    sampleOutput:{
        type: String
    },
})

const ChallengeModel = mongoose.model("challenges", ChallengeSchema)
module.exports = ChallengeModel