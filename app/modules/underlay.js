define([
    "app",
    "backbone"
],

function( app, Backbone ) {

    return Backbone.View.extend({

        className: "ZEEGA-underlay",
        template: "underlay",

        serialize: function() {
            return this.model.project.toJSON();
        },

        initialize: function() {

        },

        events: {
            "click .mobile-play": "play"
        },

        play: function() {
            this.remove();
            this.model.play();
        }

  });

});
