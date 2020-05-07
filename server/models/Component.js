const mongoose = require('mongoose');

const ComponentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

const Component = mongoose.model('Component', ComponentSchema);

module.exports = Component;