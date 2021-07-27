const mongoose = require('mongoose');

const speciesSchema = new mongoose.Schema (
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        classification: {
            type: String,
        },
        designation: {
            type: String,
        },
        average_height: {
            type: Number,
        },
        skin_colors: {
            type: String,
        },
        hair_colors: {
            type: String,
        },
        eye_colors: {
            type: String,
        },
        average_lifespan: {
            type: String,
        },
        language: {
            type: String,
        },
        homeworld: {
            type: String,
        },
    },
    { timestamps: true },
);

const Species = mongoose.model('Species', speciesSchema);

module.exports = Species;