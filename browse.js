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
    "thestar.com"
];

$( document ).ready(function() {
    run();
    finished();
});

function run(){
    for (var i = domains.length - 1; i >= 0; i--) {
        chrome.cookies.getAll({domain: domains[i]}, function(cookies) {
            for (var i in cookies) {
                removeCookie(cookies[i]);
            }
        });
    };
}

function removeCookie(cookie) {
    var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;
    chrome.cookies.remove({"url": url, "name": cookie.name});
}

function finished() {
    document.getElementById('browse-unlimited-loader').innerHTML = "Cleared!";
}