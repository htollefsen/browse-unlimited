$.prototype.Tracking = new function() {
    var _gaq = _gaq || [];

    this.trackEvent = function(action, opt_label, opt_value) {
        _gaq.push(['_trackEvent', action, opt_label, opt_value]);
    }

    this.Init = function() {
        _gaq.push(['_setAccount', 'UA-53369842-1']);
        _gaq.push(['_trackPageview']);

        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = 'https://ssl.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    }
}