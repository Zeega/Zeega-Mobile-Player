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
            this.relatedProject = $.parseJSON( window.relatedProjectsJSON ).projects[0];
            
        },

        events: {
            "click .ZEEGA-tab": "toggleCoffin",
            "click .favorite": "toggleFavorite"
        },

        toggleCoffin: function() {
            app.layout.toggleCoffin();
        },

        toggleFavorite: function(){
            var url;
            this.$(".favorite").toggleClass("favorited");

            if(this.model.project.get("favorite")){
                url = "http://" + app.metadata.hostname + app.metadata.directory + "api/projects/" + this.model.project.id + "/unfavorite";
                this.model.project.set({ "favorite": false });
            } else {
                url = "http://" + app.metadata.hostname + app.metadata.directory + "api/projects/" + this.model.project.id + "/favorite";
                this.model.project.set({ "favorite": true });
            }
            $.ajax({ url: url, type: 'POST', success: function(){  }  });

            return false;

        },

        endPageEnter: function() {
            this.$el.show();
            this.$(".upper-wrapper").css("height", this.$(".ZEEGA-loader-inner").height() + 20 );
        },

        endPageExit: function() {
            this.$el.hide();
        },

        serialize: function() {

            return _.extend({
                    path: "http:" + app.metadata.hostname + app.metadata.directory
                },
                app.metadata,
                this.model.project.toJSON(),
                {
                    tumblr_share: this.getTumblrShareUrl(),
                    project: this.relatedProject
                }
            );
        },

        getTumblrShareUrl: function() {
            var html = "<p>" + app.player.project.get("description") + "</p>" +
                "<p><a href='http:" + app.metadata.hostname + app.metadata.directory + app.player.project.get("item_id") + "'>" +
                "<strong>►&nbsp;Play&nbsp;Zeega&nbsp;►</strong></a>" +
                "</p><p>by&nbsp;<a href='" + app.metadata.hostname + "profile/" + app.player.project.get("user_id") + "'>" + app.player.project.get("authors") + "</a></p>";

            return "source=" + encodeURIComponent( app.player.project.get("cover_image") ) +
                    "&caption=" + encodeURIComponent( html ) +
                    "&click_thru="+ encodeURIComponent( app.metadata.hostname ) + app.player.project.get("item_id");
        }

  });

});
