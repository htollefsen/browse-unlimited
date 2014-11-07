$.prototype.DomainHandler = new function() {

    this.getDomains = $.getJSON("/data/domains.json");

    this.count = this.getDomains.length;
    this.runRemoval = function() {
        for (var i = this.count - 1; i >= 0; i--) {
            details = this.getCollectionDetails(this.getDomains[i].url);
            chrome.cookies.getAll(details, function(cookies) {
                console.log('Removing cookies');
                console.log(cookies);
                this.removeCookies(cookies);
            });
            this.Visual.updateProgress(i, this.count);
        }
    }

    this.removeCookies = function(cookies) {
        for (var i in cookies) {
            chrome.cookies.remove(this.getCookieDetails(this.createCookieUrl(cookies[i]), cookies[i].name));
            console.log('Remove cookie');
            console.log(cookies[i]);
            this.Tracking.trackEvent('Clearing', 'Cookie', this.createCookieUrl(cookies[i].url));
        }
        return true;
    }

    this.getCollectionDetails = function(domain) {
        return {
            domain: domain
        };
    }

    this.getCookieDetails = function(url, name) {
        return {
            url: url,
            name: name
        };
    }

    this.createCookieUrl = function(cookie) {
        return 'http' + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;
    }

}