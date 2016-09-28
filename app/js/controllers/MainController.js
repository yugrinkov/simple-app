'use strict;'

var UserModel = require('models/UserModel');
var MainView = require('views/MainView');
var DetailView = require('views/DetailView');

module.exports = (function() {
    return {
        initMainView: function(options) {
            var users = options.users;
            users.getUsers(options.number)
                .done(function(response) {
                    $('#app').html(new MainView({
                        number: options.number,
                        users: users
                    }).render().el);
                });
        },
        initDetailView: function(options) {
            var self = this;
            var userId = options.id;
            this.user = new UserModel();
            this.user.getUser(userId)
                .done(function() {
                    $('#app').html(new DetailView({
                        user: self.user
                    }).render().el);
                })
        }
    }
}())
