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
            this.$el.show();
            this.$(".upper-wrapper").css("height", this.$(".ZEEGA-loader-inner").height() + 20 );
            if( !this.viewed ){
                this.viewed = true;
                app.emit("viewed_to_end");
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
                this.model.project.toJSON(),
                {
                    share_links: this.getShareLinks(),
                    related_project: this.relatedProject
                }
            );
        },

        getShareLinks: function() {
            var html,
                links = {},
                webRoot = "http:" + app.metadata.hostname + app.metadata.directory;
                

            if( !_.isUndefined(this.model.project.get("title"))){
                title = this.model.project.get("title");
            } else {
                title = "";
            }
            

            html = "<p>" + title + "</p>" +
                "<p><a href='" + webRoot + this.model.project.get("id") + "'>" +
                "<strong>►&nbsp;Play&nbsp;Zeega&nbsp;►</strong></a>" +
                "</p><p>by&nbsp;<a href='" + webRoot + "profile/" + this.model.project.get("user_id") + "'>" + this.model.project.get("authors") + "</a></p>";

            links.tumblr = "http://www.tumblr.com/share/photo?source=" + encodeURIComponent( this.model.project.get("cover_image") ) +
                "&caption=" + encodeURIComponent( html ) +
                "&click_thru="+ encodeURIComponent( webRoot ) + this.model.project.get("id");

            links.reddit = "http://www.reddit.com/submit?url=" + encodeURIComponent( webRoot ) + this.model.project.get("id") +
                "&title=" + encodeURIComponent( title );

            links.twitter = "https://twitter.com/intent/tweet?original_referer=" + encodeURIComponent( webRoot ) + this.model.project.get("id") +
                "&text=" + encodeURIComponent( title  + " made w/ @zeega") +
                "&url=" + encodeURIComponent( webRoot ) + this.model.project.get("id");

            links.facebook = "http://www.facebook.com/sharer.php?u=" + encodeURIComponent( webRoot ) + this.model.project.get("id");

            return links;
        }

  });

});
