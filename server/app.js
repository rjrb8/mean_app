require('./config/config');
require('./models/db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
//const rtsIndex = require('./routes/index.router');

var app = express();
app.use(morgan('dev'));
// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(cors({origin: 'http://localhost:4200'}));
app.use(passport.initialize());
//app.use('/api', rtsIndex);
//Routes
app.use('/api/employes/', require('./routes/employes.routes'));
app.use('/api/usuarios/', require('./routes/index.router'));
// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});

// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));