/*

  ui.js

  the ui layer or skin that sits over player and controls/reacts to it
*/

define([
    "app",
    "backbone",

    "modules/loader",
    "modules/pause"
],

function( app, Backbone, Loader, Pause ) {

    // Create a new module
    var UI = {};

    var FADE_OUT_DELAY = 3000;

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
        },

        events: {
            "click #player": "pause"
        },

        pause: function() {
            app.player.playPause();

            if ( this.pauseView === null ) {
                this.pauseView = new Pause({ model: app.player });
            }
            this.$("#overlays").html( this.pauseView.el );
            this.pauseView.render();
        }

    });

    // Required, return the module for AMD compliance
    return UI;
});