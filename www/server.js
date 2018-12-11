/**
 * Created by skitsanos on 8/10/17.
 */
const manifest = require('./package');
const path = require('path');
global.appRoot = path.resolve(__dirname);

const logger = require('./app/utils/logger');
global.log = logger;

const express = require('express');
const bodyParser = require('body-parser');
global.app = express();

process.title = manifest.name;
global.app.locals.title = process.title;

global.config = {
    db: {
        name: 'loggerdaisy'
    }
};

/**
 * Support for Handlerbars Templating
 */
const exphbs = require('express-handlebars');
global.hbs = exphbs.create({
    extname: '.html',
    partialsDir: [
        'ui/content/'
    ]
});

const helpers = require('handlebars-helpers')({
    //handlebars: global.hbs
});

/*
 * Setting templates engine Handlebars and pre-load fragments of content
 */

global.app.engine('html', hbs.engine);
global.app.set('views', __dirname + '/ui/');
global.app.set('view engine', 'html');

/**
 * Enable support for body parsing
 */
global.app.use(bodyParser.urlencoded({
    extended: true
}));
global.app.use(bodyParser.json());

/**
 * Sessions support
 */
const session = require('express-session');
global.app.use(session({secret: 'application-secret', resave: false, saveUninitialized: true}));

const flash = require('connect-flash');
global.app.use(flash());

const cookieParser = require('cookie-parser');
global.app.use(cookieParser());

global.app.use((err, req, res, next) =>
{
    global.log.error('err');
    next(err);
});

/*
global.app.use(function (req, res, next)
{
    //console.log((req.session.user !== undefined ? req.session.user.username : 'anonymous') + ' - ' + req.path);

    if (req.path === '/login'
        || req.path === '/'
        || req.path.startsWith('/ui'))
    {
        next();
    }
    else
    {
        // if (!req.session || !req.session.authenticated)
        //{
        //  res.redirect('/login');
        //}
        //else
        //{
        next();
        // }
    }
});

*/

/**
 * Support for static resources
 */
global.app.use('/ui', express.static('ui/assets'));

global.log.info(`Starting ${manifest.name}...`);

const async = require('async');
async.parallel({
    schemas: function (callback)
    {
        let loader = require('./app/utils/schemas-loader');
        loader.load(function ()
        {
            callback(null, global.schemas);
        });
    },
    handlers: function (callback)
    {
        let loader = require('./app/utils/handlers-loader');
        loader.load(global.app).then(r =>
        {
            global.log.info('Handlers loaded');
        }).catch(err =>
        {
            global.log.error(errr.message);
        });
    }
}, function (err, res)
{
    if (err)
    {
        global.log.error(err.message);
    }
    else
    {
        global.app.listen(process.env.PORT || process.env.VMC_APP_PORT || 3000, function ()
        {
            global.log.info(`${manifest.name} (${manifest.description}) is running`);
        });
    }
});

const esStorage = require(__dirname + '/app/db/filesystem/storage');
const s = new esStorage({
    err_output: 'console',
    url: 'htpp://'
});

/*
s.put('hello').then(res =>
{
    console.log(res);
}).catch(err=>{
    console.log(err);
});*/

s.search('there').then(results =>
{
    for (let result in results)
    {
        let res = results[result];
        console.log(
            'found "' + res.matches[0] + '" ' + res.count
            + ' times in "' + result + '"'
        );
    }
}).catch(err =>
{
    console.log(err);
});
