require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

let db;

async function connectToMongoDB() {
    try {
        if (db) {
            return db;
        }
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB cluster');
        db = mongoose.connection.useDb('test');
        return db;
    } catch (error) {
        console.error('Connection error:', error);
        throw error;
    }
}

const getDB = () => {
    if (!db) {
        throw new Error('Database not connected yet');
    }
    return db;
};

module.exports = {
    connectToMongoDB,
    getDB,
};