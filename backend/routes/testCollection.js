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
        result: result
    });
  
    newTest.save()
    .then(() => res.write('New Test added!'))
    .catch(err => res.status(400).json('Error 21: ' + err));

    let testID;
    EmployeeTest.find({testBarcode : barcode})
                .then(test => {
                    testID = test._id

                    Employee.findOne({employeeID: employeeID})
                    .then(employee => {
                        if(typeof employee.testsTaken == 'undefined'){
                            console.log('came to undefined')
                            console.log(employee)
                            employee.testsTaken = [testID];
                        }
                        else{
                            console.log('came to defined')
                            console.log(employee)
                            console.log(employee.testsTaken)
                            employee.testsTaken.push(testID);
                        }

                        employee.save()
                        .then(() => res.write('Employee updated!'))
                        .catch(err => console.log('Error 44: ' + err));
                        res.end();
                    })
                    .catch(err => console.log('Error 46: ' + err));
                })
                .catch(err => console.log('Error 48: ' + err));

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