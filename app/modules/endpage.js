define([
    "app",
    // Libs
    "backbone"
],

function( app, Backbone ) {

    return Backbone.View.extend({

        className: "ZEEGA-endpage",
        template: "endpage",

        initialize: function() {
            this.model.on("endpage_enter", this.endPageEnter, this );
            this.model.on("endpage_exit", this.endPageExit, this );
        },

        events: {
            "click .ZEEGA-tab": "toggleCoffin"
        },

        toggleCoffin: function() {
            app.layout.toggleCoffin();
        },

        endPageEnter: function() {
            this.$el.show();
            this.$(".upper-wrapper").css("height", this.$(".ZEEGA-loader-inner").height() + 20 );
        },

        endPageExit: function() {
            this.$el.hide();
        },

        serialize: function() {

            return _.extend({},
                app.metadata,
                this.model.project.toJSON(),
                {
                    tumblr_share: this.getTumblrShareUrl()
                }
            );
        },

        getTumblrShareUrl: function() {
            var html = "<p>" + app.player.project.get("description") + "</p>" + 
                "<p><a href='http://zeega.com/" + app.player.project.get("item_id") + "'>" +
                "<strong>►&nbsp;Play&nbsp;Zeega&nbsp;►</strong></a>" +
                "</p><p>by&nbsp;<a href='" + app.metadata.hostname + "profile/" + app.player.project.get("user_id") + "'>" + app.player.project.get("authors") + "</a></p>";

            return "source=" + encodeURIComponent( app.player.project.get("cover_image") ) +
                    "&caption=" + encodeURIComponent( html ) +
                    "&click_thru="+ encodeURIComponent( app.metadata.hostname ) + app.player.project.get("item_id");
        }

  });

});
