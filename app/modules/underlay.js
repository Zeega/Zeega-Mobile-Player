define([
    "app",
    "backbone",
    "iscroll"
],

function( app, Backbone ) {

    return Backbone.View.extend({

        id: "ZEEGA-underlay",
        className: "ZEEGA-underlay",
        template: "app/templates/underlay",
        myScroll: null,

        serialize: function() {
            return _.extend({
                path: "http:" + app.metadata.hostname + app.metadata.directory
                },
                app.metadata,
                this.model.project.toJSON(),
                {
                    layers: this.model.getProjectData().layers.reverse(),
                    share_links: this.getShareLinks(),
                    related_project: $.parseJSON( window.relatedProjectsJSON ).projects[0]
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
        },

        show: function() {
            if ( this.myScroll === null ) {
                setTimeout(function () {
                    this.myScroll = new iScroll('scroller');
                }.bind( this ), 0);
            }

            this.updateCitations();
        },

        // update the citations each time the coffin is opened.
        updateCitations: function() {
            var frameData = this.model.getFrameData().layers,
                soundtrackData = this.model.getSoundtrack();

            if ( frameData ) {
                this.$(".underlay-citation").remove();

                if ( soundtrackData ) frameData.push( soundtrackData.toJSON() );

                _.each( frameData, function( layer ) {
                    var link, citation;

                    if( _.contains(["Image", "Audio"], layer.type )) {

                        link = $("<a>")
                            .attr("href", layer.attr.attribution_uri )
                            .attr("target", "blank")
                            .append("<i class='icon-" + layer.type.toLowerCase() + "'></i> " + (layer.attr.title === "" ? "[untitled]" : layer.attr.title ));

                        citation = $("<li>")
                            .addClass("underlay-citation")
                            .append( link );

                        this.$(".credits-header").after( citation );
                    }
                });
            }
        },

        events: {
            "click .mobile-play": "play"
        },

        play: function() {
            this.remove();
            this.model.play();
            //need to build into player, mobile audio does not support volume/mute
            if( $(".ZEEGA-mute").hasClass("muted") && $("audio")[0] ){
                $("audio")[0].pause();
            }
        }

  });

});
