import mongoose from "mongoose";

var db: mongoose.Mongoose | null = null;

export async function getDb() {

    // If the database connection is already initialized, return it
    if (db) {
        return db
    }

    // Import the Mongoose class dynamically
    return await mongoose.connect(
        process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase'
    ).then((mongoose) => {
        db = mongoose;
        return db;
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        return null
    })

}