define([
    "app",
    // Libs
    "backbone"
],

function( app, Backbone ) {

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
        },

        onCanPlay: function() {
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
