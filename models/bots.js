const mongoose = require('mongoose');

var Bot = mongoose.model('Bot', {
    id : {
        type: String,
        required: true,
        minlength: '',
        trim: true
    },
    name : {
        type: String,
        trim: true
    },
    photo : {
        type: String,
        trim: true
    }
});

module.export = {Bot};