require.config({
    paths: {
       // insert paths here!                 
        "vendor": "vendor/",
        "libs": "libs/",
        "jquery": "vendor/jquery/jquery"
    },

    shim: {
        "jquery": {
            exports: "Jquery"
        }
    }
});
