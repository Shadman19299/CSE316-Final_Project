const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wellTestingSchema = new Schema({
    poolBarcode: { type: Schema.ObjectId, ref: 'Pool' },
    wellBarcode: { type: Schema.ObjectId, ref: 'Well' },
    testingStartTime: {type: Date, required: true},
    testingEndTime: {type: Date, required: true},
    result: {type: String , required: true, trim: true},
},{
    timestamps : true,
});

const WellTesting = mongoose.model('WellTesting', wellTestingSchema);
module.exports = WellTesting;