const employeeHomeRouter = require('express').Router();
let Employee = require('../models/employee.model');
let EmployeeTest = require('../models/employeeTest.model');

employeeHomeRouter.route('/:employeeID').get((req, res) => {
    Employee.findOne({employeeID : req.params.employeeID})
        .then(employee => {
            let list = [];
            employee.testsTaken.map(testsID => {
                EmployeeTest.findById(testsID)
                            .then(tests => list.push({
                                                     date : tests.collectionTime,
                                                     result : tests.result
                                                }))
                            .catch(err => res.status(400).json('Error: ' + err));      
            })
            res.json(list);
        }).catch(err => res.status(400).json('Error: ' + err));
});

module.exports = employeeHomeRouter