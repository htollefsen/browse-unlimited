jQuery.fn.Tracking = function(options){
    if( this.data( 'Tracking' ) ) {
        return this.data( 'Tracking' );
    }
    var context = this;

    this.trackEvent = function(eventname) {

    };

    this.init = function(gaId) {
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-53369842-1']);
        _gaq.push(['_trackPageview']);

        (function() {
          var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
          ga.src = 'https://ssl.google-analytics.com/ga.js';
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    };

    this.data( 'Tracking', this );
    return this;
};