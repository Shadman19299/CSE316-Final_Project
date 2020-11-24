const wellTestingRouter = require('express').Router();

let WellTesting = require('../models/wellTesting.model');
let PoolMap = require('../models/poolMap.model');
let EmployeeTest = require('../models/employeeTest.model');

wellTestingRouter.route('/').get((req, res) => {
    WellTesting.find({})
        .then(wells => {
            res.json(wells);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

wellTestingRouter.route('/').post((req, res) => {
    const wellBarcode = req.body.wellBarcode;
    const poolBarcode = req.body.poolBarcode;
    const result = req.body.result;

    const wellTesting = new WellTesting({
        wellBarcode: wellBarcode,
        poolBarcode: poolBarcode,
        result: result,
        testingStartTime: new Date(),
        testingEndTime: new Date()
    });
  
    wellTesting.save()
    .then(() => { 
        PoolMap.findOne({poolBarcode: poolBarcode})
        .then(pool => {
            pool.testBarcode.map(code => {
                EmployeeTest.findOneAndUpdate({testBarcode: code}, {result: result}).exec()
                .then()
                .catch(err => res.status(400).json('Error: ' + err));
            })
        })
        .then(() => res.json('Well added'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));

});


wellTestingRouter.route('/').delete((req, res) => {
    WellTesting.deleteMany({"wellBarcode": {$in: req.body}})
        .then(() => res.json("Wells deleted"))
        .catch(err => res.status(400).json('Error: ' + err));
});


wellTestingRouter.route('/').put((req, res) => {
    const wellBarcode = req.body.wellBarcode;
    const poolBarcode = req.body.poolBarcode;
    const result = req.body.result;

    WellTesting.findOneAndUpdate({wellBarcode: wellBarcode}, 
        {
        wellBarcode: wellBarcode,
        poolBarcode: poolBarcode,
        result: result
        })
        .then(() => {
            PoolMap.findOne({poolBarcode: poolBarcode})
                .then(pool => {
                    pool.testBarcode.map(code => {
                    EmployeeTest.findOneAndUpdate({testBarcode: code}, {result: result}).exec()
                        .then()
                        .catch(err => res.status(400).json('Error: ' + err));
                    })
                })
            .then(() => res.json('Well updated'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));

});

wellTestingRouter.route('/getOne').post((req, res) => {
    WellTesting.findOne({wellBarcode: req.body.wellBarcode})
        .then(well => {
            res.json(well);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = wellTestingRouter;