const express = require('express');
const Starship = require('../../public/src/models/starship');

const router = express.Router();

// GET ALL
router.get("/starships", async (req, res) => {
    const starship = await Starship.find();
    res.send(starship);
});

// GET ONE
router.get("/starships/:_id", async (req, res) => {
    const starship = await Starship.findOne({ _id: req.params._id });
    starship ? res.send(starship) : res.send("starship Does Not Exist");
});

// CREATE
router.post("/create-starship", async (req, res) => {
    console.log(req.body);
    const exists = await Starship.exists({ name: req.body.name });
    if (exists) {
        console.log("starship Already Exists");
        res.redirect("/starships");
        return;
    }
    const starship = new Starship({
        name: req.body.name,
        model: req.body.model,
        manufacturer: req.body.manufacturer,
        cost_in_credits: req.body.cost_in_credits,
        length: req.body.length,
        max_atmosphering_speed: req.body.max_atmosphering_speed,
        crew: req.body.crew,
        passengers: req.body.passengers,
        cargo_capacity: req.body.cargo_capacity,
        consumables: req.body.consumables,
        hyperdrive_rating: req.body.hyperdrive_rating,
        MGLT: req.body.MGLT,
        starship_class: req.body.starship_class
    });
    starship.save();
    res.redirect("/starships/" + starship._id);
    console.log("starship Created Successfully!");

});

// UPDATE
router.put('/starships/:_id', async (req, res) => {
    const starship = await Starship.findOne({ _id: req.params._id });
    starship ? res.send(starship) : res.send("starship Does Not Exist");

    // Find starship and update it with the request body
    Starship.findByIdAndUpdate(req.params._id, {
        name: req.body.name,
        model: req.body.model,
        manufacturer: req.body.manufacturer,
        cost_in_credits: req.body.cost_in_credits,
        length: req.body.length,
        max_atmosphering_speed: req.body.max_atmosphering_speed,
        crew: req.body.crew,
        passengers: req.body.passengers,
        cargo_capacity: req.body.cargo_capacity,
        consumables: req.body.consumables,
        hyperdrive_rating: req.body.hyperdrive_rating,
        MGLT: req.body.MGLT,
        starship_class: req.body.starship_class
    }, { new: true, useFindAndModify: false },)
    .then(starship => {
        if(!starship) {
            return res.status(404).send({
                message: "starship not found with id " + req.params._id
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "starship not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Error updating starship with id " + req.params._id
        });
    });
});

// DELETE
router.delete('/starships/:_id', async (req, res) => {
    const starship = await Starship.findOne({ _id: req.params._id });
    starship ? res.send(starship) : res.send("starship Does Not Exist");

    Starship.deleteOne({ _id: req.params._id });
    res.send("starship Delete Successfully");
});

module.exports = router;
