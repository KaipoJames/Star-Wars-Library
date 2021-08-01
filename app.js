// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
//const path = require('path');
const cors = require('cors');

//const envPath = path.join(__dirname, '..', '.env');
//console.log(envPath);
require('dotenv').config();

const app = express();
const router = require('./config/routes/router');
const PORT = process.end.PORT || 5000;

app.use(express.urlencoded({ extended: true })); // Enable our form data to be accessed by the 'req' variable in our routes
app.use(express.json());
app.use(express.static("public/"));
app.use(cors());

app.use("/", router);

// Check if our app is running on heroku
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// CONNECT TO EXPRESS SERVER, THEN TO MongoDB
app.listen(PORT, (err, res) => {
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
