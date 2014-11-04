

var debug = false;
var divId = 'browse-unlimited-loader'; // div id to style
var confirmationMessage = 'Happy Surfing!'; // onComplete message
var context = this;



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