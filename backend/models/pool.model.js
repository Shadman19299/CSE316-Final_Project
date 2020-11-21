const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const poolSchema = new Schema({
    poolBarcode: {type: String , required: true, unique: true, trim: true},
},{
    timestamps : true,
});

const Pool = mongoose.model('Pool', poolSchema);
module.exports = Pool;