const express = require('express');
const app = express();
const userRouter = require('./routes/userRoutes');
const noteRouter = require('./routes/noteRoutes');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();

const mongoose = require('mongoose');

app.use(express.json());

app.use(cors());

// Root route for API information
app.get("/", (req, res) => {
    res.json({
        message: "Notes API is running!",
        version: "1.0.0",
        endpoints: {
            "POST /user/signup": "Create new user account",
            "POST /user/login": "Login existing user",
            "GET /notes": "Get all notes (requires authentication)",
            "POST /notes": "Create new note (requires authentication)"
        },
        usage: {
            signup: "POST /user/signup with {username, email, password}",
            login: "POST /user/login with {email, password}"
        }
    });
});

app.use("/user", userRouter);
app.use("/notes", noteRouter);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT,  () => {
            console.log(`Server started on port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });






