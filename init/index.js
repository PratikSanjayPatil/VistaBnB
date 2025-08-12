const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

//Call the main function to connect to MongoDB

main().then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});


//Connect to MongoDB

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/vistabnb");
};

const intializeDatabase = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner: '6894a5ce00e9ea798ed303b6'}))
    await Listing.insertMany(initData.data);
    console.log("Database initialized with sample data");
}

intializeDatabase();

