const express = require('express');
const Character = require('../../public/src/models/character');
//const path = require('path');

const router = express.Router();

//const viewsPath = path.join(__dirname, '..', 'public', 'views');

// router.get("/", (req, res) => {
//     //res.send("Welcome To My Star Wars Rest API! You have opened a GET request to the homepage.");
//     res.sendFile('index.html', {root : viewsPath});
// });

// GET ALL
router.get("/characters", async (req, res) => {
    const characters = await Character.find();
    res.send(characters);
});

// GET ONE
router.get("/characters/:_id", async (req, res) => {
    const character = await Character.findOne({ _id: req.params._id });
    character ? res.send(character) : res.send("Character Does Not Exist");
});

// CREATE
router.post("/create-character", async (req, res) => {
    console.log(req.body);
    const exists = await Character.exists({ name: req.body.name });
    if (exists) {
        console.log("Character Already Exists");
        res.redirect("/characters");
        return;
    }
    const character = new Character({
        name: req.body.name,
        height: req.body.height,
        mass: req.body.mass,
        hair_color: req.body.hair_color,
        skin_color: req.body.skin_color,
        eye_color: req.body.eye_color,
        birth_year: req.birth_year,
        gender: req.body.gender,
        homeworld: req.body.homeworld,
        species: req.body.species
    });
    character.save();
    res.redirect("/characters/" + character._id);
    console.log("Registered Successfully!");

});

// UPDATE
router.put('/characters/:_id', async (req, res) => {
    const character = await Character.findOne({ _id: req.params._id });
    character ? res.send(character) : res.send("Character Does Not Exist");

    // Find Character and update it with the request body
    Character.findByIdAndUpdate(req.params._id, {
        name: req.body.name,
        height: req.body.height,
        mass: req.body.mass,
        hair_color: req.body.hair_color,
        skin_color: req.body.skin_color,
        eye_color: req.body.eye_color,
        birth_year: req.birth_year,
        gender: req.body.gender,
        homeworld: req.body.homeworld,
        species: req.body.species
    }, { new: true, useFindAndModify: false },)
    .then(character => {
        if(!character) {
            return res.status(404).send({
                message: "Character not found with id " + req.params._id
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Character not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Error updating character with id " + req.params._id
        });
    });
});

// DELETE
router.delete('/characters/:_id', async (req, res) => {
    const character = await Character.findOne({ _id: req.params._id });
    character ? res.send(character) : res.send("Character Does Not Exist");

    character.deleteOne({ _id: req.params._id });
    res.send("Character Delete Successfully");
});

module.exports = router;
