define([
    "app",
    // Libs
    "backbone"
],

function(app, Backbone) {

    return Backbone.View.extend({

        visible: false,
        timer: null,
        seen: [],

        template: "app/templates/remix-flash",
        className: "ZEEGA-remix-flash",

        initialize: function() {
            this.model.on("project:project_switch", this.onProjectSwitch, this );
            // this.model.on("all", function(e, o){console.log("E",e, o)} );
        },

        serialize: function() {
            console.log("SER:", this.model.zeega.getRemixData(), this.model.zeega.getCurrentProject() )
            return _.extend({
                currentProject: this.model.zeega.getCurrentProject().toJSON(),
                remixData: this.model.zeega.getRemixData()
            });
        },

        onProjectSwitch: function() {
            this.render();
            this.show();
        },

        show: function(){

            // if ( _.contains( this.seen, this.model.zeega.getCurrentProject().id ) ) {
            //     this.$(".banner").addClass("seen");
            // } else {
            //     this.$(".banner").removeClass("seen");
            // }

            this.clearTimer();
            this.model.off("page:focus");

            this.model.once("page:focus", this.waitForNext, this );

            this.timer = setTimeout(function() { this.hide(); }.bind(this), 3000 );
            this.visible = true;
            this.$(".banner").addClass("show");
            this.seen.push( this.model.zeega.getCurrentProject().id );
        },

        waitForNext: function( mod, e, o ) {
            this.model.once("page:focus", this.hide, this );
        },

        clearTimer: function() {
            if ( this.timer ) clearTimeout( this.timer );
            this.timer = null;
        },

        hide: function(){
            this.visible = false;
            this.clearTimer();
            this.$(".banner").removeClass("show");
        }

    });
});


