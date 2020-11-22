const poolMappingRouter = require('express').Router();

let PoolMap = require('../models/poolMap.model');


poolMappingRouter.route('/').get((req, res) => {
    PoolMap.find({})
        .then(pools => {
            res.json(pools);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


poolMappingRouter.route('/').post((req, res) => {
    const testBarcode = req.body.testBarcode;
    const poolBarcode = req.body.poolBarcode;

    const newPoolMap = new PoolMap({
        testBarcode: testBarcode,
        poolBarcode: poolBarcode
    });
  
    newPoolMap.save()
    .then(() => res.json('New Pool Added!'))
    .catch(err => res.status(400).json('Error: ' + err));

});

poolMappingRouter.route('/edit').put((req, res) => {
    PoolMap.findOneAndUpdate({poolBarcode: req.body.poolBarcode}, {testBarcode: req.body.testBarcode})
    .then(() => res.json("Pool Updated"))
    .catch(err => res.status(400).json('Error: ' + err));
});

poolMappingRouter.route('/getOne').get((req, res) => {
    PoolMap.findOne({poolBarcode: req.body.poolBarcode})
        .then(pool => {
            res.json(pool);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


poolMappingRouter.route('/').delete((req, res) => {
    
    PoolMap.deleteMany({"poolBarcode": {$in: req.body}})
    .then(() => res.json("Pools deleted"))
    .catch(err => res.status(400).json('Error: ' + err));

});


module.exports = poolMappingRouter;