const express = require('express');
const path = require('path');

const router = express.Router();
const characterRouter = require('./characterRouter');
const planetRouter = require('./planetRouter');
const speciesRouter = require('./speciesRouter.js');
const starshipsRouter = require('./starshipRouter');
const vehicleRouter = require('./vehicleRouter.js');

const viewsPath = path.join(__dirname, '..', '..', 'public', 'views');
console.log(reactPath);

router.get("/", (req, res) => {
    //res.send("Welcome To My Star Wars Rest API! You have opened a GET request to the homepage.");
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

router.use('', characterRouter);
router.use('', planetRouter);
router.use('', speciesRouter);
router.use('', starshipsRouter);
router.use('', vehicleRouter);

module.exports = router;