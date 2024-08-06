const mongoose = require('mongoose');

const GSSocialOrgSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    chairman: {
        type: String,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('GSSocialOrgs', GSSocialOrgSchema);