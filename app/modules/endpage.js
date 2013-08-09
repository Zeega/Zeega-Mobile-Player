define([
    "app",
    // Libs
    "backbone"
],

function( app, Backbone ) {

    return Backbone.View.extend({

        viewed: false,
        className: "ZEEGA-endpage",
        template: "app/templates/endpage",

        initialize: function() {
            this.model.on("endpage_enter", this.endPageEnter, this );
            this.model.on("endpage_exit", this.endPageExit, this );
            this.relatedProject = $.parseJSON( window.relatedProjectsJSON ).projects[0];
        },

        events: {
            "click .ZEEGA-tab": "toggleCoffin",
            "click .favorite": "toggleFavorite",
            "click .share-network a": "onShare"
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
                app.emit("unfavorite");
            } else {
                url = "http://" + app.metadata.hostname + app.metadata.directory + "api/projects/" + this.model.project.id + "/favorite";
                this.model.project.set({ "favorite": true });
                app.emit("favorite");
            }
            $.ajax({ url: url, type: 'POST', success: function(){  }  });

            return false;

        },

        endPageEnter: function() {
            if ( !app.player.zeega.getNextPage() ) {
                this.$el.show();
                this.$(".upper-wrapper").css("height", this.$(".ZEEGA-loader-inner").height() + 20 );
                if( !this.viewed ){
                    this.viewed = true;
                    app.emit("viewed_to_end");
                }
            }
        },

        onShare: function( event ){
            app.emit( "share", {
                "type": event.currentTarget.name
            });
        },

        endPageExit: function() {
            this.$el.hide();
        },

        serialize: function() {

            return _.extend({
                    path: "http:" + app.metadata.hostname + app.metadata.directory
                },
                app.metadata,
                app.player.zeega.getCurrentProject().toJSON(),
                {
                    share_links: this.getShareLinks(),
                    related_project: this.relatedProject
                }
            );
        },

        getShareLinks: function() {
            var html,
                links = {},
                webRoot = "http:" + app.metadata.hostname + app.metadata.directory,
                currentProject = app.player.zeega.getCurrentProject();
                

            if( !_.isUndefined( currentProject.get("title"))){
                title = currentProject.get("title");
            } else {
                title = "";
            }
            

            html = "<p>" + title + "</p>" +
                "<p><a href='" + webRoot + currentProject.get("id") + "'>" +
                "<strong>►&nbsp;Play&nbsp;Zeega&nbsp;►</strong></a>" +
                "</p><p>by&nbsp;<a href='" + webRoot + "profile/" + currentProject.get("user_id") + "'>" + currentProject.get("authors") + "</a></p>";

            links.tumblr = "http://www.tumblr.com/share/photo?source=" + encodeURIComponent( currentProject.get("cover_image") ) +
                "&caption=" + encodeURIComponent( html ) +
                "&click_thru="+ encodeURIComponent( webRoot ) + currentProject.get("id");

            links.reddit = "http://www.reddit.com/submit?url=" + encodeURIComponent( webRoot ) + currentProject.get("id") +
                "&title=" + encodeURIComponent( title );

            links.twitter = "https://twitter.com/intent/tweet?original_referer=" + encodeURIComponent( webRoot ) + currentProject.get("id") +
                "&text=" + encodeURIComponent( title  + " made w/ @zeega") +
                "&url=" + encodeURIComponent( webRoot ) + currentProject.get("id");

            links.facebook = "http://www.facebook.com/sharer.php?u=" + encodeURIComponent( webRoot ) + currentProject.get("id");

            return links;
        }

  });

});
