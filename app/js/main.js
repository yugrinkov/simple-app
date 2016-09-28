require('bower/bootstrap/dist/css/bootstrap.min.css');
require('bower/bootstrap/dist/js/bootstrap.min.js');
require('css/simplePagination.css');
require('css/main.css');

var MainRouter = require('routers/MainRouter');

$(document).ready(function() {
    console.log('Application inited!!! Mode -', ENV);

    this.router = new MainRouter();
    Backbone.history.start();

    var $loading = $('#loading');

    $(document)
        .ajaxStart(function() {
            $loading.show();
        })
        .ajaxStop(function() {
            $loading.hide();
        });
});
