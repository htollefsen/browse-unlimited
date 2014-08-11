var debug=true;
var maxprogress = 100;   // total to reach
var actualprogress = 0;  // current value
var itv = 0;  // id to setinterval
var mainId = 'browse-unlimited-loader';

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
    resetElements();
    run();
    finished();
    gaInit();
});

function addElement(id, parentId) {
    $( "#" + parentId ).append( "<div id=" + id + "></div>" );
}

function resetElements() {
    addElement('progress_wrapper', mainId);
    addElement('progressbar', 'progress_wrapper');
    addElement('indicator', 'progressbar');
}

function run(){
    for (var i = domains.length - 1; i >= 0; i--) {
        chrome.cookies.getAll({domain: domains[i]}, function(cookies) {
            for (var j in cookies) {
                removeCookie(cookies[j]);
            }
        });
        $("#indicator").animate({ width: (i / domains.length * 100) + "%" });
    };
}

function removeCookie(cookie) {
    var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;
    chrome.cookies.remove({"url": url, "name": cookie.name});
    say('Removing ' + url + '.');
}

function finished() {
    $('#' + mainId).html("OK!");
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