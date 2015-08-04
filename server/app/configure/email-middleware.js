'use strict';
var swig = require('swig'),
    path = require('path');
module.exports = function(app){

    // setup view engine
    swig.setDefaults({ cache: false});
    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, '..','..', '/email/views'));
}
