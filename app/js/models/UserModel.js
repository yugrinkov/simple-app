'use strict;'

var config = require('js/config');

module.exports = Backbone.Model.extend({
    defaults: function() {
        return {
            name: '',
            email: '',
            address: {},
            company: {},
            phone: '',
            username: '',
            website: ''
        }
    },

    validate: function(attrs, options) {
        var errors = [];

        if (!this.validateEmail(attrs.email)) {
            errors.push({
                text: "Please provide valid email",
                meta: 'email'
            });
        }

        if (!this.validateURL(attrs.website)) {
            errors.push({
                text: "Please provide valid web site",
                meta: 'website'
            });
        }

        return !_.isEmpty(errors) ? errors : null
    },

    getUser: function(id) {
        this.url = config.API_URL + '/' + id;
        return this.fetch();
    },

    validateEmail: function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },

    validateURL: function(url) {
        /* experemental regexp for domain name check*/
        var re = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
        return re.test(url);
    }
});
