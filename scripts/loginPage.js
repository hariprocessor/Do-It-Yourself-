/* 원들 사이 선 그리기 */
jsPlumb.ready(function() {    
    var jsplumb = jsPlumb.getInstance({
        Connector:"StateMachine",
        PaintStyle:{ lineWidth:3, strokeStyle:"#bd4932", "solidstyle":"2 4" },
        Endpoint:"Blank",
        Container:"perimeter-demo"
    });

    var login_page = jsPlumb.getSelector('.login-page');
    jsplumb.draggable(login_page);
        
    for (var j = 1; j < login_page.length; j++) {
        jsplumb.connect({
            source:login_page[0],   
            target:login_page[j],
            anchors:[
                [ "Perimeter", { shape:login_page[0].getAttribute("data-shape"), rotation:login_page[0].getAttribute("data-rotation") }],
                [ "Perimeter", { shape:login_page[j].getAttribute("data-shape"), rotation:login_page[j].getAttribute("data-rotation") }]
            ]
        });        
    }        
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

    /* 모달창 닫기 */
    $('.close').click(function() {
        $('.overlay-container').fadeOut().end().find('.window-container').removeClass('window-container-visible');
    });
});


