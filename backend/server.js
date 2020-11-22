const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const employeeHomeRouter = require('./routes/employeeHome');
const employeeLoginRouter = require('./routes/employeeLogin');
const loginOneRouter = require('./routes/loginPageOne')
const testCollectionRouter = require('./routes/testCollection');
const employeeRouter = require('./routes/employee')

app.use('/employeeHome', employeeHomeRouter);
app.use('/employeeLogin', employeeLoginRouter);
app.use('/loginOne', loginOneRouter);
app.use('/testCollection', testCollectionRouter);
app.use('/employeeRegister', employeeRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});