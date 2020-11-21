const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wellTestingSchema = new Schema({
    poolBarcode: { type: Schema.ObjectId, ref: 'PoolMap' },
    wellBarcode:  {type: String , required: true, unique: true, trim: true},
    testingStartTime: {type: Date, required: true},
    testingEndTime: {type: Date, required: true},
    result: {type: String , required: true, trim: true},
},{
    timestamps : true,
});

const WellTesting = mongoose.model('WellTesting', wellTestingSchema);
module.exports = WellTesting;