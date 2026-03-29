const mongoose = require('mongoose');

/**
 * @description: Database connection logic using Mongoose
 * @function: connectDB
 */
const connectDB = async() => {
    try {
        // MONGO_URI variable .env file se load hoga
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);

        // Exit process with failure (1) if connection fails
        process.exit(1);
    }
};

module.exports = connectDB;