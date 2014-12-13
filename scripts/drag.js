
window.onload = function (){
    console.log("drag?");

    $( "#main" ).droppable({
	drop: function( event, ui ) {
	    console.log(event);
	    console.log(ui);
	    console.log(this);

	}
    });

}
