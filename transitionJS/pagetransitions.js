var loginFlag = false;
var email = null;
function signinCallback(authResult) {
    if (authResult['status']['signed_in']) {
	gapi.auth.setToken(authResult);
	console.log(getEmail());
	loginFlag = true;
	$("#iterateEffects").trigger("mousedown").trigger("mouseup");
	
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
	    console.log(data),
	    modulelist()
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
  	outClass = '', inClass = '';

  	switch( animation ) {

  	case 1:
  	    outClass = 'pt-page-moveToLeft';
  	    inClass = 'pt-page-moveFromRight';
  	    break;
  	case 2:
  	    outClass = 'pt-page-moveToRight';
  	    inClass = 'pt-page-moveFromLeft';
  	    break;
  	case 3:
  	    outClass = 'pt-page-moveToTop';
  	    inClass = 'pt-page-moveFromBottom';
  	    break;
  	case 4:
  	    outClass = 'pt-page-moveToBottom';
  	    inClass = 'pt-page-moveFromTop';
  	    break;
  	case 5:
  	    outClass = 'pt-page-fade';
  	    inClass = 'pt-page-moveFromRight pt-page-ontop';
  	    break;
  	case 6:
  	    outClass = 'pt-page-fade';
  	    inClass = 'pt-page-moveFromLeft pt-page-ontop';
  	    break;
  	case 7:
  	    outClass = 'pt-page-fade';
  	    inClass = 'pt-page-moveFromBottom pt-page-ontop';
  	    break;
  	case 8:
  	    outClass = 'pt-page-fade';
  	    inClass = 'pt-page-moveFromTop pt-page-ontop';
  	    break;
  	case 9:
  	    outClass = 'pt-page-moveToLeftFade';
  	    inClass = 'pt-page-moveFromRightFade';
  	    break;
  	case 10:
  	    outClass = 'pt-page-moveToRightFade';
  	    inClass = 'pt-page-moveFromLeftFade';
  	    break;
  	case 11:
  	    outClass = 'pt-page-moveToTopFade';
  	    inClass = 'pt-page-moveFromBottomFade';
  	    break;
  	case 12:
  	    outClass = 'pt-page-moveToBottomFade';
  	    inClass = 'pt-page-moveFromTopFade';
  	    break;
  	case 13:
  	    outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
  	    inClass = 'pt-page-moveFromRight';
  	    break;
  	case 14:
  	    outClass = 'pt-page-moveToRightEasing pt-page-ontop';
  	    inClass = 'pt-page-moveFromLeft';
  	    break;
  	case 15:
  	    outClass = 'pt-page-moveToTopEasing pt-page-ontop';
  	    inClass = 'pt-page-moveFromBottom';
  	    break;
  	case 16:
  	    outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
  	    inClass = 'pt-page-moveFromTop';
  	    break;
  	case 17:
  	    outClass = 'pt-page-scaleDown';
  	    inClass = 'pt-page-moveFromRight pt-page-ontop';
  	    break;
  	case 18:
  	    outClass = 'pt-page-scaleDown';
  	    inClass = 'pt-page-moveFromLeft pt-page-ontop';
  	    break;
  	case 19:
  	    outClass = 'pt-page-scaleDown';
  	    inClass = 'pt-page-moveFromBottom pt-page-ontop';
  	    break;
  	case 20:
  	    outClass = 'pt-page-scaleDown';
  	    inClass = 'pt-page-moveFromTop pt-page-ontop';
  	    break;
  	case 21:
  	    outClass = 'pt-page-scaleDown';
  	    inClass = 'pt-page-scaleUpDown pt-page-delay300';
  	    break;
  	case 22:
  	    outClass = 'pt-page-scaleDownUp';
  	    inClass = 'pt-page-scaleUp pt-page-delay300';
  	    break;
  	case 23:
  	    outClass = 'pt-page-moveToLeft pt-page-ontop';
  	    inClass = 'pt-page-scaleUp';
  	    break;
  	case 24:
  	    outClass = 'pt-page-moveToRight pt-page-ontop';
  	    inClass = 'pt-page-scaleUp';
  	    break;
  	case 25:
  	    outClass = 'pt-page-moveToTop pt-page-ontop';
  	    inClass = 'pt-page-scaleUp';
  	    break;
  	case 26:
  	    outClass = 'pt-page-moveToBottom pt-page-ontop';
  	    inClass = 'pt-page-scaleUp';
  	    break;
  	case 27:
  	    outClass = 'pt-page-scaleDownCenter';
  	    inClass = 'pt-page-scaleUpCenter pt-page-delay400';
  	    break;
  	case 28:
  	    outClass = 'pt-page-rotateRightSideFirst';
  	    inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
  	    break;
  	case 29:
  	    outClass = 'pt-page-rotateLeftSideFirst';
  	    inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
  	    break;
  	case 30:
  	    outClass = 'pt-page-rotateTopSideFirst';
  	    inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
  	    break;
  	case 31:
  	    outClass = 'pt-page-rotateBottomSideFirst';
  	    inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
  	    break;
  	case 32:
  	    outClass = 'pt-page-flipOutRight';
  	    inClass = 'pt-page-flipInLeft pt-page-delay500';
  	    break;
  	case 33:
  	    outClass = 'pt-page-flipOutLeft';
  	    inClass = 'pt-page-flipInRight pt-page-delay500';
  	    break;
  	case 34:
  	    outClass = 'pt-page-flipOutTop';
  	    inClass = 'pt-page-flipInBottom pt-page-delay500';
  	    break;
  	case 35:
  	    outClass = 'pt-page-flipOutBottom';
  	    inClass = 'pt-page-flipInTop pt-page-delay500';
  	    break;
  	case 36:
  	    outClass = 'pt-page-rotateFall pt-page-ontop';
  	    inClass = 'pt-page-scaleUp';
  	    break;
  	case 37:
  	    outClass = 'pt-page-rotateOutNewspaper';
  	    inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
  	    break;
  	case 38:
  	    outClass = 'pt-page-rotatePushLeft';
  	    inClass = 'pt-page-moveFromRight';
  	    break;
  	case 39:
  	    outClass = 'pt-page-rotatePushRight';
  	    inClass = 'pt-page-moveFromLeft';
  	    break;
  	case 40:
  	    outClass = 'pt-page-rotatePushTop';
  	    inClass = 'pt-page-moveFromBottom';
  	    break;
  	case 41:
  	    outClass = 'pt-page-rotatePushBottom';
  	    inClass = 'pt-page-moveFromTop';
  	    break;
  	case 42:
  	    outClass = 'pt-page-rotatePushLeft';
  	    inClass = 'pt-page-rotatePullRight pt-page-delay180';
  	    break;
  	case 43:
  	    outClass = 'pt-page-rotatePushRight';
  	    inClass = 'pt-page-rotatePullLeft pt-page-delay180';
  	    break;
  	case 44:
  	    outClass = 'pt-page-rotatePushTop';
  	    inClass = 'pt-page-rotatePullBottom pt-page-delay180';
  	    break;
  	case 45:
  	    outClass = 'pt-page-rotatePushBottom';
  	    inClass = 'pt-page-rotatePullTop pt-page-delay180';
  	    break;
  	case 46:
  	    outClass = 'pt-page-rotateFoldLeft';
  	    inClass = 'pt-page-moveFromRightFade';
  	    break;
  	case 47:
  	    outClass = 'pt-page-rotateFoldRight';
  	    inClass = 'pt-page-moveFromLeftFade';
  	    break;
  	case 48:
  	    outClass = 'pt-page-rotateFoldTop';
  	    inClass = 'pt-page-moveFromBottomFade';
  	    break;
  	case 49:
  	    outClass = 'pt-page-rotateFoldBottom';
  	    inClass = 'pt-page-moveFromTopFade';
  	    break;
  	case 50:
  	    outClass = 'pt-page-moveToRightFade';
  	    inClass = 'pt-page-rotateUnfoldLeft';
  	    break;
  	case 51:
  	    outClass = 'pt-page-moveToLeftFade';
  	    inClass = 'pt-page-rotateUnfoldRight';
  	    break;
  	case 52:
  	    outClass = 'pt-page-moveToBottomFade';
  	    inClass = 'pt-page-rotateUnfoldTop';
  	    break;
  	case 53:
  	    outClass = 'pt-page-moveToTopFade';
  	    inClass = 'pt-page-rotateUnfoldBottom';
  	    break;
  	case 54:
  	    outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
  	    inClass = 'pt-page-rotateRoomLeftIn';
  	    break;
  	case 55:
  	    outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
  	    inClass = 'pt-page-rotateRoomRightIn';
  	    break;
  	case 56:
  	    outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
  	    inClass = 'pt-page-rotateRoomTopIn';
  	    break;
  	case 57:
  	    outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
  	    inClass = 'pt-page-rotateRoomBottomIn';
  	    break;
  	case 58:
  	    outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
  	    inClass = 'pt-page-rotateCubeLeftIn';
  	    break;
  	case 59:
  	    outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
  	    inClass = 'pt-page-rotateCubeRightIn';
  	    break;
  	case 60:
  	    outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
  	    inClass = 'pt-page-rotateCubeTopIn';
  	    break;
  	case 61:
  	    outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
  	    inClass = 'pt-page-rotateCubeBottomIn';
  	    break;
  	case 62:
  	    outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
  	    inClass = 'pt-page-rotateCarouselLeftIn';
  	    break;
  	case 63:
  	    outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
  	    inClass = 'pt-page-rotateCarouselRightIn';
  	    break;
  	case 64:
  	    outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
  	    inClass = 'pt-page-rotateCarouselTopIn';
  	    break;
  	case 65:
  	    outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
  	    inClass = 'pt-page-rotateCarouselBottomIn';
  	    break;
  	case 66:
  	    outClass = 'pt-page-rotateSidesOut';
  	    inClass = 'pt-page-rotateSidesIn pt-page-delay200';
  	    break;
  	case 67:
  	    outClass = 'pt-page-rotateSlideOut';
  	    inClass = 'pt-page-rotateSlideIn';
  	    break;

  	}
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
	$("#lock").css("visibility", "visible");
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
       arr.draggable({ revert: "invalid" });


    }
}

