define([
    "app",
    // Libs
    "backbone"
],

function( app, Backbone ) {

    // Create a new module
    var Loader = {};

    // This will fetch the tutorial template and render it.
    Loader.View = Backbone.View.extend({

        DELAY: 2000,
        /* variables keeping track of generic layer states */
        layerCount : 0,
        layersReady : 0,

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

        afterRender: function() {
            console.log( this )
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
            console.log('can play')

            // _.delay(function(){
            //     this.$el.fadeOut(function(){
            //         this.remove();
            //     }.bind( this ));
            //     this.model.play();
            // }.bind( this ), this.DELAY );
        }

  });

  // Required, return the module for AMD compliance
  return Loader;

});
