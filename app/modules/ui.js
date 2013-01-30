/*

  ui.js

  the ui layer or skin that sits over player and controls/reacts to it
*/

define([
    "app",

    // Libs
    "backbone",

    // Modules,
    "modules/loader"
],

function( app, Backbone, Loader ) {

    // Create a new module
    var UI = {};

    var FADE_OUT_DELAY = 3000;

    // This will fetch the tutorial template and render it.
    UI.Layout = Backbone.Layout.extend({
        
        el: "#main",

        initialize: function() {
            this.loader = new Loader.View({ model: app.player });

            this.insertView("#overlays", this.loader );
            this.render();
        },

        afterRender: function() {
            app.state.set("baseRendered", true );
        }

    });

    // Required, return the module for AMD compliance
    return UI;
});