const employeeRouter = require('express').Router();
let Employee = require('../models/employee.model');

// employeeRouter.route('/').get((req, res) => {
//   Employee.find()
//     .then(employees => res.json(employees))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

employeeRouter.route('/').post((req, res) => {
    const employeeID = req.body.employeeID;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    const testsTaken = []
  
    const newEmployee = new Employee({
      employeeID,
      email,
      firstName,
      lastName,
      password,
      testsTaken
    });
  
    newEmployee.save()
    .then(() => res.json('Employee added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
  
// router.route('/:id').get((req, res) => {
//     Exercise.findById(req.params.id)
//       .then(exercise => res.json(exercise))
//       .catch(err => res.status(400).json('Error: ' + err));
// });
  
// router.route('/:id').delete((req, res) => {
//     Exercise.findByIdAndDelete(req.params.id)
//       .then(() => res.json('Exercise deleted.'))
//       .catch(err => res.status(400).json('Error: ' + err));
// });
  
// router.route('/update/:id').post((req, res) => {
//     Exercise.findById(req.params.id)
//       .then(exercise => {
//         exercise.username = req.body.username;
//         exercise.description = req.body.description;
//         exercise.duration = Number(req.body.duration);
//         exercise.date = Date.parse(req.body.date);
  
//         exercise.save()
//           .then(() => res.json('Exercise updated!'))
//           .catch(err => res.status(400).json('Error: ' + err));
//       })
//       .catch(err => res.status(400).json('Error: ' + err));
// });
  

module.exports = employeeRouter;