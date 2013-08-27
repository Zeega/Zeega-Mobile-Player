define([
    "app"
],

function( app ) {

    return Backbone.View.extend({

        FADE_TIMER: 5000,

        className: "ZEEGA-chrome",
        template: "app/templates/chrome",

        active: true,
        visible: false,
        timer: null,
        hasPlayed: false,

        serialize: function() {
            return _.extend(
                {
                    path: "http:" + app.metadata.hostname + app.metadata.directory
                },
                app.metadata,
                app.player.zeega.getCurrentProject().toJSON()
            );
        },

        initialize: function() {
            this.model.on("page:play", this.onCanplay, this );
            app.once("swipe_to_play", this.showLoadingSoundtrack, this );
        },

        onCanplay: _.once(function() {
            // this.showLoadingSoundtrack();

            this.model.on("play", this.onPlay, this );
            this.model.on("pause", this.onPause, this );

            this.model.on("endpage_enter", this.onEndpageEnter, this );
            this.model.on("endpage_exit", this.onEndpageExit, this );
        }),

        showLoadingSoundtrack: function() {
            var soundtrack = app.player.zeega.getSoundtrack();

            if ( soundtrack && soundtrack.state != "ready" ) {
                var timer, counter = 0;

                this.$(".ZEEGA-sound-state").show().addClass("loading-0");

                timer = setInterval(function() {
                    this.$(".ZEEGA-sound-state")
                        .show()
                        .removeClass("loading-0 loading-1 loading-2")
                        .addClass("loading-" + (counter % 3) );
                    counter++;
                }.bind( this ), 150 );

                this.model.on("soundtrack:ready", function( model ) {
                    clearInterval( timer );
                    this.$(".ZEEGA-sound-state")
                        .removeClass("loading-0 loading-1 loading-2")
                        .fadeOut();
                }.bind( this ));
            }
        },

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
            "click .ZEEGA-sound-state": "toggleMute"
        },

        toggleMute: function(){
            if( app.player.zeega.getSoundtrack() ){
                if( this.$(".ZEEGA-sound-state").hasClass("muted") ){
                    this.$(".ZEEGA-sound-state").removeClass("muted");
                    app.player.zeega.getSoundtrack().visual.onPlay();
                } else {
                    this.$(".ZEEGA-sound-state").addClass("muted");
                    app.player.zeega.getSoundtrack().visual.onPause();
                }
            }
            return false;
        },

        // time = false
        show: function( time ) {
            if ( app.hasPlayed && this.active ) {
                this.$(".ZEEGA-tab, .ZEEGA-chrome-metablock").show();
                if( app.hasSoundtrack ){
                    this.$(".ZEEGA-sound-state").show();
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
                this.$(".ZEEGA-tab, .ZEEGA-chrome-metablock, .ZEEGA-sound-state").fadeOut();

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
