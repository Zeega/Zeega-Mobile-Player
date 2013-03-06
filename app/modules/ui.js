/*

  ui.js

  the ui layer or skin that sits over player and controls/reacts to it
*/

define([
    "app",
    "backbone",

    "modules/loader",
    "modules/pause",
    "vendor/hammer/hammer"
],

function( app, Backbone, Loader, Pause ) {

    // Create a new module
    var UI = {};

    // This will fetch the tutorial template and render it.
    UI.Layout = Backbone.Layout.extend({
        
        pauseView: null,
        el: "#main",

        initialize: function() {
            this.loader = new Loader({ model: this.model });

            this.insertView("#overlays", this.loader );
            this.render();
        },

        afterRender: function() {
            app.state.set("baseRendered", true );
            this.startTouchEvents();
        },

        events: {
            "click #player": "pause"
        },

        pause: function() {
            app.player.playPause();

            if ( this.pauseView === null ) {
                this.pauseView = new Pause({ model: this.model });
            }
            this.$("#overlays").html( this.pauseView.el );
            this.pauseView.render();
        },

        startTouchEvents: function() {
            this.hammer = new Hammer( this.el );
            this.hammer.onswipe = function( e ) {
                this.onSwipe( e );
            }.bind( this );
        },

        onSwipe: function( e ) {
            if ( this.model.state == "playing" && this.model.status.get("current_frame_model").get("attr").advance === 0 ) {
                if ( e.direction == "left") {
                    this.model.cueNext();
                } else if ( e.direction == "right") {
                    this.model.cuePrev();
                }
            }
        }

    });

    // Required, return the module for AMD compliance
    return UI;
});