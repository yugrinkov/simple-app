 'use strict;'

 var FullAddrTmpl = require('templates/fullAddrTmpl.mustache');

 module.exports = Backbone.View.extend({
     template: FullAddrTmpl,
     tagName: 'div',
     className: 'address-component',
     initialize: function(options) {
         this.address = options.address;
     },

     render: function() {
         this.$el.html(this.template(this.address));
         return this;
     }
 })
