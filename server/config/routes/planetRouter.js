const express = require('express');
const Planet = require('../../public/src/models/planet');

const router = express.Router();

// GET ALL
router.get("/planets", async (req, res) => {
    const planets = await Planet.find();
    res.send(planets);
});

// GET ONE
router.get("/planets/:_id", async (req, res) => {
    const planet = await Planet.findOne({ _id: req.params._id });
    planet ? res.send(planet) : res.send("planet Does Not Exist");
});

// CREATE
router.post("/create-planet", async (req, res) => {
    console.log(req.body);
    const exists = await Planet.exists({ name: req.body.name });
    if (exists) {
        console.log("planet Already Exists");
        res.redirect("/planets");
        return;
    }
    const planet = new Planet({
        name: req.body.name,
        rotation_period: req.body.rotation_period,
        orbital_period: req.body.orbital_period,
        diameter: req.body.diameter,
        climate: req.body.climate,
        gravity: req.body.gravity,
        terrain: req.body.terrain,
        surface_water: req.body.surface_water,
        population: req.body.population,
    });
    planet.save();
    res.redirect("/planets/" + planet._id);
    console.log("Planet Created Successfully!");

});

// UPDATE
router.put('/planets/:_id', async (req, res) => {
    const planet = await Planet.findOne({ _id: req.params._id });
    planet ? res.send(planet) : res.send("planet Does Not Exist");

    // Find planet and update it with the request body
    Planet.findByIdAndUpdate(req.params._id, {
        name: req.body.name,
        rotation_period: req.body.rotation_period,
        orbital_period: req.body.orbital_period,
        diameter: req.body.diameter,
        climate: req.body.climate,
        gravity: req.body.gravity,
        terrain: req.body.terrain,
        surface_water: req.body.surface_water,
        population: req.body.population,
    }, { new: true, useFindAndModify: false },)
    .then(planet => {
        if(!planet) {
            return res.status(404).send({
                message: "planet not found with id " + req.params._id
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "planet not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Error updating planet with id " + req.params._id
        });
    });
});

// DELETE
router.delete('/planets/:_id', async (req, res) => {
    const planet = await Planet.findOne({ _id: req.params._id });
    planet ? res.send(planet) : res.send("planet Does Not Exist");

    Planet.deleteOne({ _id: req.params._id });
    res.send("planet Delete Successfully");
});

module.exports = router;
