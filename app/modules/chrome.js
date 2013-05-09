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
        hasPlayed: false,

        serialize: function() {
            return _.extend(
                {
                    userId: app.userId,
                    profileImage: app.profileImage
                },
                this.model.project.toJSON()
            );
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
            "click .ZEEGA-tab": "showCoffin",
            "click .ZEEGA-mute": "toggleMute"
        },

        toggleMute: function(){
            
            if( this.$(".ZEEGA-mute").hasClass("muted") ){
                this.$(".ZEEGA-mute").removeClass("muted");
                $("audio")[0].volume = 1;
            } else {
                this.$(".ZEEGA-mute").addClass("muted");
                $("audio")[0].volume = 0;
            }
            return false;
        },

        // time = false
        show: function( time ) {
            if ( app.hasPlayed && this.active ) {
                this.$(".ZEEGA-tab, .ZEEGA-chrome-metablock").show();
                if( app.hasSoundtrack ){
                    this.$(".ZEEGA-mute").show();
                }
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
            if ( this.hasPlayed ) {
                this.show();
            }
            this.hasPlayed = true;
        },

        onPause: function() {
            clearInterval( this.timer );
        },

        hide: function( force ) {
            if ( this.model.state != "paused" || force === true ) {
                this.$(".ZEEGA-tab, .ZEEGA-chrome-metablock, .ZEEGA-mute").fadeOut();

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
