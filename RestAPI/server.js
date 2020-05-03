const dotenv = require('dotenv');
dotenv.config({path:'.env'})
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const subscriberRouter = require('./routes/subscriber');

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true });
const db = mongoose.connection;
db.on('error',(error) => console.log(error))
db.once('open',() => console.log('Connected to database'))

app.use(express.json());
app.use('/subscribers',subscriberRouter);

app.listen(3000, () =>{
    console.log("server started")
})