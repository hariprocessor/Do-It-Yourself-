function showHint(str){
    var xmlhttp;
    
    if (str.length==0){ 
        document.getElementById("modulelist").innerHTML="";
        return;
    }
    if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else{// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            var tmp = JSON.parse(xmlhttp.responseText);


            var length = tmp.length;

            var result = "";
            var initial = document.getElementById("modulelist").innerHTML;

            if(initial !== ""){
                document.getElementById("modulelist").innerHTML ="";
            }

            for(var i = 0; i<length; i++){
                result = "<li>"+tmp[i].name +"</li>";
                document.getElementById("modulelist").innerHTML+=result ;
            }
           
            
        }
    }

    var url = "http://diy.hariprocessor.com/controller.php?d=diy&t=1&select=*&table=MODULE&cond=name like '%25" + str + "%25'";

    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}

window.onload = function(){
    document.getElementById("find").onkeyup = function(){
        showHint(this.value);
    };
};
