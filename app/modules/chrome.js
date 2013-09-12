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
        spinAnimationTimer: null,
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

            this.model.on("soundtrack:loading", this.showLoadingSoundtrack, this );

            this.model.on("project:project_switch", this.show, this );

        }),

        showLoadingSoundtrack: function( soundtrack ) {
            var soundtrack = soundtrack || app.player.zeega.getSoundtrack();

            if ( soundtrack && soundtrack.state != "ready" ) {
                this.spinSoundtrack();
                this.model.once("soundtrack:ready", this.stopSpinSoundtrack, this );
            }
        },

        spinSoundtrack: function() {
            var counter = 0;

            this.$(".ZEEGA-sound-state").show().addClass("loading-0");

            this.spinAnimationTimer = setInterval(function() {
                this.$(".ZEEGA-sound-state")
                    .show()
                    .removeClass("loading-0 loading-1 loading-2")
                    .addClass("loading-" + (counter % 3) );
                counter++;
            }.bind( this ), 150 );
        },

        stopSpinSoundtrack: function() {
            clearInterval( this.spinAnimationTimer );
            this.spinAnimationTimer = null;
            this.$(".ZEEGA-sound-state")
                .removeClass("loading-0 loading-1 loading-2")
                .fadeOut();
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
