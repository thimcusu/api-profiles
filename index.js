require('dotenv').config();

const express = require('express');
// const cors = require('cors');
var app = express();
const port = process.env.PORT;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// app.use(cors());

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
let apiRoutes = require("./api-routes/test")


// Use Api routes in the App
app.use('/api', apiRoutes)

//database
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_LOCALHOST,{ useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('connection successful');
});

app.get('/', (req, res) => res.send('Hello World!'));
