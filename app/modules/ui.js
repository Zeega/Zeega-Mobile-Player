/*

  ui.js

  the ui layer or skin that sits over player and controls/reacts to it
*/

define([
    "app",

    "modules/loader",
    "modules/pause",
    "modules/underlay",
    "modules/chrome",
    "modules/endpage",
    "modules/remix-endpage",
    "modules/remix-flash",

    "vendor/hammer/hammer"
],

function( app, Loader, Pause, Underlay, Chrome, EndPage, RemixEndpage, RemixFlash ) {

    return Backbone.Layout.extend({
        
        firstFrameTimer: null,
        FIRST_FRAME_TIMEOUT: 4000,
        preCoffin: null,
        coffin: false,
        pauseView: null,
        el: "#main",
        navigate: true,

        initialize: function() {
            this.loader = new Loader({ model: this.model });
            this.chrome = new Chrome({ model: this.model });
            this.endpage = new EndPage({ model: this.model });
            this.underlay = new Underlay({ model: this.model });
            this.remixEndpage = new RemixEndpage({ model: this.model });
            this.remixFlash = new RemixFlash({ model: this.model });

            this.insertView("#overlays", this.loader );
            this.insertView("#chrome", this.chrome );
            this.insertView("#endpage", this.endpage );
            this.insertView("#endpage", this.remixEndpage );
            this.insertView("#endpage", this.remixFlash );
            this.insertView("#underlay", this.underlay );
            this.render();

            this.listenForOrientationChange();

            this.detectUserAgent();
        },

        detectUserAgent: function() {
            var wrapperClass, platform = app.getPlatformInfo();

            if ( platform.platformName == "iPhone" && parseInt( platform.browserVersion.split(".")[0], 10) >= 7 ) {
                wrapperClass = "iphone-safari-ios7"
            } else {
                wrapperClass = platform.platformName.toLowerCase() +"-"+ platform.browserName.toLowerCase();
            }

            $("#main").addClass( wrapperClass + ( platform.embed ? "-embed" : ""));
            window.scrollTo(0, 1);
        },

        listenForOrientationChange: function() {
            jQuery(window).bind('orientationchange', function(e) {

                window.scrollTo(0, 1);

                // switch ( window.orientation ) {

                //     case 0:
                //         alert('portrait mode');
                //         break;

                //     case 90:
                //         alert('landscape mode screen turned to the left');
                //         break;

                //     case -90:
                //         alert('landscape mode screen turned to the right');
                //         break;

                //     }

                });
        },

        afterRender: function() {
            this.startTouchEvents();

            $('#main').bind("touchmove", {}, function(event){
                event.preventDefault();
            });

            this.model.once("player:play", this.onPlay, this );
            window.scrollTo(0, 1);
        },

        onPlay: function() {

            this.firstFrameTimer = setTimeout(function() {
                $("body").append("<img class='swipe-reminder' src='assets/img/swipe-left.png'/>");
                $(".swipe-reminder").animate({
                        left: "50%"
                    }, 750, function() {
                        $(".swipe-reminder").animate({
                            left: "100%"
                        }, 1000, function() {
                            $(".swipe-reminder").remove();
                        });
                    });
            }, this.FIRST_FRAME_TIMEOUT );
            this.model.once("page:play", function(){
                clearTimeout( this.firstFrameTimer );
            }, this)
        },

        startTouchEvents: function() {
            this.hammer = new Hammer( this.el, {
                prevent_default: false
            });
            this.hammer.onswipe = function( e ) {
                this.onSwipe( e );
            }.bind( this );
            this.hammer.ontap = function( e ) {
                this.onTap( e );
            }.bind( this );
        },

        onSwipe: function( e ) {
            if ( this.navigate ) this.onProjectNavigation( e );
            app.emit("swipe", e );
        },

        onProjectNavigation: function( e ) {
            if ( this.model.state == "playing" ) {
                if ( e.direction == "left") {
                    this.model.cueNext();
                } else if ( e.direction == "right") {
                    this.model.cuePrev();
                }
            } else if ( this.model.state == "paused" && this.coffin && e.direction == "left" ) {
                this.hideCoffin();
            } else if ( this.model.state == "paused" && !this.coffin && e.direction == "right" ) {
                this.showCoffin();
            } else if ( !app.hasPlayed && !this.coffin && e.direction == "left" ) {
                this.loader.play();
            } else if ( app.hasPlayed && !this.coffin && e.direction == "left" ) {
                this.pauseView.play();
            }
        },

        onTap: function() {
            this.chrome.toggle();
        },

        toggleCoffin: function() {
            if ( this.coffin ) {
                this.hideCoffin();
            } else {
                this.showCoffin();
            }
        },

        showCoffin: function() {
            this.preCoffin = this.model.state;
            this.model.pause();

            this.coffin = true;
            this.underlay.show();
            $("#overlays, #player").animate({
                left: "83%"
            });
            $("#underlay").fadeIn();
            this.chrome.hide( true );
        },

        hideCoffin: function() {
            this.coffin = false;
            $("#overlays, #player").animate({
                    left: 0
                },{
                    complete: function() {
                        this.chrome.show();
                        if ( this.preCoffin == "playing" ) {
                            this.model.play();
                            //need to build into player, mobile audio does not support volume/mute
                            if( $(".ZEEGA-mute").hasClass("muted") && $("audio")[0] ){
                                $("audio")[0].pause();
                            }
                        } 
                    }.bind( this )
                });
            $("#underlay").fadeOut();
        }

    });

});