'use strict;'

var MainController = require('controllers/MainController');
var UserCollection = require('collections/UserCollection');

module.exports = Backbone.Router.extend({

    routes: {
        "(/)": "main",
        "page/:number": "page",
        "user/:id": "detail"
    },

    initialize: function() {
        this.controller = MainController;
        this.users = new UserCollection();
    },

    main: function() {
        this.controller.initMainView({
            number: 1,
            users: this.users
        });
    },

    page: function(number) {
        this.controller.initMainView({
            number: number,
            users: this.users
        });

    },

    detail: function(id) {
        this.controller.initDetailView({
            id: id
        })
    }

});
