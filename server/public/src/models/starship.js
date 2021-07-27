const mongoose = require('mongoose');

const starshipSchema = new mongoose.Schema (
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        model: {
            type: String,
        },
        manufacturer: {
            type: String,
        },
        cost_in_credits: {
            type: Number,
        },
        length: {
            type: String,
        },
        max_atmosphering_speed: {
            type: String,
        },
        crew: {
            type: String,
        },
        passengers: {
            type: String,
        },
        cargo_capacity: {
            type: String,
        },
        consumables: {
            type: String,
        },
        hyperdrive_rating: {
            type: String,
        },
        MGLT: {
            type: String,
        },
        starship_class: {
            type: String,
        }
    },
    { timestamps: true },
);

const Starship = mongoose.model('Starship', starshipSchema);

module.exports = Starship;