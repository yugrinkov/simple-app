'use strict;'

var RowView = require('views/RowView');
var TableTmpl = require('templates/tableTmpl.mustache');

module.exports = Backbone.View.extend({
    template: TableTmpl,
    initialize: function(options) {
        this.users = options.users;
    },
    render: function() {
        this.$el.html(this.template);
        this.users.each(function(user) {
            var userView = new RowView({
                model: user
            });
            this.$el.find('tbody').append(userView.render().el);
        }, this);
        return this;
    }
});
