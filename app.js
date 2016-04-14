var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var http = require('http');

var config = require('./backend/config');
var log = require('./backend/lib/log')(module);
var HttpError = require('./backend/error').HttpError;
var routes = require('./backend/routes/index');

var app = express();

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'backend/templates'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

if (app.get('env') === 'development') {
    app.use(logger('dev'));
} else {
    app.use(logger('default'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./backend/middleware/sendHttpError'));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(new HttpError(404, 'Content not found') );
});

// error handler
app.use(function(err, req, res, next) {
    if (typeof err == 'number') { // example: next(404);
        err = new HttpError(err);
    }

    if (err instanceof HttpError) {
        res.sendHttpError(err);
    } else {
        log.error(err);
        err = new HttpError(500);
        res.sendHttpError(err);
    }
});

http.createServer(app).listen(config.get('port'), function(){
    log.info('Express server listening on port ' + config.get('port'));
});

module.exports = app;
