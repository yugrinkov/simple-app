'use strict;'

var RowTmpl = require('templates/rowTmpl.mustache');

module.exports = Backbone.View.extend({
    template: RowTmpl,
    tagName: 'tr',
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
})
