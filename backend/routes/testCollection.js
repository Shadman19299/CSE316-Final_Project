const testCollectionRouter = require('express').Router();

let Employee = require('../models/employee.model');
let EmployeeTest = require('../models/employeeTest.model');

testCollectionRouter.route('/').post((req, res) => {
    const employeeID = req.body.employeeID;
    const barcode = req.body.testBarcode;
    var date = new Date();
    var result = "In Progress"

    const newTest = new EmployeeTest({
        testBarcode: barcode,
        employeeID: employeeID, 
        collectionTime: date,
        result: "In Progress"
    });
  
    newTest.save()
    .then(() => {
        res.write('New test added');
        Employee.findOne({employeeID: employeeID})
            .then(employee => {
                Employee.findOneAndUpdate({ _id: employee["_id"]}, { $push: { testsTaken: barcode } }).exec();
                res.end();
            })
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


testCollectionRouter.route('/').delete((req, res) => {
    const employeeID = req.body.employee;
    const barcode = req.body.testBarcode;

    Employee.findOne({employeeID : employeeID})
        .then(employee => {
            employee.testsTaken = employee.testsTaken.filter(codes => codes != barcode)
            employee.save()
                .then(() => {
                    res.write('Employee updated!');
                    EmployeeTest.deleteOne({testBarcode: barcode})
                        .then(() => {
                            res.write('Test deleted.');
                            res.end();
                        })
                        .catch(err => res.status(400).json('Error: ' + err));

                })
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


testCollectionRouter.route('/').get((req, res) =>{
    EmployeeTest.find({}, 'testBarcode employeeID')
                .then(result => res.json(result))
                .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = testCollectionRouter