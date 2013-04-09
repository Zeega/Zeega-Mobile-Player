define([
    "app",
    // Libs
    "backbone",
    "libs/spin"
],

function( app, Backbone, Spinner ) {

    return Backbone.View.extend({

        
        FADE_TIMER: 5000,

        className: "ZEEGA-chrome",
        template: "chrome",

        timer: null,

        serialize: function() {
            return this.model.project.toJSON();
        },

        initialize: function() {
            this.model.on("canplay", this.onCanplay, this );
        },

        onCanplay: function() {
            this.model.on("play", this.onPlay, this );
            this.model.on("pause", this.onPause, this );
        },

        events: {
            "click .playpause-wrapper": "playPause",
            "click .ZEEGA-tab": "showCoffin"
        },

        show: function() {
            if ( app.hasPlayed ) {
                this.$(".chrome-top, .chrome-bottom").show();
                clearInterval( this.timer );
                this.timer = setTimeout(function() {
                    this.hide();
                }.bind( this ), this.FADE_TIMER );
            }
        },

        onPlay: function() {
            this.show();
            this.$(".ZEEGA-playpause").addClass("pause-zcon").removeClass("play-zcon");
        },

        onPause: function() {
            clearInterval( this.timer );
            this.$(".ZEEGA-playpause").removeClass("pause-zcon").addClass("play-zcon");
        },

        hide: function( force ) {
            if ( this.model.state != "paused" || force === true ) {
                this.$(".chrome-top, .chrome-bottom").fadeOut();
            }
        },

        playPause: function() {
            this.model.playPause();
        },

        showCoffin: function() {
            this.hide( true );
            this.model.pause();
            app.layout.showCoffin();
        }

  });

});
