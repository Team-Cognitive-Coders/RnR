const mongoose = require('mongoose');

var TestCase = mongoose.model('TestCase', {
    id : {
        type: String,
        required: true,
        minlength: '',
        trim: true
    },
    bot_id : {
        type: String,
        required: true,
        minlength: '',
        trim: true
    },
    name : {
        type: String,
        trim: true
    },
    file_url : {
        type: String,
        required: true,
        minlength: '',
        trim: true
    }
});

module.export = {TestCase};