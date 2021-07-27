// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const router = require('./config/routes');

app.use(express.urlencoded({ extended: true })); // Enable our form data to be accessed by the 'req' variable in our routes
app.use(express.json());
app.use(express.static("public/"));

app.use("/", router);

// CONNECT TO EXPRESS SERVER, THEN TO MongoDB
app.listen(process.env.PORT || 5000, (err, res) => {
    if (err) console.log(err);
    console.log("Server is listening on port 5000 at: http://localhost:5000");

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
});
