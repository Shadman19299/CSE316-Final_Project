const testCollectionRouter = require('express').Router();

let Employee = require('../models/employee.model');
let EmployeeTest = require('../models/employeeTest.model');

testCollectionRouter.route('/').post((req, res) => {
    const employeeID = req.body.employeeID;
    const barcode = req.body.testBarcode;
    var date = new Date();

    const newTest = new EmployeeTest({
        testBarcode: barcode,
        employeeID: employeeID, 
        collectionTime: date,
        result: "In Progress"
    });
  
    newTest.save()
    .then((test) => {
        res.json('New Test added!');
        let testID =  test['_id'];
        Employee.findOne({employeeID: employeeID})
            .then(employee => {
                Employee.findOneAndUpdate({ _id: employee["_id"]}, { $push: { testsTaken: testID } }).exec();
            })
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