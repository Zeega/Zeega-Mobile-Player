/*

the controller model should remove any non-route code from router.js
*/

define([
    "app",
    // Libs
    "backbone",

    "modules/ui",
     // Plugins
    'zeegaplayer'
],

function(app, Backbone, UI) {

    return Backbone.Model.extend({

        initialize: function() {
            this.initPlayer();
            // this.getData();
        },

        initPlayer: function() {
            app.player = new Zeega.player({
                // debugEvents: true,
                autoplay: false,
                cover: true,
                target: '#player',
                startFrame: app.state.get("frameID"),
                keyboard: false,
                data: $.parseJSON( window.projectJSON ) || null,
                url: window.projectJSON ? null :
                    app.state.get("projectID") !== null ? app.api + "/items/" + app.state.get("projectID") :
                    "testproject.json"
            });
            if ( window.projectJSON ) {
                this.onDataLoaded();
            } else {
                app.player.once('data_loaded', function() {
                    this.onDataLoaded();
                }, this);
            }
            app.player.on('frame_rendered', this.onFrameRender, this);
            app.player.on('sequence_enter', this.updateWindowTitle, this);
        },

        onDataLoaded: function( parsed ) {
            app.layout = new UI.Layout({ model: app.player });
        },

        onFrameRender: function( info ) {
            app.router.navigate( 'f/'+ info.id );
        },

        updateWindowTitle: function( info ) {
            var title = app.player.project.get("title") + " by " + app.player.project.get("authors");

            $('title').text( title );
        }

  });
});