let mongoose = require('mongoose');

let developersSchema = mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname: String,
    level: {
        type: String,
        validate: {
            validator: function (status) {
                return status === ("BEGINNER" || "EXPERT");
            },
            message: 'Level should be Beginner or Expert in capital letters'
        }
    },
    address: {
        state: String,
        suburb: String,
        street: String,
        Unit: Number
    }
});

let developersModel = mongoose.model('developers', developersSchema, 'developers');
module.exports = developersModel;