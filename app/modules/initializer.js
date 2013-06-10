/*

the controller model should remove any non-route code from router.js
*/

define([
    "app",
    // Libs
    "backbone",

    "modules/ui",
     // Plugins
    "player/modules/player"
],

function(app, Backbone, UI, Player) {

    return Backbone.Model.extend({

        initialize: function() {
            $("#main").empty()
                .append("<div id='overlays'></div>")
                .append("<div id='player'></div>")
                // .append("<div id='chrome'></div>")
                .append("<div id='underlay'></div>");

            $("#player")
                .append("<div id='endpage'></div>")
                .append("<div id='chrome'></div>");

            this.initPlayer();
        },

        initPlayer: function() {
            app.player = new Player.player({
                // debugEvents: true,
                endPage: true,
                mobile: true,
                controls: false,
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
        },

        onDataLoaded: function( parsed ) {
            app.hasSoundtrack = !_.isUndefined( app.player.getProjectData().sequences[0].attr.soundtrack );
            app.layout = new UI({ model: app.player });
        }

  });
});