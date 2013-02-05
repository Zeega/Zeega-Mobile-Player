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
            // this.initPlayer();
            this.getData();
        },

        getData: function () {
            Zeega.parse({
                data: $.parseJSON( window.projectJSON ) || null,
                url: window.projectJSON ? null :
                    app.state.get("projectID") !== null ? app.api + "/items/" + app.state.get("projectID") :
                    "testproject.json",
                    callback: function( parsed, data ) {
                        this.onDataLoaded( parsed );
                    }.bind( this )
            });
        },

        initPlayer: function( parsed ) {
            app.player = new Zeega.player({
                // debugEvents: true,
                cover: true,
                target: '#player',
                data: parsed,
                startFrame: app.state.get("frameID")
            });
            app.player.once('canplay', function() {
                parsed.trigger("canplay");
            }, this);
            app.player.on('frame_rendered', this.onFrameRender, this);
            app.player.on('sequence_enter', this.updateWindowTitle, this);
        },

        onDataLoaded: function( parsed ) {
            parsed.on("project_play", this.initPlayer, this );
            app.layout = new UI.Layout({ model: parsed });
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