define([
    // Libraries.
    "jquery",
    "lodash",
    "backbone",

    "modules/state",
    "engineVendor/spin",

    // Plugins.
    "plugins/backbone.layoutmanager"
],

function( $, _, Backbone, State, Spinner ) {

    var meta = $("meta[name=zeega]");

    // var state = new State();

    var app = {
        // The root path to run the application.
        root: "/",
        mobile: true,
        hasPlayed: false,
        // the path of the zeega api
        // only required for dynamically loaded zeegas
        api: localStorage.getItem("api") || "http://dev.zeega.org/joseph/web/api/projects/",

        metadata: $("meta[name=zeega]").data(),

        spinner: new Spinner({
            lines: 13, // The number of lines to draw
            length: 7, // The length of each line
            width: 4, // The line thickness
            radius: 20, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            color: '#fff', // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 100, // The z-index (defaults to 2000000000)
            top: 'auto', // Top position relative to parent in px
            left: 'auto' // Left position relative to parent in px
        }),
        emit: function( event, args ) {
            // other things can be done here as well
            this.trigger( event, args );
        },

      /*
        app.state stores information on the current state of the application
      */
        // state: state,

        Backbone: Backbone,
        $: $
    };

    var opts = {
        lines: 13, // The number of lines to draw
        length: 10, // The length of each line
        width: 4, // The line thickness
        radius: 30, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#FFF', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: 'auto', // Top position relative to parent in px
        left: 'auto' // Left position relative to parent in px
    };
    app.spinner = new Spinner(opts);

    app.state = new State({ app: app });

    // Localize or create a new JavaScript Template object.
    var JST = window.JST = window.JST || {};

    Backbone.Layout.configure({
        // Allow LayoutManager to augment Backbone.View.prototype.
        manage: true,

        fetch: function( path ) {
            // Initialize done for use in async-mode
            var done;

            // Concatenate the file extension.
            path = path + ".html";

            // If cached, use the compiled template.
            if (JST[path]) {
                return JST[path];
            } else {
                // Put fetch into `async-mode`.
                done = this.async();

                // Seek out the template asynchronously.
                return $.ajax({ url: app.root + path }).then(function(contents) {
                    done(JST[path] = _.template(contents));
                });
            }
        }
    });
    
    // Mix Backbone.Events, modules, and layout management into the app object.
    return _.extend(app, {
        // Create a custom object with a nested Views object.
        module: function( additionalProps ) {
            return _.extend({ Views: {} }, additionalProps);
        },

        // Helper for using layouts.
        useLayout: function( name, options ) {
            // If already using this Layout, then don't re-inject into the DOM.
            if (this.layout && this.layout.options.template === name) {
                return this.layout;
            }

            // If a layout already exists, remove it from the DOM.
            if (this.layout) {
                this.layout.remove();
            }

            // Create a new Layout with options.
            var layout = new Backbone.Layout(_.extend({
                template: name,
                className: "layout " + name,
                id: "layout"
            }, options));

            // Insert into the DOM.
            $("#main").empty().append(layout.el);

            // Render the layout.
            layout.render();

            // Cache the refererence.
            this.layout = layout;

            // Return the reference, for chainability.
            return layout;
        }
    }, Backbone.Events);

});
