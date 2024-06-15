const mongoose = require("mongoose");

async function connectDB() {
    try {
        // Ensure the environment variable is properly referenced
        const dbUri = process.env.MONGODB_URI; // Use MONGODB_URI or the actual variable name you used
        if (!dbUri) {
            throw new Error("MongoDB URI is undefined");
        }
        await mongoose.connect(dbUri);
        console.log("Connected to Database".yellow);
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;
