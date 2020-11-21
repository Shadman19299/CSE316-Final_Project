const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeTestSchema = new Schema({
    testBarcode: {type: String , required: true, unique: true, trim: true},
    employeeID: { type: Schema.ObjectId, ref: 'Employee' },
    collectionTime: {type: Date, required: true},
    collectedBy: { type: Schema.ObjectId, ref: 'LabEmployee' }
},{
    timestamps : true,
});

const EmployeeTest = mongoose.model('EmployeeTest', employeeTestSchema);
module.exports = EmployeeTest;