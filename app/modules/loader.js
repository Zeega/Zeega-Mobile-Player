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

        instruction: 0,
        instructionCount: 0,
        instructionDuration: 4000,
        jumps: 0,

        initialize: function() {
            this.model.on("frame_ready", this.onCanPlay, this );
            console.log("INIT", app, this.model );
        },

        serialize: function() {
            return _.extend({
                path: "http:" + app.metadata.hostname + app.metadata.directory
                },
                app.metadata,
                this.model.project.toJSON()
            );
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
            this.instructionCount = this.$(".ZEEGA-notices ul.rotating li").length;
            this.cycleFacts();
            this.swipeJump();
        },

        cycleFacts: function() {
            this.interval = setInterval(function() {
                this.instruction++;
                this.$(".ZEEGA-notices .active").removeClass("active");
                $(this.$(".ZEEGA-notices ul.rotating li")[ this.instruction % this.instructionCount ]).addClass("active");
            }.bind( this ), this.instructionDuration );
        },

        swipeJump: function() {
            this.jump = setInterval(function() {
                if ( this.jumps < 4 ) {
                    this.jumps ++;
                    this.$(".swipe-left").addClass("jump");
                    _.delay(function() {
                        this.$(".swipe-left").removeClass("jump");
                    }, 1000 );
                } else {
                    clearInterval( this.jump );
                }
            }.bind( this ), 5000);
        },

        events: {
            "click .mobile-play": "play",
            "click .ZEEGA-tab": "toggleCoffin"
        },

        toggleCoffin: function() {
            app.layout.toggleCoffin();
        },

        play: function() {
            this.model.mobileLoadAudioLayers();
            this.$(".mobile-play, .loader-footer").fadeOut();
            this.spinner = new Spinner({
                lines: 13, // The number of lines to draw
                length: 7, // The length of each line
                width: 4, // The line thickness
                radius: 20, // The radius of the inner circle
                corners: 1, // Corner roundness (0..1)
                rotate: 0, // The rotation offset
                color: '#fff', // #rgb or #rrggbb
                speed: 1, // Rounds per second
                trail: 60, // Afterglow percentage
                shadow: false, // Whether to render a shadow
                hwaccel: false, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                zIndex: 100, // The z-index (defaults to 2000000000)
                top: 'auto', // Top position relative to parent in px
                left: 'auto' // Left position relative to parent in px
            }).spin( this.el );

            if ( this.model.canplay ) {
                this.fadeOut();
            } else {
                this.model.once("frame_play", this.fadeOut, this );
            }
            this.model.play();
        },

        fadeOut: function() {
            app.hasPlayed = true;
            this.spinner.spin(false);
            this.$el.fadeOut(function(){
                this.remove();
            }.bind( this ));
        }

  });

});
