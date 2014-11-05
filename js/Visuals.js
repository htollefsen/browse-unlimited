var Visuals = new function(){

    var divId = 'browse-unlimited-loader'; // div id to style
    var confirmationMessage = 'Happy Surfing!';

    this.addElement = function(id, parentId) {
        $( "#" + parentId ).append( "<div id=" + id + "></div>" );
    }

    this.resetElements = function() {
        this.addElement('progress_wrapper', divId);
        this.addElement('progressbar', 'progress_wrapper');
        this.addElement('indicator', 'progressbar');
    }

    this.updateProgress = function(iteration, total) {
        $("#indicator").animate({ width: (iteration / total * 100) + "%" });
    }

    this.progressComplete = function() {
        $('#' + divId).width( 105 );
        $('#' + divId).html(confirmationMessage);
    }

}