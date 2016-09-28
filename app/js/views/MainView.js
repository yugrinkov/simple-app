'use strict;'

require('libs/jquery.simplePagination');
var TableView = require('views/TableView');
var MainTmpl = require('templates/mainTmpl.mustache');
var config = require('js/config');

module.exports = Backbone.View.extend({
    template: MainTmpl,
    className: 'main-view',
    initialize: function(options) {
        this.number = options.number || 1;
        this.users = options.users;
    },
    render: function() {
        this.$el.html(this.template({
            title: 'Users'
        }));
        this.renderContent();
        return this;
    },

    renderContent: function() {
        this.$('#table').html(new TableView({
            users: this.users
        }).render().el);
        this.initPagination();
    },

    initPagination: function(options) {
        var options = options || {};

        this.$('#pagination').pagination({
            items: config.USERS_COUNT,
            itemsOnPage: 10,
            hrefTextPrefix: '#page/',
            cssStyle: 'light-theme',
            currentPage: this.number
        });
    }
});
