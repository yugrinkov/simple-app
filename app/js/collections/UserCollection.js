'use strict;'

var UserModel = require('models/UserModel');
var config = require('js/config');

module.exports = Backbone.Collection.extend({
    model: UserModel,
    getUsers: function(pageNumber) {
        this.url = config.API_URL + '?_page=' + pageNumber;
        return this.fetch();
    }
});
