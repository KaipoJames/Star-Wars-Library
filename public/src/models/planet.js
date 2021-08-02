const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema (
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        rotation_period: {
            type: String,
        },
        orbital_period: {
            type: String,
        },
        diameter: {
            type: Number,
        },
        climate: {
            type: String,
        },
        gravity: {
            type: String,
        },
        terrain: {
            type: String,
        },
        surface_water: {
            type: String,
        },
        population: {
            type: String,
        },
    },
    { timestamps: true },
);

const Planet = mongoose.model('Planet', planetSchema);

module.exports = Planet;