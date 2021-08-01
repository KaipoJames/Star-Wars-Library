const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema (
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        height: {
            type: String,
        },
        mass: {
            type: String,
        },
        hair_color: {
            type: String,
        },
        skin_color: {
            type: String,
        },
        eye_color: {
            type: String,
        },
        birth_year: {
            type: String,
        },
        gender: {
            type: String,
        },
        homeworld: {
            type: String,
        },
        species: {
            type: String,
        },
    },
    { timestamps: true },
);

const User = mongoose.model('Character', characterSchema);

module.exports = User;