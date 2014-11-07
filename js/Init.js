$(function() {
    console.log('Start Init');
    $.prototype.Tracking.Init();
    //$.prototype.Visual.resetElements();
    $.prototype.DomainHandler.runRemoval();
    $.prototype.Visual.progressComplete();
    console.log('End Init');
});

