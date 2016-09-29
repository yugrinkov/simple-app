'use strict;'
var Helper = require('js/helper');


var AddressView = require('views/AddressView');
var DetailTmpl = require('templates/detailTmpl.mustache');
var MessageTmpl = require('templates/messageTmpl.mustache');

module.exports = Backbone.View.extend({
    id: "detail",
    template: DetailTmpl,
    msgTmpl: MessageTmpl,
    events: {
        'change #emailInput': 'onEmailInputChange',
        'change #websiteInput': 'onSiteInputChange',
        'click #saveBtn': 'onSaveBtnClick',
        'click #back': 'onBackBtnClick'
    },

    initialize: function(options) {
        this.user = options.user;
        this.listenTo(this.user, "invalid", function(model, error, options) {
            var errors = options.validationError;
            this.handleErrors(errors);
        }, this);

    },
    render: function() {
        var templateData = _.extend({}, this.user.toJSON(), {
            title: 'Detail Page'
        });
        this.$el.html(this.template(templateData));

        this.$('#fullAddressContainer').append(new AddressView({
            address: this.user.get('address')
        }).render().$el);
        this.activateMap();
        return this;
    },

    activateMap: function() {
        var myLatLng = {
            lat: +this.user.get('address').geo.lat,
            lng: +this.user.get('address').geo.lng
        };

        var mapOptions = {
            center: myLatLng,
            scrollwheel: false,
            zoom: 8
        };
        var domElement = this.$('#map');

        var intervalId = setInterval(function() {
            if (google) {
                var map = new google.maps.Map(domElement.get(0), mapOptions);
                clearInterval(intervalId);
                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                });
            }
        }, 200);

    },

    onEmailInputChange: function(e) {
        var value = $(e.target).val();
        this.user.set({
            email: value
        })
    },

    onSiteInputChange: function(e) {
        var value = $(e.target).val();
        this.user.set({
            website: value
        })
    },

    onBackBtnClick: function(e) {
        window.history.back();
    },

    onSaveBtnClick: function(e) {
        e.preventDefault();
        this.user.save(null, {
            success: _.bind(function(model, response) {
                this.$('#message').html(this.msgTmpl({
                    type: 'success',
                    message: 'Your data has been successfully saved!'
                }));
                this.removeErrorHighlights();
            }, this),
            error: _.bind(function() {
                console.log('Something wrong');
            }, this)
        });

    },

    handleErrors: function(errors) {
        this.addErrorHighlights(errors);
        this.showErrorMessage(errors);
    },

    removeErrorHighlights: function() {
        this.$('[data-validation]').removeClass('has-error');
    },

    addErrorHighlights: function(errors) {
        var errors = errors || {};

        this.removeErrorHighlights();
        _.each(errors, function(error) {
            this.$('[data-validation="' + error.meta + '"]').addClass('has-error');
        }, this);
    },

    showErrorMessage: function(errors) {
        var errors = errors || {};

        this.$('#message').html(this.msgTmpl({
            type: 'danger',
            message: Helper.getErrorMessage(errors)
        }))
    }
});
