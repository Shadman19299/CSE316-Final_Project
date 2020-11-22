const testCollectionRouter = require('express').Router();

let Employee = require('../models/employee.model');
let EmployeeTest = require('../models/employeeTest.model');

testCollectionRouter.route('/').post((req, res) => {
    const employeeID = req.body.employeeID;
    const barcode = req.body.testBarcode;
    var date = new Date();

    const newTest = new EmployeeTest({
        barcode,
        employeeID,
        date
    });
  
    newTest.save()
    .then(() => res.json('New Test added!'))
    .catch(err => res.status(400).json('Error: ' + err));

    let testID;
    EmployeeTest.find({testBarcode : barcode}).then(test => {testID = test['_id']});


    Employee.findById(employeeID)
      .then(employee => {
        employee.testsTaken.push(testID);
  
        employee.save()
          .then(() => res.json('Employee updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});


testCollectionRouter.route('/').delete((req, res) => {
    const list = req.body
    list.map(object =>{
        const employeeID = object.employee;
        const barcode = object.testBarcode;

        Employee.find({employeeID : employeeID}).then(employee => {
            employee.testsTaken = employee.testsTaken.filter(codes => codes != barcode)
    
            employee.save()
              .then(() => res.json('Employee updated!'))
              .catch(err => res.status(400).json('Error: ' + err));
        })

        employeeTest.deleteOne({testBarcode: barcode})
            .then(() => res.json('Test deleted.'))
            .catch(err => res.status(400).json('Error: ' + err));
    })
});

testCollectionRouter.route('/').get((req, res) =>{
    EmployeeTest.find({}, 'testBarcode employeeID')
                .then(result => res.json(result))
                .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = testCollectionRouter