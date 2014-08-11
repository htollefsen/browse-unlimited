var debug=false;
var domains=[
    "aftenposten.no",
    "nytimes.com",
    "washingtonpost.com",
    "moneyweek.com",
    "dallasnews.com",
    "newsday.com",
    "ft.com",
    "thetimes.co.uk",
    "thesundaytimes.co.uk",
    "theonion.com",
    "courier-journal.com",
    "fvn.no",
    "theglobeandmail.com",
    "journalbroadcastgroup.com",
    "weeklyworldnews.com",
    "thestar.com",
    "arktimes.com",
    "usatoday.com",
    "thesun.co.uk",
    "mediaweek.co.uk"
];

$(document).ready(function(){
    run();
    finished();
    gaInit();
});

function run(){
    for (var i = domains.length - 1; i >= 0; i--) {
        chrome.cookies.getAll({domain: domains[i]}, function(cookies) {
            for (var j in cookies) {
                removeCookie(cookies[j]);
            }
        });
    };
}

function removeCookie(cookie) {
    var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;
    chrome.cookies.remove({"url": url, "name": cookie.name});
    say('Removing ' + url + '.');
}

function finished() {
    $('#browse-unlimited-loader').html("Ok!");
}

function gaInit() {
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-53369842-1']);
    _gaq.push(['_trackPageview']);

    (function() {
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = 'https://ssl.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
    })();

    say('Tracking pageview');
}

function say(msg) {
    debug && console.log(msg);
}
