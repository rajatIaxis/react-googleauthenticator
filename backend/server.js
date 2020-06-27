const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex:true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB Connection Successful");
});

const generate = require('./routes/generate');
const validate = require('./routes/validate');

app.use('/generate', generate);
app.use('/validate', validate);

const port = 3537

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});

