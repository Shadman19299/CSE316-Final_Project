const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    employeeID: {type: String , required: true, unique: true, trim: true},
    email: {type: String , required: true, unique: true, trim: true},
    firstName: {type: String , required: true, trim: true},
    lastName: {type: String , required: true, trim: true},
    password: {type: String , required: true, trim: true},
    testsTaken: [{type: String, trim: true}]
},{
    timestamps : true,
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;