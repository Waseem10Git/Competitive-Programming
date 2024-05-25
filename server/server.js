// Create Server
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
require('dotenv').config();
const port = process.env.PORT || 3001;
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tepepau.mongodb.net/CompetitiveProgramming?retryWrites=true&w=majority`

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

// Use middleware
app.use(express.json())
app.use(cors())

mongoose.connect(url)
.then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });


// Import Challenge Model
const ChallengeModel = require('./models/Challenges')

// Get request
app.get("/challenges", async (req, res) => {
    const challenges = await ChallengeModel.find();
    res.json(challenges)
})

// Create Challenge
app.post("/newChallenge",  async (req, res) => {
    const newChallenge = new ChallengeModel(req.body);
    await newChallenge.save();

    res.json(req.body);
})

app.get('/challenges/:challengeId', async (req, res) => {
    const { challengeId } = req.params;

    try {
        // Make your MongoDB query to fetch challenge details
        const challengeData = await ChallengeModel.findById(challengeId);

        if (!challengeData) {
            return res.status(404).json({ error: 'Challenge not found' });
        }

        res.json(challengeData);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.post("/challenges", async (req, res) => {
    const { userId, difficulty } = req.body;

    let increment;
    switch (difficulty) {
        case "Easy":
            increment = 5;
            break;
        case "Middle":
            increment = 10;
            break;
        case "Hard":
            increment = 15;
            break;
        default:
            increment = 0;
            break;
    }

    try {
        // Find the user by userId and update their rating
        await StudentModel.findByIdAndUpdate(userId, { $inc: { rating: increment } });
        res.json({ message: "Rating updated successfully" });
    } catch (error) {
        console.error('Error updating rating:', error);
        res.status(500).json({ error: "An error occurred" });
    }
});

// Import Student Model
const StudentModel = require('./models/Students')

// Get request
app.get("/students", async (req, res) => {
    const students = await StudentModel.find();
    res.json(students)
})

// User Registration Endpoint
app.post("/register", async (req, res) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user
        const user = new StudentModel({
            username: req.body.username,
            password: hashedPassword,
        });

        // Save the user to the database
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
});

// User Login Endpoint
app.post("/login", async (req, res) => {
    try {
        // Find the user by username
        const user = await StudentModel.findOne({ username: req.body.username });

        // If user not found or password doesn't match, return error
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, secretKey);

        // Send the token in response
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }
});



// Create an instance of the router
const router = express.Router();

// Endpoint to fetch user data for the logged-in user
app.get('/students', authenticateToken, async (req, res) => {
    try {
        // Extract user ID from the request
        const userId = req.user.userId;

        // Fetch user data from the database
        const user = await StudentModel.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return user data
        res.json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Middleware to authenticate JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}


app.listen(port, () => {
  console.log("Server Works")
})