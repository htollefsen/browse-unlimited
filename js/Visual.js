$.prototype.Visual = new function() {

    this.divId = 'browse-unlimited-loader';
    this.confirmationMessage = 'Happy Surfing!';
/*
    this.addElement = function(id, parentId) {
        $( "#" + parentId ).append( "<div id=" + id + "></div>" );
    }
*/
/*
    this.resetElements = function() {
        this.addElement('progress_wrapper', this.divId);
        this.addElement('progressbar', 'progress_wrapper');
        this.addElement('indicator', 'progressbar');
    }
*/
    this.updateProgress = function(iteration, total) {
        $("#indicator").animate({ width: (iteration / total * 100) + "%" });
    }

    this.progressComplete = function() {
        $('#' + this.divId).width( 105 );
        $('#' + this.divId).html(this.confirmationMessage);
    };

}