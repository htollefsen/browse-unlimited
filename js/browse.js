var divId = 'browse-unlimited-loader', // div id to style
    confirmationMessage = 'Happy Surfing!'; // onComplete message´

function run(){
    // Get sites from json
    $.getJSON('/data/sites.json', function(settings) {
        // Loop every domain
        $.map(settings.domains, function(domain) {
            // Loop every cookie for that domain
            chrome.cookies.getAll({domain: domain}, function(cookies) {
                for (var i in cookies) {
                    removeCookie(cookies[i]);
                }
            });
        });
    });

    // Check if user has autorefresh option enabled
    chrome.storage.sync.get({
        autorefresh: false
    }, function(items) {
        if(items.autorefresh) {
            // Refresh tab
            chrome.tabs.getSelected(null, function(tab) {
                var code = 'window.location.reload();';
                chrome.tabs.executeScript(tab.id, {code: code});
            });
        }
    });

    // Show confirmation message
    $('#'+divId)
        .width(105)
        .html(confirmationMessage);

    _gaq.push(['_trackEvent', 'Clearing', 'Cookie', url]);
}

function removeCookie(cookie) {
    var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;
    chrome.cookies.remove({"url": url, "name": cookie.name});
}

/**
 * Google Analytics init
 */
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-53369842-1']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

/**
 * Start when dom has loaded
 */
$(document).ready(function(){
    run();
});
