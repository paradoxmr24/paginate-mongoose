const mongoose = require('mongoose');

const contact = new mongoose.Schema({
    email: { type: String, required: true },
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        trim: true,
    },
    lastName: {
        type: String,
        default: '',
        maxlength: 255,
        trim: true,
    },
    birthday: Date,
    tags: [mongoose.Types.ObjectId],
    source: {
        type: String,
        enum: ['manual', 'form', 'imported'],
        required: true,
    },
    engagement: {
        type: String,
        required: true,
        default: 'rarely',
        enum: ['rarely', 'sometimes', 'often'],
    },
});

module.exports = mongoose.model('Contact', contact);
