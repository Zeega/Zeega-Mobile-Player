define([
    "app",
    "backbone",
    "iscroll"
],

function( app, Backbone ) {

    return Backbone.View.extend({

        id: "ZEEGA-underlay",
        className: "ZEEGA-underlay",
        template: "underlay",
        myScroll: null,

        serialize: function() {

            return _.extend({
                path: "http:" + app.metadata.hostname + app.metadata.directory
                },
                app.metadata,
                this.model.project.toJSON(),
                {
                    layers: this.model.getProjectData().layers
                }
            );
        },

        show: function() {
            if ( this.myScroll === null ) {
                setTimeout(function () {
                    this.myScroll = new iScroll('scroller');
                }.bind( this ), 0);
            }
        },

        events: {
            "click .mobile-play": "play"
        },

        play: function() {
            this.remove();
            this.model.play();
            //need to build into player, mobile audio does not support volume/mute
            if( $(".ZEEGA-mute").hasClass("muted") && $("audio")[0] ){
                $("audio")[0].pause();
            }
        }

  });

});
