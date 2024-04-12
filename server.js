const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: "http://localhost:1708"
};


app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// routers
const companyRouter = require('./routes/companyRouter.js');
const machineRouter = require('./routes/machineRouter.js');
const workInfoRouter = require('./routes/workInfoRouter.js');


app.use('/api/company', companyRouter);
app.use('/api/machine', machineRouter);
app.use('/api/work', workInfoRouter);

 


app.get('/',(req,res)=>{
    res.send("home");
})
  
app.listen('1708',(req,res)=>{
    console.log("Server started on localhost:1708");
})