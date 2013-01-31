define([
    "app",
    // Libs
    "backbone",
    "libs/spin"
],

function( app, Backbone, Spinner ) {

    return Backbone.View.extend({

        className: "ZEEGA-loader-overlay",
        template: "loader",

        initialize: function() {
            this.model.on("frame_ready", this.onCanPlay, this );
        },

        serialize: function() {
            if ( this.model.project ) {
                return this.model.project.toJSON();
            }
        },

        events: {
            "click .mobile-play": "play"
        },

        afterRender: function() {
            var coverImage = this.model.project.get("cover_image");

            if( !_.isNull( coverImage ) && coverImage != "../../../images/default_cover.png" ) {
                this.$(".ZEEGA-loader-bg").css({
                    "background": "url('" + coverImage +"')",
                    "background-position": "50% 50%",
                    "background-repeat": "no-repeat no-repeat",
                    "background-attachment": "fixed",
                    "-webkit-background-size": "cover",
                    "-moz-background-size": "cover",
                    "-o-background-size": "cover",
                    "background-size": "cover"
                });
            }

            this.spinner = new Spinner({
                lines: 12, // The number of lines to draw
                length: 20, // The length of each line
                width: 5, // The line thickness
                radius: 25, // The radius of the inner circle
                corners: 1, // Corner roundness (0..1)
                color: '#fff', // #rgb or #rrggbb
                speed: 1, // Rounds per second
                trail: 60, // Afterglow percentage
                shadow: true, // Whether to render a shadow
                hwaccel: false, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                zIndex: 2e9 // The z-index (defaults to 2000000000)
            }).spin( this.el );
        },

        onCanPlay: function() {
            this.spinner.spin(false);
            this.$(".mobile-play").fadeIn();
        },

        play: function() {
            this.$el.fadeOut(function(){
                this.remove();
            }.bind( this ));
            this.model.play();
        }

  });

});
