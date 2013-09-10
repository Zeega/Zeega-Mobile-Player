/*

the controller model should remove any non-route code from router.js
*/

define([
    "app",
    // Libs
    "backbone",

    "modules/ui",
     // Plugins
    "player/modules/player",
    "analytics/analytics"
],

function(app, Backbone, UI, Player, Analytics) {

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
            app.player = new Player({
                // debugEvents: true,
                // endPage: true,
                loop: true,
                mobile: true,
                controls: false,
                autoplay: false,
                cover: true,
                target: '#player',
                keyboard: false,
                data: $.parseJSON( window.projectJSON ) || null,
                url: window.projectJSON ? null : "testproject.json"
            });

            if ( window.projectJSON ) {
                this.onDataLoaded();
            } else {
                app.player.once('player:ready', function() {
                    this.onDataLoaded();
                }, this);
            }
        },

        onDataLoaded: function() {
            this.initAnalytics();
            app.hasSoundtrack = !_.isUndefined( app.player.getProjectData().sequences[0].attr.soundtrack );
            app.layout = new UI({ model: app.player });
        },

        initAnalytics: function() {
            app.analytics = new Analytics();

            app.analytics.setGlobals({
                projectId: app.player.zeega.getCurrentProject().id,
                projectPageCount: app.player.zeega.getCurrentProject().pages.length,
                userId: app.metadata.userId,
                userName: app.metadata.userName,
                app: "player",
                context: "mobile"
            });

            app.analytics.trackEvent("zeega_view");
        }

  });
});