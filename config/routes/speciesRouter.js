const express = require('express');
const Species = require('../../src/models/species');

const router = express.Router();

// GET ALL
router.get("/species", async (req, res) => {
    const species = await Species.find();
    res.send(species);
});

// GET ONE
router.get("/species/:_id", async (req, res) => {
    const species = await Species.findOne({ _id: req.params._id });
    species ? res.send(species) : res.send("species Does Not Exist");
});

// CREATE
router.post("/create-species", async (req, res) => {
    console.log(req.body);
    const exists = await Species.exists({ name: req.body.name });
    if (exists) {
        console.log("species Already Exists");
        res.redirect("/species");
        return;
    }
    const species = new Species({
        name: req.body.name,
        classification: req.body.classification,
        designation: req.body.designation,
        average_height: req.body.average_height,
        skin_colors: req.body.skin_colors,
        hair_colors: req.body.hair_colors,
        eye_colors: req.body.eye_colors,
        average_lifespan: req.body.average_lifespan,
        language: req.body.language,
        homeworld: req.body.homeworld
    });
    species.save();
    res.redirect("/species/" + species._id);
    console.log("species Created Successfully!");

});

// UPDATE
router.put('/species/:_id', async (req, res) => {
    const species = await Species.findOne({ _id: req.params._id });
    species ? res.send(species) : res.send("species Does Not Exist");

    // Find species and update it with the request body
    Species.findByIdAndUpdate(req.params._id, {
        name: req.body.name,
        classification: req.body.classification,
        designation: req.body.designation,
        average_height: req.body.average_height,
        skin_colors: req.body.skin_colors,
        hair_colors: req.body.hair_colors,
        eye_colors: req.body.eye_colors,
        average_lifespan: req.body.average_lifespan,
        language: req.body.language,
        homeworld: req.body.homeworld
    }, { new: true, useFindAndModify: false },)
    .then(species => {
        if(!species) {
            return res.status(404).send({
                message: "species not found with id " + req.params._id
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "species not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Error updating species with id " + req.params._id
        });
    });
});

// DELETE
router.delete('/species/:_id', async (req, res) => {
    const species = await Species.findOne({ _id: req.params._id });
    species ? res.send(species) : res.send("species Does Not Exist");

    Species.deleteOne({ _id: req.params._id });
    res.send("species Delete Successfully");
});

module.exports = router;
