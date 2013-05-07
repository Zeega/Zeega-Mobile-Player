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

        active: true,
        visible: false,
        timer: null,

        serialize: function() {
            return _.extend({ hasAudio: app.hasSoundtrack }, this.model.project.toJSON() );
        },

        initialize: function() {
            this.model.on("frame_play", this.onCanplay, this );
        },

        onCanplay: _.once(function() {
            this.model.on("play", this.onPlay, this );
            this.model.on("pause", this.onPause, this );

            this.model.on("endpage_enter", this.onEndpageEnter, this );
            this.model.on("endpage_exit", this.onEndpageExit, this );
        }),

        onEndpageEnter: function() {
            this.hide();
            this.active = false;
        },

        onEndpageExit: function() {
            this.active = true;
            // this.hide();
        },

        toggle: function() {
            if ( this.visible ) {
                this.hide();
            } else {
                this.show();
            }
        },

        events: {
            "click .playpause-wrapper": "playPause",
            "click .ZEEGA-tab": "showCoffin"
        },

        // time = false
        show: function( time ) {
            if ( app.hasPlayed && this.active ) {
                this.$(".chrome-top, .chrome-bottom").show();
                clearInterval( this.timer );

                if ( time !== false ) {
                    this.timer = setTimeout(function() {
                        this.hide();
                    }.bind( this ), this.FADE_TIMER );
                }

                this.visible = true;
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

                this.visible = false;
            }
        },

        playPause: function() {
            this.model.playPause();
        },

        showCoffin: function() {
            this.hide( true );
            app.layout.showCoffin();
        }

  });

});
