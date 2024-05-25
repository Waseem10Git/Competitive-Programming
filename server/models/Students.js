const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const StudentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    score: {
        type: Number,
        default: 0,
    },
    solvedChallenges: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
    },
});

StudentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const StudentModel = mongoose.model("students", StudentSchema)
module.exports = StudentModel