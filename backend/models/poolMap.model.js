const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const poolMapSchema = new Schema({
    testBarcode: [{ type: Schema.ObjectId, ref: 'EmployeeTest' }],
    poolBarcode:  {type: String , required: true, unique: true, trim: true},

},{
    timestamps : true,
});

const PoolMap = mongoose.model('PoolMap', poolMapSchema);
module.exports = PoolMap;