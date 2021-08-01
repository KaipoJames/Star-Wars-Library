// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

//const envPath = path.join(__dirname, '..', '.env');
//console.log(envPath);
require('dotenv').config();

const app = express();
const router = require('./config/routes/router');
const PORT = process.env.PORT || 5000;
let LOG_OUTPUT = `Server is listening on port ${PORT} at: http://localhost:${PORT}`;

const main = {
    init(){
        this.addMiddleware();
        this.checkForProductionBuild();
        this.startServer();
    },

    addMiddleware() {
        app.use(express.urlencoded({ extended: true })); // Enable our form data to be accessed by the 'req' variable in our routes
        app.use(express.json());
        //app.use(express.static("public/"));
        app.use(cors()); // enable cross-origin resource sharing
        app.use("/", router);
    },

    checkForProductionBuild() {
        // Check if our app is running on heroku
        if (process.env.NODE_ENV === 'production') {
            LOG_OUTPUT = `Server is listening on port ${PORT} at: https://star-wars-library-kaipo.herokuapp.com/`
            console.log("Star-Wars-Library App Detected on Heroku!");
            app.use(express.static('client/build'));

            app.get("*", (req, res) => {
                res.sendFile(path.join(__dirname, "client", "build", "index.html"));
            });
        }
    },

    connectToDB() {
        mongoose.connect(process.env.URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true, 
            useFindAndModify: true,
        }).then(() => {
        console.log("Connected to mongoDB!"); 
            },
        err => { console.log(err) }, 
        );
    },

    startServer() {
        // CONNECT TO EXPRESS SERVER, THEN TO MongoDB
        app.listen(PORT, (err, res) => {
            if (err) console.log(err);
            console.log(LOG_OUTPUT);
            this.connectToDB();
        });
    }
}

main.init();



