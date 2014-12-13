$(document).ready(function() { 
    

    /* 모달창 띄우는 함수                                         */
    /* 로그인 페이지 클래스를 갖고있는 클래스에게서만 작동하게 함 */
    $('#module')
        .mouseup(function() {

            type = $(this).attr('data-type');
            // $('.module_modal').attr('style', 'display: block');
            $('.overlay-container').fadeIn(function() {
                window.setTimeout(function(){
                    $('.window-container.'+type).addClass('window-container-visible');
                }, 100);                    
            });                 
        });

    $('.close').click(function() {
        $('.overlay-container').fadeOut().end().find('.window-container').removeClass('window-container-visible');
    });

    /* Side 메뉴 애니메이션 효과 */ 
    /*
      $('#menu')
      .mouseenter(function() {
      $(this).animate({left:'-0.5%'});
      })
      .mouseleave(function(){
      $(this).animate({left:'-10%'});
      });*/

/*
    $("#search").click(function(){
        var url = "Search.html";
        var option = "width=200x, height=300px, status = no, titlebar=no,toolbar = no";
        window.open(url,"",option);
    });
*/
    function sidebar(){
        var trigger = $('#menubutton, #close'), menu = $('.menu');

        trigger.on('click',function(){

            $(this).toggleClass('active');
            menu.toggleClass('closed');
            $('#blurrMe').toggleClass('blurred'); // just here

        });
    }

    function deploy(){
        sidebar();
    }

    deploy();
});

/* Module Delete */
var delete_mode = 0;
var clicked  = 0;
function checkDelete(){
    /*
      document.getElementById("delete").className = "hidden";
      document.getElementById("confirm").className = "visible";
      document.getElementById("cancel").className = "visible";
    */

    var list = document.body.querySelectorAll("li");
    console.log(list);
    for(var i = 0 ; i<list.length; i++){
        list[i].onclick = select;
    }

    document.getElementById("delete").setAttribute("class", "menu_button hidden");
    document.getElementById("confirm").setAttribute("class", "menu_button visible");
    document.getElementById("cancel").setAttribute("class", "menu_button visible");

    delete_mode = 1;

}

function cancel(){
    /*
      document.getElementById("delete").className = "visible";
      document.getElementById("confirm").className = "hidden";
      document.getElementById("cancel").className = "hidden";
    */

    document.getElementById("delete").setAttribute("class", "visible menu_button");
    document.getElementById("confirm").setAttribute("class", "hidden menu_button");
    document.getElementById("cancel").setAttribute("class", "hidden menu_button");

    var arr = $(".selected");

    for(var i =0; i<arr.length ; i++){
        arr[i].className = "default";
    }

    delete_mode = 0;
}

function determine(){

    var arr = $(".selected");

    for(var i = 0; i < arr.length; i++){

	$.ajax({
	    type: "POST",
	    url: "/controller/delete_module.php",
	    data: {
		id : arr[i].id
	    },
	    success:function(data){
		console.log(data);
		var arr = $(".selected");
		for(var i = 0; i < arr.length; i++){
		    if(arr[i].id == data)
			arr[i].remove();
		    
		}
	    }
	});
    }

    document.getElementById("delete").setAttribute("class", "visible menu_button");
    document.getElementById("confirm").setAttribute("class", "hidden menu_button");
    document.getElementById("cancel").setAttribute("class", "hidden menu_button");


}

function select(id){
    if(delete_mode == 1){
        var clicked_class = id.target.className;
        var clicked_id = id.target.id;

        if(clicked_class == "default"){
            $("#" + clicked_id).attr('class','selected');
        }
        else if(clicked_class == "selected"){
            $("#" + clicked_id).attr('class','default');
        }

    }
}


window.onload = function (){

    $("#find")[0].onclick = search_module;
    $("#confirm")[0].onclick = confirm;

    $("#lock")[0].onclick = lock;
    



    /*
      document.getElementById("confirm").className = "hidden";
      document.getElementById("cancel").className = "hidden";
    */
    document.getElementById("confirm").setAttribute("class", "hidden menu_button");
    document.getElementById("cancel").setAttribute("class", "hidden menu_button");

    var deleteButton = document.getElementById("delete");
    var cancelButton = document.getElementById("cancel");
    var confirmButton = document.getElementById("confirm");



    deleteButton.onclick = checkDelete;
    cancelButton.onclick = cancel;
    confirmButton.onclick = determine;


    $( "#main" ).droppable({
	drop: function( event, ui ) {
	    console.log(event);
	    console.log(ui);
	    console.log(this);

	}
    });
    
}


function lock(){
    
    $.ajax({
	type: "POST",
	url: "/controller/delete_module.php",
	data: {
	    id : arr[i].id
	},
	success:function(data){
	    console.log(data);
	    var arr = $(".selected");
	    for(var i = 0; i < arr.length; i++){
		if(arr[i].id == data)
		    arr[i].remove();
		
	    }
	}
    });
    
}
function search_module(){
    console.log("search_moduel");
    $.ajax({
	type: "POST",
	url: "/controller/search_module.php",
	data: {
	    q : $("#q")[0].value
	},
	success:search_module_json
//	success:function(data){	    console.log(data);	}
    });
}


function search_module_json(ajax){
    $("#modulelist")[0].innerHTML="";

    var data = JSON.parse(ajax);
    console.log(data);
    for (var i = 0; i < data.length; i++){
 	console.log(data[i]['name']);
	console.log(data[i]['id']);
	var li = document.createElement("li");
	$("#modulelist")[0].appendChild(li);
	li.innerHTML = data[i]['name'];
	li.onclick = add_module;
    }
}

function add_module(){
    if(this.style.color == "red"){
	this.style.color = "black";
	this.className="";
    }
    else{
	this.style.color="red";
	this.classList.add("add_module");
    }

}

$(function() {
    $( "#search_modal" ).dialog({
	autoOpen: false
    });
    
    $( "#search" ).click(function() {
	$( "#search_modal" ).dialog( "open" );
    });
});

