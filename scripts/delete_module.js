function delete_module(){
    $.ajax({
	type: "POST",
	url: "/controller/delete_module.php",
	data: {
	    q : $("#q")[0].value
	},
	success:search_module_json
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
/*
function confirm(){
    
    for(var i = 0; i < $(".add_module").length; i++){
	$(".add_module")[i].
    }
}
*/
window.onload = function (){
    $("#find")[0].onclick = search_module;
    $("#confirm")[0].onclick = confirm;

}
