/*

  ui.js

  the ui layer or skin that sits over player and controls/reacts to it
*/

define([
    "app",
    "backbone",

    "modules/loader",
    "modules/pause",
    "modules/underlay",
    "modules/chrome",
    "modules/endpage",
    "vendor/hammer/hammer"
],

function( app, Backbone, Loader, Pause, Underlay, Chrome, EndPage ) {

    return Backbone.Layout.extend({
        
        preCoffin: null,
        coffin: false,
        pauseView: null,
        glowTimer: null,

        GLOW: 3000,
        el: "#main",

        initialize: function() {
            this.loader = new Loader({ model: this.model });
            this.chrome = new Chrome({ model: this.model });
            this.endpage = new EndPage({ model: this.model });
            this.underlay = new Underlay({ model: this.model });

            this.insertView("#overlays", this.loader );
            this.insertView("#chrome", this.chrome );
            this.insertView("#endpage", this.endpage );
            this.insertView("#underlay", this.underlay );
            this.render();

            this.listenForOrientationChange();

            this.detectUserAgent();
        },

        detectUserAgent: function() {
            var userAgent = navigator.userAgent;

            // var is_safari_or_uiwebview = /(iPhone|iPod|iPad).*AppleWebKit/i.test(navigator.userAgent),
            //     is_uiwebview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
            //     is_chrome = /CriOS/i.test(navigator.userAgent);

            if ( /CriOS/i.test( userAgent ) ) {
                $("#main").addClass("iphone-chrome");
            } else if ( !/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test( userAgent ) ) {
                $("#main").addClass("iphone-safari");
                window.scrollTo(0, 1);
            }
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
            app.state.set("baseRendered", true );
            this.startTouchEvents();
            window.scrollTo(0, 1);

            $('#main').bind("touchmove", {}, function(event){
                event.preventDefault();
            });

        },

        events: {
            "click #player": "onTap"
        },

        onTap: function() {
            this.chrome.toggle();
            this.glowLinks();
        },

        glowLinks: function() {
            if ( this.model.state != "paused" ) {
                clearInterval( this.glowTimer );
                $(".visual-element-link[data-glowonhover=true]").addClass("mobile-glow");
                this.timer = setTimeout(function() {
                    $(".visual-element-link").removeClass("mobile-glow");
                }, this.GLOW );
            }
        },

        startTouchEvents: function() {
            this.hammer = new Hammer( this.el, {
                prevent_default: false
            });
            this.hammer.onswipe = function( e ) {
                this.onSwipe( e );
            }.bind( this );
        },

        onSwipe: function( e ) {
            if ( this.model.state == "playing" ) {
                if ( e.direction == "left") {
                    this.model.cueNext();
                } else if ( e.direction == "right") {
                    this.model.cueBack();
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
                    if ( this.preCoffin == "playing" || !app.hasSoundtrack ) {
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