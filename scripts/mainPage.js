var test;

// kill right click
window.oncontextmenu = function ()
{
    return false;
}

$(document).ready(function() { 
    $("#module_view.modal").modal();
    
    test = new ModuleController();
    test.init("testmain",null);
    /* 모달창 띄우는 함수                                         */
    /* 로그인 페이지 클래스를 갖고있는 클래스에게서만 작동하게 함 */
/*
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
*/
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

/* 황교준 추가한 부분 */
    $('#module_list').sortable({
        revert: "valid"
    });
    $('#module_list').disableSelection();

    var module_count = 1;
    $('#testmain_DisplayCircle0').css("left","48%");
    $('#testmain_DisplayCircle0').css("top","43%");

    $('#testmain_DisplayCircle0').css("width","600px");
    $('#testmain_DisplayCircle0').css("height","600px");
    $('#testmain_DisplayCircle0').css("border-radius","600px");



    $('#testmain_DisplayCircle0').droppable({
        drop: function( event, ui ){
	    var id = ui.draggable[0].id;

	    if($("#testmodule_"+id).length){
		return;
	    }
	    
            if(ui.draggable.attr('class').search("default") != -1){
                if(module_count <= 12){
                    test.createModule("testmodule_" + id);
                    test.setModulePos("testmodule_" + id,800 + 250 * Math.cos((360 * module_count / 12 ) * Math.PI / 180 ),300 + 250 * Math.sin((360 / 12 * module_count) * Math.PI / 180));

		    $("#testmodule_"+id+" p")[0].innerHTML = ui.draggable[0].innerHTML;

                    module_count++;
                }
                else{
                    alert("모듈을 더 이상 추가할 수 없습니다.");
                }
            }
        }
    });
    $("#testmain_DisplayCircle0 p").remove();
//    $("#testmain_DisplayCircle0").style.backgroundColor = "#F5EED2";
    $("#resetIframe").click(function() {
        $("#testmain_DisplayFrame").attr('src',"about:blank");
        test.resetIframe("testmain");
    });


/*----------*/
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
    var list = document.body.querySelectorAll("li");
    for(var i = 0 ; i<list.length; i++){
        list[i].onclick = select;
    }

    document.getElementById("delete").setAttribute("class", "menu_button hidden");
    document.getElementById("confirm").setAttribute("class", "menu_button visible");
    document.getElementById("cancel").setAttribute("class", "menu_button visible");

    delete_mode = 1;

}

function cancel(){
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
    $("#upload1")[0].onclick = upload1;
    $("#find")[0].onclick = search_module;
    $("#confirm")[0].onclick = confirm;

    $("#lock")[0].onclick = lock;
    $("#search_modal_close")[0].onclick = search_modal_close;
    $("#search_modal_confirm")[0].onclick = search_modal_confirm;


    document.getElementById("confirm").setAttribute("class", "hidden menu_button");
    document.getElementById("cancel").setAttribute("class", "hidden menu_button");

    var deleteButton = document.getElementById("delete");
    var cancelButton = document.getElementById("cancel");
    var confirmButton = document.getElementById("confirm");



    deleteButton.onclick = checkDelete;
    cancelButton.onclick = cancel;
    confirmButton.onclick = determine;

}


function lock(){
    var arr = $(".modules");
    for(var i = 1; i < arr.length; i++){
	var s = arr[i].id.split('_');
	var id = s[1];
	var offset = $("#testmodule_"+id).offset();
	$.ajax({
	    type: "POST",
	    url: "/controller/lock.php",
	    data: {
		id : id,
		x : offset.left,
		y : offset.top
	    }, success : function(){
	    }

	});
    }
    
}
function search_module(){
    $.ajax({
	type: "POST",
	url: "/controller/search_module.php",
	data: {
	    q : $("#q")[0].value
	},
	success:search_module_json
    });
}


function search_module_json(ajax){
    $("#modulelist")[0].innerHTML="";

    var data = JSON.parse(ajax);
    for (var i = 0; i < data.length; i++){
	var li = document.createElement("li");
	$("#modulelist")[0].appendChild(li);
	li.innerHTML = data[i]['name'];
	li.onclick = add_module;
	li.id = data[i]['id'];
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

function search_modal_close(){
    $("#modulelist")[0].innerHTML = "";
}


function search_modal_confirm(){
    var arr = $(".add_module");
    for(var i = 0; i < arr.length; i++){
	$.ajax({
	    type: "POST",
	    url: "/controller/add_module.php",
	    data: {
		id : arr[i].id
	    },
	    success:function(data){
		var arr2 = $(".add_module");
		for(var j = 0; j < arr2.length; j++){
		    if(arr2[j].id == data){
			var li = document.createElement("li");
			$("#module_list")[0].appendChild(li);
			li.innerHTML = arr2[j].innerHTML;
			li.classList.add("default");
			li.id = arr2[j].id;
			var arr = $("li");
//			arr.draggable({ revert: "invalid" });
		    }
		}
	    }
	});
    }
}


function upload1(){
    var url = "http://diy.hariprocessor.com/upload/upload.html";
    window.open(url, "", "width=300, height=600, resizable=no, scrollbars=no, status=no");
}

function url(id, frame){
    var url;
    $.ajax({
	type: "POST",
	url: "/controller/url.php",
	data: {
	    id : id
	},
	success:function(data){
	    frame.attr('src', data);
	}
    });
    return url;
}

function url2(id, frame, e){
    if(e.which != 3)
	return ;

    var type = $("#"+id).attr('data-type');
    type = "zoomin";

    var url;
    $.ajax({
	type: "POST",
	url: "/controller/url.php",
	data: {
	    id : id
	},
	success:function(data){
	    frame.attr('src',data);

	    
	}
    });
    return url;
}
