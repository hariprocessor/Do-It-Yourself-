var loginFlag = false;
var email = null;
function signinCallback(authResult) {
    if (authResult['status']['signed_in']) {
    	//document.getElementById("loginStatus").innerHTML;
    	
	/* hari code */
	gapi.auth.setToken(authResult);
	console.log(getEmail());
	/**/
	loginFlag = true;
	$("#iterateEffects").trigger("mousedown").trigger("mouseup");
	$("loginStatus").update("callback!");
	
    } else {
	console.log('Sign-in state: ' + authResult['error']);
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
    //console.log(obj);   // 전체 개체를 검사하려면 주석을 해제합니다.

    el.innerHTML = message;
    //toggleElement('email');
    if (obj['email']) {
	email = obj['email'];
	console.log(email);
    }

    $.ajax({
	type: "POST",
	url: "controller/login.php",
	data: {
	    email: email
	},
	success:function(data){
	    console.log(data);
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
    var $main = $( '#pt-main' ),
    $pages = $main.children( 'div.pt-page' ),
    $iterate = $( '#iterateEffects' ),
    animcursor = 1,
    pagesCount = $pages.length,
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
    var elementPositionX, elementPositionY;
    function init() {

  	$pages.each( function() {
  	    var $page = $( this );
  	    $page.data( 'originalClassList', $page.attr( 'class' ) );
  	} );

  	$pages.eq( current ).addClass( 'pt-page-current' );


  	$( '#dl-menu' ).dlmenu( {
  	    animationClasses : { in : 'dl-animate-in-2', out : 'dl-animate-out-2' },
  	    onLinkClick : function( el, ev ) {
  		ev.preventDefault();
  		nextPage( el.data( 'animation' ) );
  	    }
  	} );
  	$iterate.on( 'mousedown', function(){
  	    elementPositionX = $iterate.position();
  	    //alert(elementPositionX.left+" || "+elementPositionX.top);
	});
  	$iterate.on( 'mouseup', function() {
  	    elementPositionY = $iterate.position();
  	    //alert(elementPositionY.left+" || "+elementPositionY.top);
  	    if(elementPositionX.left==elementPositionY.left && elementPositionX.top==elementPositionY.top){
  		if(loginFlag){
  		    if( isAnimating ) {
  			return false;
  		    }
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

  	if( isAnimating ) {
  	    return false;
  	}

  	isAnimating = true;
  	
  	var $currPage = $pages.eq( current );

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

  	var $nextPage = $pages.eq( current ).addClass( 'pt-page-current' ),

  	outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
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
  	$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' pt-page-current' );
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
//    console.log(ajax.responseText);
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
	    console.log(data);
	    console.log(id);
            test.createModule("testmodule_" + id);
            test.setModulePos("testmodule_" + id, x, y);
	    $("#testmodule_"+id+" p")[0].innerHTML = data[i]['name'];

	}
	else{
	    
	    }
    }
}


