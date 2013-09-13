define([
    "app",
    // Libs
    "backbone"
],

function(app, Backbone) {

    return Backbone.View.extend({

        template: "app/templates/remix-flash",
        className: "ZEEGA-remix-flash",

        initialize: function() {
            this.model.on("project:project_switch", this.onProjectSwitch, this );
        },

        serialize: function() {
            console.log("SER:", this.model.zeega.getRemixData(), this.model.zeega.getCurrentProject().toJSON() )
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
            this.$(".banner").show("fast");
            _.delay(function() {
                this.hide();
            }.bind(this), 3000 );
        },

        hide: function(){
            this.$(".banner").hide("fast");
        }

    });
});


