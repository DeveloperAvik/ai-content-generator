const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://developeravik:6WVRQCYP1UhYVsJ0@content-generator.cxo6kda.mongodb.net/content-generator-ai?retryWrites=true&w=majority&appName=content-generator"
    );
    console.log(`Mongodb connected ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDb ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

// ! 6WVRQCYP1UhYVsJ0
