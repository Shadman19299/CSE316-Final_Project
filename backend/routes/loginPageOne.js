const loginOneRouter = require('express').Router();
let Employee = require('../models/employee.model');

loginOneRouter.route('/:email/:password').get((req, res) => {
    Employee.findOne({email:req.params.email , password : req.params.password})
        .then(employee => {
            if(!employee){
                res.json({isValid: 'invalid'});
            }
            else{
                res.json({isValid: 'valid'});
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = loginOneRouter