const employeeLoginRouter = require('express').Router();
let Employee = require('../models/employee.model');

employeeLoginRouter.route('/:email/:password').get((req, res) => {
    Employee.findOne({email:req.params.email , password : req.params.password})
        .then(employee => res.json({employeeID : employee.employeeID})
        ).catch(err => res.status(400).json('Error: ' + err));
});

module.exports = employeeLoginRouter