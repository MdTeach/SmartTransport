const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    number_plate:{
        type: String,
        required: true,
        unique: true
    },
    max_speed:{
        type: Number
    },
    fine_status:{
        type: String
    },
    danger_status:{
        type:String
    }
});


var User = mongoose.model('User', VehicleSchema);
module.exports = User;