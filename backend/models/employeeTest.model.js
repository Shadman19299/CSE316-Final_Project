const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeTestSchema = new Schema({
    testBarcode: {type: String , required: true, unique: true, trim: true},
    employeeID: { type: String, trime: true },
    collectionTime: {type: Date, required: true},
    result: {type: String, default: "In Progress"}
},{
    timestamps : true,
});

const EmployeeTest = mongoose.model('EmployeeTest', employeeTestSchema);
module.exports = EmployeeTest;