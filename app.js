var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHsb = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);
var config = require('config.json')('./config.json');

var app = express();

//hbs helpers
var Handlebars = require('handlebars');

//equals helper
Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

//import dei file delle routes
var indexRouter = require('./routes/index');
var userRoutes = require('./routes/user');
var cartRoutes = require('./routes/cart');
var adminRoutes = require('./routes/admin');
var champRoutes = require('./routes/champion');


//connect to database
mongoose.connect(config.cloud.db_url).then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

require('./config/passport');

// view engine setup
app.engine('.hbs', expressHsb({
    defaultLayout: 'layout',
    extname: '.hbs'
}));

app.set('view engine', '.hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(validator());
app.use(cookieParser());
app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    //per salvare la session in uno storage
    store: new MongoStore({
        //fa si che non si riapra una nuova connessione ma si usi la stessa
        mongooseConnection: mongoose.connection,
    }),
    cookie: {
        maxAge: 180 * 60 * 1000 // 3 ore
    }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    //verifica se è un utente normale e salva la variabile loggedAsUser.
    function isUser() {
        if (req.user && req.user.isAdmin === false) {
            return true;
        } else return false;
    }
    res.locals.loggedAsUser = isUser();
    //verifica se è un admin e salva la variabile loggedAsAdmin.
    function isAdmin() {
        if (req.user && req.user.isAdmin === true) {
            return true;
        } else return false;
    }
    res.locals.loggedAsAdmin = isAdmin();

    res.locals.session = req.session;

    //req.user di passport salvato nella variabile user
    res.locals.user = req.user;

    next();
});

app.use('/', indexRouter);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/champions', champRoutes);
app.use('/cart', cartRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;