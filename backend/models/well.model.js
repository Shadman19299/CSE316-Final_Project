const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wellSchema = new Schema({
    wellBarcode: {type: String , required: true, unique: true, trim: true},
},{
    timestamps : true,
});

const Well = mongoose.model('Well', wellSchema);
module.exports = Well;