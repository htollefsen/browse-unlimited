var Tracking = new function(_gaq){
    var _gaq = _gaq || [];

    this.trackEvent = function(action, opt_label, opt_value) {
        _gaq.push(['_trackEvent', action, opt_label, opt_value]);
    }

    this.init = function() {
        _gaq.push(['_setAccount', 'UA-53369842-1']);
        _gaq.push(['_trackPageview']);
    }

    return this;
}