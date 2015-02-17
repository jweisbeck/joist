// FPO example of defining a module with an object that depends on another module and a library! (jquery)
define([
    "modules/widget",
    "jquery"
], function(Widget, $){
 
    var myWidget = new Widget("twitter");
  

    var Twitter = function(user, widgetName){
        this.user = user;
        this.name = widgetName;

        this.addToRegistry(this);
    };

    Twitter.prototype = myWidget;

    Twitter.prototype.showUser = function(){
        $('<h1/>', {
            text: "User is " + this.user 
        }).prependTo('body');
    };


    return Twitter;
   
});
