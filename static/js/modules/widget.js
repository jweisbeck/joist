define([
     "modules/app"
],function(app){
    
    app.registry = [];

    var Widget = function(type){
        this.type = type;
    };

    Widget.prototype = {

        constructor: Widget,
        
        addToRegistry: function(widget){
           app.registry.push(widget); 
           console.log("\nA widget was added to the registry!");
           console.log(app.registry);
        },

        reportName: function(){
            console.log("\nReport the name of your widget ...");
            console.log(this.name);
        }

    };

    return Widget;
});
