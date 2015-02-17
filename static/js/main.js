// FPO example instantiating a module we created earlier
// Notice we require 'config' - that's the config.js file where we provide paths to libraries
require(["config"], function() {
    require(["modules/twitter"], function(Twitter){

        var myTwitterWidget = new Twitter("@fat", "Fat's Twitter feed!");
        
        myTwitterWidget.reportName();

        //myTwitterWidget.showUser();

        var myOtherTwitterWidget = new Twitter("@mdo", "MDO's Twitter feed!");
        myOtherTwitterWidget.reportName();

    });
});
