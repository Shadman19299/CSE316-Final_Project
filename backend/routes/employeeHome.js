const employeeHomeRouter = require('express').Router();
let Employee = require('../models/employee.model');
let EmployeeTest = require('../models/employeeTest.model');

employeeHomeRouter.route('/:employeeID').get((req, res) => {
    Employee.findOne({"employeeID" : req.params.employeeID})
        .then(employee => {
            let list = [];
            EmployeeTest.find({testBarcode: {$in: employee.testsTaken }})
            .then((tests) => {
                tests.map((test) => {
                    list.push({
                        date : test.collectionTime,
                        result : test.result
                   })
                })

                res.json(list);
            })
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = employeeHomeRouter