const mongoose = require('mongoose');

const db = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        })

        console.log('mongoDB Connected...');

    } catch(err) {
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;