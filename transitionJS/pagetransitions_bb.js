var loginFlag = false;
var email = null;
function signinCallback(authResult) {
    if (authResult['status']['signed_in']) {
    	//document.getElementById("loginStatus").innerHTML;
    	
	/* hari code */
	gapi.auth.setToken(authResult);
	/**/
	loginFlag = true;
	$("#transTrigger").trigger("mousedown").trigger("mouseup");
	$("loginStatus").update("callback!");	

    } else {

	loginFlag = false;
    }

}

/*hari code*/
function getEmail(){
    gapi.client.load('oauth2', 'v2', function() {
        var request = gapi.client.oauth2.userinfo.get();
        request.execute(getEmailCallback);
    });
}

function getEmailCallback(obj){
    var el = document.getElementById('loginStatus');
    var message = 'welcome ';

    if (obj['email']) {
      message += obj['email'];
    }
    message += ":)";

    el.innerHTML = message;
    //toggleElement('email');
    if (obj['email']) {
	email = obj['email'];
    }

    $.ajax({
	type: "POST",
	url: "controller/login.php",
	data: {
	    email: email
	},
	success:function(data){
	    coordinate();
	    modulelist();
	    $("#lock").css("visibility","visible");
	    $("#upload1").css("visibility","visible");
	    $("#resetIframe").css("visibility","visible");
	    $('.close').trigger("click");
	}
    });
}
/**/

var PageTransitions = (function() {
    var elementPositionX, elementPositionY;
    var $rootDiv = $( '#rootDiv' ),
    $transTarget = $rootDiv.children( 'div.transTarget' ),
    $trigger = $( '#transTrigger' ),
    animcursor = 1,
    pagesCount = $transTarget.length,
    current = 0,
    isAnimating = false,
    endCurrPage = false,
    endNextPage = false,
    animEndEventNames = {
  	'WebkitAnimation' : 'webkitAnimationEnd',
  	'OAnimation' : 'oAnimationEnd',
  	'msAnimation' : 'MSAnimationEnd',
  	'animation' : 'animationend'
    },
    // animation end event name
    animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
    // support css animations
    support = Modernizr.cssanimations;
    
    function init() {
	  	$transTarget.each( function() {
	  	    var $page = $( this );
	  	    $page.data( 'originalClassList', $page.attr( 'class' ) );
	  	} );
	  	$transTarget.eq(current).addClass( 'transCurrent' );
	  	$trigger.on( 'mousedown', function(){
	  	    elementPositionX = $trigger.position();
	  	    //alert(elementPositionX.left+" || "+elementPositionX.top);
		});
	  	$trigger.on( 'mouseup', function() {
	  	    elementPositionY = $trigger.position();
	  	    //alert(elementPositionY.left+" || "+elementPositionY.top);
	  	    if(elementPositionX.left==elementPositionY.left && elementPositionX.top==elementPositionY.top){
	  		if(loginFlag){
	  		    if( animcursor > 67 ) {
	  			animcursor = 1;
	  		    }
			    $(".close").trigger("click");
	  		    nextPage( animcursor );
	  		    ++animcursor;
	  		}
	  	    }	
	  	    
	  	} );
    }

    function nextPage(options ) {
  	var animation = (options.animation) ? options.animation : options;
  	var $currPage = $transTarget.eq(current);

  	if(options.showPage){
  	    if( options.showPage < pagesCount - 1 ) {
  		current = options.showPage;
  	    }
  	    else {
  		current = 0;
  	    }
  	}
  	else{
  	    if( current < pagesCount - 1 ) {
  		++current;
  	    }
  	    else {
  		current = 0;
  	    }
  	}

  	var $nextPage = $transTarget.eq( current ).addClass( 'transCurrent' ),

  	outClass = 'pt-page-rotateCubeLeftOut';
  	inClass = 'pt-page-rotateCubeLeftIn';
  	$currPage.addClass( outClass ).on( animEndEventName, function() {
  	    $currPage.off( animEndEventName );
  	    endCurrPage = true;
  	    if( endNextPage ) {
  		onEndAnimation( $currPage, $nextPage );
  	    }
  	} );

  	$nextPage.addClass( inClass ).on( animEndEventName, function() {
  	    $nextPage.off( animEndEventName );
  	    endNextPage = true;
  	    if( endCurrPage ) {
  		onEndAnimation( $currPage, $nextPage );
  	    }
  	} );

  	if( !support ) {
  	    onEndAnimation( $currPage, $nextPage );
  	}

    }

    function onEndAnimation( $outpage, $inpage ) {
  	endCurrPage = false;
  	endNextPage = false;
  	resetPage( $outpage, $inpage );
  	isAnimating = false;

    }

    function resetPage( $outpage, $inpage ) {
  	$outpage.attr( 'class', $outpage.data( 'originalClassList' ) );
  	$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' transCurrent' );
    }

    init();

    return { 
  	init : init,
  	nextPage : nextPage,
    };

})();


/* hari code module list ajax */
function modulelist(){
    $.ajax({
	type: "POST",
	url: "/controller/module_list.php",
	success:modulelist_json
    });
}

function modulelist_json(ajax){
    var data = JSON.parse(ajax);
   for (var i = 0; i < data.length; i++){
       var li = document.createElement("li");
       $("#module_list")[0].appendChild(li);
       li.innerHTML = data[i]['name'];
       li.classList.add("default");
       li.id = data[i]['id'];
       var arr = $("li");
//       arr.draggable({ revert: "invalid" });


    }
}



function coordinate(){
    $.ajax({
	type: "POST",
	url: "/controller/coordinate.php",
	success:coordinate_json
    });
    
}

function coordinate_json(ajax){
    var data = JSON.parse(ajax);
    for (var i = 0; i < data.length; i++){
	var x = parseInt(data[i]['x']);
	var y = parseInt(data[i]['y']);
	
	
	if(x != -1 && y != -1){
	    id = data[i]['id'];
            test.createModule("testmodule_" + id);
            test.setModulePos("testmodule_" + id, x, y);
	    $("#testmodule_"+id+" p")[0].innerHTML = data[i]['name'];

	}
	else{
	    
	    }
    }
}


