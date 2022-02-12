const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./database/connection.js');

dotenv.config({ path: '.env' });
const port = process.env.PORT;

const app = express();

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
    methods: "GET, PUT, DELETE, POST,HEAD,PATCH",
    /*   preflightContinue: false */
}

app.use(cors(corsOptions));

app.use('/', cors(corsOptions), require('./routes/router'));
app.use('/', cors(corsOptions), require('./routes/auth'));


app.use(express.static('public'));

app.listen(port, () => {
    console.log(`listening on :${port}`);
});
