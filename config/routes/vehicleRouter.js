const express = require('express');
const Vehicle = require('../../src/models/vehicle');

const router = express.Router();

// GET ALL
router.get("/vehicles", async (req, res) => {
    const vehicle = await Vehicle.find();
    res.send(vehicle);
});

// GET ONE
router.get("/vehicles/:_id", async (req, res) => {
    const vehicle = await Vehicle.findOne({ _id: req.params._id });
    vehicle ? res.send(vehicle) : res.send("vehicle Does Not Exist");
});

// CREATE
router.post("/create-vehicle", async (req, res) => {
    console.log(req.body);
    const exists = await Vehicle.exists({ name: req.body.name });
    if (exists) {
        console.log("vehicle Already Exists");
        res.redirect("/vehicles");
        return;
    }
    const vehicle = new Vehicle({
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
        vehicle_class: req.body.vehicle_class
    });
    vehicle.save();
    res.redirect("/vehicles/" + vehicle._id);
    console.log("vehicle Created Successfully!");

});

// UPDATE
router.put('/vehicles/:_id', async (req, res) => {
    const vehicle = await Vehicle.findOne({ _id: req.params._id });
    vehicle ? res.send(vehicle) : res.send("vehicle Does Not Exist");

    // Find vehicle and update it with the request body
    Vehicle.findByIdAndUpdate(req.params._id, {
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
        vehicle_class: req.body.vehicle_class
    }, { new: true, useFindAndModify: false },)
    .then(vehicle => {
        if(!vehicle) {
            return res.status(404).send({
                message: "vehicle not found with id " + req.params._id
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "vehicle not found with id " + req.params._id
            });                
        }
        return res.status(500).send({
            message: "Error updating vehicle with id " + req.params._id
        });
    });
});

// DELETE
router.delete('/vehicles/:_id', async (req, res) => {
    const vehicle = await Vehicle.findOne({ _id: req.params._id });
    vehicle ? res.send(vehicle) : res.send("vehicle Does Not Exist");

    Vehicle.deleteOne({ _id: req.params._id });
    res.send("vehicle Delete Successfully");
});

module.exports = router;
