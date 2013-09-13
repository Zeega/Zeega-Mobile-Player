define([
    "app",
    // Libs
    "backbone",
    "vendor/hammer/hammer"
],

function(app, Backbone) {

    return Backbone.View.extend({

        timer: null,

        template: "app/templates/remix-flash",
        className: "ZEEGA-remix-flash",

        initialize: function() {
            this.model.on("project:project_switch", this.onProjectSwitch, this );
        },

        serialize: function() {
            return _.extend({
                rootProject: this.model.zeega.projects.at(0).toJSON(),
                currentProject: this.model.zeega.getCurrentProject().toJSON(),
                remixData: this.model.zeega.getRemixData()
            });
        },

        onProjectSwitch: function() {
            this.render();
            this.show();
        },

        show: function(){
            this.clearTimer();
            this.model.off("page:focus");
            this.model.once("page:focus", this.waitForNext, this );
            app.once("swipe", this.waitForSwipe, this );

            this.timer = setTimeout(function() { this.hide(); }.bind(this), 3000 );
            this.$(".banner").addClass("show");
            app.layout.navigate = false;
        },

        waitForNext: function( mod, e, o ) {
            this.model.once("page:focus", this.hide, this );
        },
        waitForSwipe: function( e ) {
            app.once("swipe", this.hide, this );
        },

        clearTimer: function() {
            if ( this.timer ) clearTimeout( this.timer );
            this.timer = null;
        },

        hide: function() {
            app.layout.navigate = true;
            this.clearTimer();
            this.$(".banner").removeClass("show");
        }

    });
});


