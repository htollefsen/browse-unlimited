var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-53369842-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

var debug = false;
var divId = 'browse-unlimited-loader'; // div id to style
var confirmationMessage = 'Happy Surfing!'; // onComplete message
var context = this;

var domains=[
    "aftenposten.no",
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
    "mediaweek.co.uk",
    "smh.com",
    "smh.com.au"
];

$(document).ready(function(){
    context.resetElements();
    context.run();
    context.finished();
});

function addElement(id, parentId) {
    $( "#" + parentId ).append( "<div id=" + id + "></div>" );
}

function resetElements() {
    addElement('progress_wrapper', divId);
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
    _gaq.push(['_trackEvent', 'Clearing', 'Cookie', url]);
    say('Removing ' + url + '.');
}

function finished() {
    $('#' + divId).width( 105 );
    $('#' + divId).html(confirmationMessage);
}

function say(msg) {
    debug && console.log(msg);
}