const mongoose = require('mongoose');

const GSSocialServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    management: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    established_by: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    other: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('GSSocialService', GSSocialServiceSchema);