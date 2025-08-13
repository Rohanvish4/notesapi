const mongoose = require('mongoose');

async function cleanup() {
    try {
        await mongoose.connect("mongodb+srv://admin0:admin0@cluster0.e7kyako.mongodb.net/");
        console.log("Connected to MongoDB");
        
        // Drop the notes collection to remove the unique index
        await mongoose.connection.db.collection('notes').drop();
        console.log("Notes collection dropped successfully");
        
        await mongoose.connection.close();
        console.log("Disconnected from MongoDB");
    } catch (error) {
        if (error.message === 'ns not found') {
            console.log("Notes collection doesn't exist - that's fine");
        } else {
            console.error("Error:", error.message);
        }
        await mongoose.connection.close();
    }
}

cleanup();
