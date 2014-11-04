jQuery.fn.Domains = function(options){

    this.getDomains = function() {
        data = jQuery.getJSON("/data/domains.json", function(json) {
            console.log(json); // this will show the info it in firebug console
        });
    }

    this.removeCookie = function(cookie) {

    };
}