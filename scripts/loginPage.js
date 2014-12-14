/* 원들 사이의 선을 그려주는 함수 */
jsPlumb.ready(function() {
    
    var instance = jsPlumb.getInstance({
        Connector:"StateMachine",
        PaintStyle:{ lineWidth:3, strokeStyle:"#bd4932", "solidstyle":"2 4" },
        Endpoint:"Blank",
        Container:"perimeter-demo"
    });

    var mains = jsPlumb.getSelector('.login-page');
    // make everything draggable
    instance.draggable(mains);
    
    // suspend drawing and initialise.
    instance.doWhileSuspended(function() {
        
        // loop through them and connect each one to each other one.
        for (var j = 1; j < mains.length; j++) {
            instance.connect({
                source:mains[0],  // just pass in the current node in the selector for source 
                target:mains[j],
                // here we supply a different anchor for source and for target, and we get the element's "data-shape"
                // attribute to tell us what shape we should use, as well as, optionally, a rotation value.
                anchors:[
                    [ "Perimeter", { shape:mains[0].getAttribute("data-shape"), rotation:mains[0].getAttribute("data-rotation") }],
                    [ "Perimeter", { shape:mains[j].getAttribute( "data-shape"), rotation:mains[j].getAttribute("data-rotation") }]
                ]
            });
            
        }        
    });

    jsPlumb.fire("jsPlumbDemoLoaded", instance);

});







$(document).ready(function() {
    
    var elementPositionX, elementPositionY;
    
    /* 모달창 띄우는 함수                                         */
    /* 로그인 페이지 클래스를 갖고있는 클래스에게서만 작동하게 함 */
    $('.login-page')
        .mousedown(function() {        
            elementPositionX = $(this).position();
        })
        .mouseup(function() {
	    
            elementPositionY = $(this).position();
            /* 원의 움직임이 없을 경우 모달창 띄움 */
            if(elementPositionX.left==elementPositionY.left && elementPositionX.top==elementPositionY.top){
		
                type = $(this).attr('data-type');
                
                /* 클릭한 원의 클래스에 따라 모달창 내용을 다르게 띄움 */
                if($(this).attr('class').search('usage') != -1) {                
                    $('.usage_modal').attr('style', 'display: block');
                    $('.credit_modal').attr('style', 'display: none');
                    $('.login_modal').attr('style', 'display: none');
                    $('.overlay-container').fadeIn(function() {
			
                        window.setTimeout(function(){
                            $('.window-container.'+type).addClass('window-container-visible');
                        }, 100);                    
                    });
                }
                else if($(this).attr('class').search('credit') != -1) {                   
                    $('.usage_modal').attr('style', 'display: none');
                    $('.credit_modal').attr('style', 'display: block');
                    $('.login_modal').attr('style', 'display: none');
                    $('.overlay-container').fadeIn(function() {
			
                        window.setTimeout(function(){
                            $('.window-container.'+type).addClass('window-container-visible');
                        }, 100);                    
                    });
                }
                else if($(this).attr('class').search('sign_in') != -1) {
                    $('.usage_modal').attr('style', 'display: none');
                    $('.credit_modal').attr('style', 'display: none');
                    $('.login_modal').attr('style', 'display: block');
                    $('.overlay-container').fadeIn(function() {
			
                        window.setTimeout(function(){
                            $('.window-container.'+type).addClass('window-container-visible');
                        }, 100);                    
                    });
                }               
            }
        });

    $('.close').click(function() {
        $('.overlay-container').fadeOut().end().find('.window-container').removeClass('window-container-visible');
    });
});


