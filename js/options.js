var autorefreshId = 'autorefresh',
    savebuttonId = 'save',
    statusUpdateText = 'Options saved.',
    autorefreshDefaultValue = true;

// Saves options to chrome.storage
function save_options() {
    var autorefresh = document.getElementById(autorefreshId).checked;
    chrome.storage.sync.set({
        autorefresh: autorefresh
    }, function() {
        var status = document.getElementById('status');
        status.textContent = statusUpdateText;
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });

    _gaq.push(['_trackEvent', 'Options', 'Save']);
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get({
        autorefresh: autorefreshDefaultValue
    }, function(items) {
        document.getElementById(autorefreshId).checked = items.autorefresh;
    });

    _gaq.push(['_trackEvent', 'Options', 'Load']);
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById(savebuttonId).addEventListener('click', save_options);
