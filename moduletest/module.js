"use strict";
function callbackTimer() {

	this._timer;
	this._id;
	this._obj;
	this._cnt;
	this._func;
	this._toggle;
	this._interval;
	//
	this._value;
	this._rad;
	//
	callbackTimer.timers = [];
	callbackTimer.Tick = function(_this) {
		_this._cnt++;
		//console.log(_this._toggle);
		if (_this._toggle === "DRAG_MOVE") { 
			//console.log(_this._func.refreshMe().scalar);
			var tmp =_this._func.refreshMe();
			_this._value = tmp.scalar;
			_this._rad = tmp.rad;
			//console.log (_this._value);
		}
		else if (_this._toggle === "DRAG_STOP") {
			//console.log("STOP");
			//console.log(_this._id);
			//console.log(_this._obj);
			
			_this._obj.style.left = (Number(_this._obj.style.left.split("px")[0]) +
				Math.cos(_this._rad) * _this._value * _this._interval).toString() + "px";
			_this._obj.style.top = (Number(_this._obj.style.top.split("px")[0]) +
				Math.sin(_this._rad) * _this._value * _this._interval).toString() + "px";
			var _collision = ModuleController.CollisionTest(_this._id);
			
			if(_collision.type == 1) {
				_this._value = _this._value / 3 * 2;
				_this._rad = _collision.rad;
				//console.log(_collision.rad);

				//callbackTimer.Release(_this._id);
				//console.log("new created");
				//return;
				var timer = new callbackTimer();
				timer.setTimerData(_collision.byid,_collision.by,0,null,"DRAG_STOP",_this._interval);
				timer._value = _this._value;
				timer._rad = _collision.rad - Math.PI;
				timer.TimerStart();
			}
			else if(_collision.type == 2) {//Y축 만남(X축대칭) 
				_this._rad = -Math.PI -_this._rad;
			}
			else if(_collision.type == 3) {//X축 만남(Y축대칭)
				_this._rad = -_this._rad;

			}
			/*
			console.log(Number(_this._obj.style.left.split("px")[0]) + " " + 
				Number(_this._obj.style.top.split("px")[0]) + " " + 
				(Math.cos(_this._rad) * _this._value * _this._interval) + " " +
				(Math.sin(_this._rad) * _this._value * _this._interval));
			*/
			_this._value -= 0.05;
			if (_this._value < 0) {
				console.log("end");
				clearInterval(_this._timer);
				_this._obj.style.backgroundColor="#ac5";
				callbackTimer.Release(_this._id);
			}
			//return;	
		}
	};
	
	callbackTimer.Release = function(id) {
		for (var i=0;i<callbackTimer.timers.length;i++) {
			if(callbackTimer.timers[i]._id === id) {
				clearInterval(callbackTimer.timers[i]._timer);
				//callbackTimer.Tick(callbackTimer.timers[i]);
				//delete callbackTimer.timers[i];
				callbackTimer.timers[i]._obj.style.backgroundColor="#ac5";
				callbackTimer.timers.splice(i,1);
				console.log("Released.");
				return true;
			}
		}
		return false;
	};

	callbackTimer.setToggle = function(id,toggle) {
		for (var i=0;i<callbackTimer.timers.length;i++) {
			if(callbackTimer.timers[i]._id === id) {
				callbackTimer.timers[i]._toggle = toggle;
				console.log("toggle Updated.");
				return true;
			}
		}
		return false;
	};
	
	this.setTimerData = function(id,obj,cnt,func,toggle,interval) {
		this._id = id;
		this._obj = obj;
		this._cnt = cnt;
		this._func = func;
		this._toggle = toggle;
		this._interval = interval;	
	};
	this.TimerStart = function() {
		
		var _this = this;
		/*
		_this._value = 0;
		_this._rad = 0;
		_this._id = id;
		_this._obj = obj;
		_this._cnt = 0;
		_this._func = func;
		
		_this._toggle = toggle;
		_this._interval = interval;
		*/
		for (var i=0;i<callbackTimer.timers.length;i++) {
			if(callbackTimer.timers[i]._id === _this._id) {
				callbackTimer.timers[i]._rad = callbackTimer.timers[i]._rad +
				(_this._rad - callbackTimer.timers[i]._rad) / 2;
				return;
			}
		}
		if (_this._func)
			_this._func.init(_this._id,_this._interval);
		//console.log(_this._msg);
		_this._obj.style.backgroundColor= "green";
		callbackTimer.timers.push(_this);
		_this._timer = setInterval(function(){callbackTimer.Tick(_this);},_this._interval);
	};
}


function velocityCounter(id) {
		var _LIMIT; //constant.
		var _x;
		var _y;
		var _id;
		var _interval;
		var pushpos = function () {
			_x.push(Number($("#" + _id).css("left").split("px")[0]));
			_y.push(Number($("#" + _id).css("top").split("px")[0]));
			if (_LIMIT / _interval < _x.length) {
				_x = _x.slice(-parseInt(_LIMIT / _interval));
				_y = _y.slice(-parseInt(_LIMIT / _interval));
			}
		};

		this.init = function(id,interval) {
			var _this = this;
			_x = [];
			_y = [];
			_LIMIT = 500;
			_id = id;
			pushpos();
			_interval = interval;
			return _this;
		};
		this.refreshMe = function() {
			pushpos();
			var d = [];
			var dcnt = 0;
			for (var i=0;i<_x.length-1;i++) {
				d.push(Math.sqrt(Math.pow(_x[i] - _x[i+1],2) + 
					Math.pow(_y[i] - _y[i+1],2)) / _interval);
				
			}
			for (var i=0;i<d.length;i++) {
				dcnt += d[i];
			}	
			
			var vv = {
				"scalar" : dcnt / d.length > 3 ? 3 : dcnt / d.length,
				"rad" : Math.atan2(_y[d.length] - _y[0],_x[d.length] - _x[0])
			};
			return vv;
		};
}

function ModuleController() {

	//---variable list---
	//CONST
	var _INTERVAL;

	//STATIC
	ModuleController.me = []; //array of ModuleController.
	

	//PUBLIC
	

	//PRIVATE
	var _CurrentModule; //current focusing module
	var _Modules = []; //module array.
	var _Owner; //module owner's element id.
	var _Parent; //parent of this controller.
	var _DisplayCircle; //root's center circle. unique.

	//---variable end---




	//---struct Module--

	var Module = function() { 
		this.elem = undefined;
		this.id = null;
		this.url = "";
		this.init = function(id,elem) {
			this.elem = elem;
			this.id = id;
		    $("#" + id).draggable({
		      	start: function() {
			        console.log("drag start");
			        var id = this.getAttribute("id");
					var timer = new callbackTimer();
					var vc = new velocityCounter();
					var _this = this;
					timer.setTimerData(id,_this,0,vc,"DRAG_MOVE",_INTERVAL);
					timer.TimerStart();
		     	},
		      	drag: function() {
			        //console.log("dragging");
			        //console.log(this);
			        var id = this.getAttribute("id");
			        if(ModuleController.CollisionTest(id)) {
			        	return false;
			        }
					
		      	},
		      	stop: function() {
			        console.log("drag stop");
			        callbackTimer.setToggle(this.getAttribute("id"),"DRAG_STOP");
			        /*
			        if(callbackTimer.Release(this.getAttribute("id")))
			        	console.log("clear");
			        */
			        	
		      	},
		      	//cancel : ".collision",
		      	containment: "#" + _Owner, 
		      	scroll: false
	    	})
	    	.dblclick(function(){
	          	$("#" + _Owner + "_DisplayFrame").attr('src',"http://www.w3schools.com");
	     })
	    // 오른쪽 버튼 클릭 시 모달창으로 View
	        .mousedown(function(e){
	            if(e.which == 3)
	            {
	            	var type = $("#"+id).attr('data-type');
	            	$("#modal_iframe").attr('src',"http://www.w3schools.com");
	                $('.overlay-container').fadeIn(function() {                    
	                        window.setTimeout(function(){
	                            $('.window-container.'+type).addClass('window-container-visible');
	                        }, 100);
	                });					
	            }
	        });
		};

		this.position = function(x, y) {
			//position 강제 변경
		};
		this.move = function() {
			if(arguments.length > 2 || arguments.length < 1) return undefined;
			//this.position(x,y)
		};
	};

	ModuleController.CollisionTest = function(id) {
		//먼저 원끼리의 테스트.
		var _collision = 0;
        for (var i=0;i<ModuleController.me.length;i++) {
        	_collision = ModuleController.me[i].collision(id);
        	if (_collision) return _collision;
        }
        return false;
	};

	//---struct end---
	this.collision = function(id) {
		var elem = document.getElementById(id);
		var bfind = false;
		for (var i=0;i<_Modules.length;i++) {
			if (_Modules[i].id == id) {
				bfind = true;
				break;
			}
		}
		if (!bfind) return 0;
		var r2 = Number(elem.style.width.split("px")[0]) / 2;
		var x2 = Number(elem.style.left.split("px")[0]) + r2;
		var y2 = Number(elem.style.top.split("px")[0]) + r2;
		for (var i=0;i<_Modules.length;i++) {
			if (_Modules[i].id != id) {
				var r1 = Number(_Modules[i].elem.style.width.split("px")[0]) / 2;
				var x1 = Number(_Modules[i].elem.style.left.split("px")[0]) + r1;
				var y1 = Number(_Modules[i].elem.style.top.split("px")[0]) + r1;
				
				var d = Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
				
				//console.log("Distance : "  + d1 + 
				//	" Radius : " + (r1 + r2));
				if (d <= r1 + r2) {
					//$('#' + id).mouseup();
					//console.log("Module " + i + " : Collision!");
					
					var angle = Math.atan2((y2-y1), (x2-x1));
					//console.log(angle);
					var x = x1  + Math.cos(angle) * (r1 + r2 + 1) -r2;
					var y = y1  + Math.sin(angle) * (r1 + r2 + 1) -r2;
					//console.log(x + " " + y);
					//elem.className = "modules collision";
					elem.style.left = x.toString() + "px";
					elem.style.top = y.toString() + "px";
					this.collision(id);
					var ret = {
						type : 1,
						by : _Modules[i].elem,
						byid : _Modules[i].id,
						rad : angle
					};

					return ret;
				}
			}
		}
		if (x2 - r2 <= 0 || x2 + r2 >= Number($("#" + _Owner).css("width").split("px")[0])) { //collision
			if (x2 - r2 <= 0)
				elem.style.left = "1px";
			else
				elem.style.left = (Number($("#" + _Owner).css("width").split("px")[0]) - 1 -r2 * 2).toString() + "px";
			var ret =  {
				type : 2
			};
			return ret; //with Y축
		}
		else if (y2 - r2 <= 0 || y2 + r2 >= Number($("#" + _Owner).css("height").split("px")[0])) {
			if (y2 - r2 <=0)
				elem.style.top = "1px";
			else
				elem.style.top = (Number($("#" + _Owner).css("height").split("px")[0]) - 1 -r2 * 2).toString() + "px";
			var ret =  {
				type : 3
			};
			return ret; //with X축
		}

		return 0;
	};

	this.init = function(owner,parent) {
		//
		_Owner = owner;
		_INTERVAL = 10;
		ModuleController.me.push(this);
		if(parent) { //만약 부모가 없다면 이 인스턴스는 독자적으로 도는 것.
			_DisplayCircle = parent._DisplayCircle;
			return 1;
		}

		var display_id = owner + "_DisplayCircle";
		var displayframe = document.createElement('iframe');
		var cnt = 0;

		
		while(1) {
			//console.log(document.getElementById(display_id + cnt));
			if (document.getElementById(display_id + cnt))
				cnt++;
			else
				break;
		}
		display_id += cnt;
		displayframe.id = owner + "_DisplayFrame";
		_DisplayCircle = this.createModule(display_id).this;
		$("#" + display_id).append(displayframe);

		var isDragging;
		var prevMousePositionX, prevMousePositionY;	

		/* .contents()가 iframe 안에 있는 것들을 말하는 것 같음 
			그래서 아래 드래그 부분에서 console에 this를 출력하면 iframe 안에 있는 #document 가 뜸 
			setTimerData 에서 _this가 이 #document가 들어가서 적용이 안됐던 것 같음
			 _this 가 div를 가르키게 수정 */
		$('#' + display_id + " iframe").contents().on({
		    mousedown: function(e) {
		        isDragging = true;
		        prevMousePositionX = e.pageX;
		        prevMousePositionY = e.pageY;
				var timer = new callbackTimer();
				var vc = new velocityCounter();
				
				console.log("drag start");
				var _this = $('#'+display_id)[0];
				
				timer.setTimerData(display_id,_this,0,vc,"DRAG_MOVE",_INTERVAL);
				timer.TimerStart();
		    },
		    mouseup: function() {
		        isDragging = false;
		        
	 	        console.log("drag stop");
		        callbackTimer.setToggle(display_id,"DRAG_STOP");
		        
		    },
		    mousemove: function(e) {
		    	if(isDragging){
			    	var distance = Math.floor(Math.sqrt(Math.pow(($('#' + display_id).width()/2 - e.pageX), 2) + Math.pow(($('#' + display_id).width()/2 - e.pageY), 2)));

			    	if(distance <= $('#' + display_id).width()/2){
			       		var parentOffset = $('#' + display_id).offset();
			       		var ownerOffset = $('#'+ owner).offset();
			       		var x = e.pageX+parentOffset.left - prevMousePositionX - ownerOffset.left;
			       		var y = e.pageY+parentOffset.top  - prevMousePositionY - ownerOffset.top;
			       		for(var i=0; i<ModuleController.me.length; i++){
			       			ModuleController.me[i].setModulePos(display_id,x,y);
			       			ModuleController.CollisionTest(display_id);
			       		}
		       		}
		        }
		    }
		});

		console.log("init success");
	};


	//---main method start---
	this.getModuleCnt = function() {
		return _Modules.length;
	};

	this.getModule = function(id) {
		for(var i=0;i<_Modules.length;i++) {
			if (_Modules[i].id === id) {
				return _Modules[i];
			}
		}
		return null;
	};

	this.setModulePos = function(id,x,y) {
		$("#" + id).css("left",x);
		$("#" + id).css("top",y);
	}

	this.createModule = function(id) {
		if (this.getModule(id))
			return null;
		var m = new Module();

	    var childdiv = document.createElement('div');
	    var y = 0;
	    var x = 0;
	    var p = document.createElement('p');
	    p.style.height = "100px";
	    p.style.lineHeight = "100px";
	    p.style.textAlign = "center";
	    childdiv.appendChild(p);

	    childdiv.className = 'modules'; 
	    childdiv.setAttribute("id",id);
	    childdiv.setAttribute("data-shape","Circle");
	    childdiv.setAttribute("data-type","zoomin");

	    $("#" + _Owner).append(childdiv);
	    childdiv.style.top = y.toString() + "px";
	    childdiv.style.left = x.toString() + "px";
	    childdiv.style.width = "100px";
	    childdiv.style.height = "100px";
	    //m.id = id;
	   	//m.this = childdiv;
	    m.init(id,childdiv);

	    _Modules.push(m);
    	console.log("ModuleCreate Success");
		return m;
	};

	this.isCreated = function() {
		return "hello world!";
	}

	this.resetIframe = function(owner) {
		//
		_INTERVAL = 10;

		var display_id = owner + "_DisplayCircle";
		var displayframe = document.createElement('iframe');
		var cnt = 0;

		while(1) {
			//console.log(document.getElementById(display_id + cnt));
			if (document.getElementById(display_id + cnt))
				break;
			else
				cnt++;
		}

		display_id += cnt;
		displayframe.id = owner + "_DisplayFrame";
		$('#' + displayframe.id).remove();
		$("#" + display_id).append(displayframe);

		var isDragging;
		var prevMousePositionX, prevMousePositionY;	
		/* .contents()가 iframe 안에 있는 것들을 말하는 것 같음 
			그래서 아래 드래그 부분에서 console에 this를 출력하면 iframe 안에 있는 #document 가 뜸 
			setTimerData 에서 _this가 이 #document가 들어가서 적용이 안됐던 것 같음
			 _this 가 div를 가르키게 수정 */
		$('#' + display_id + " iframe").contents().on({
		    mousedown: function(e) {
		        isDragging = true;
		        prevMousePositionX = e.pageX;
		        prevMousePositionY = e.pageY;
				var timer = new callbackTimer();
				var vc = new velocityCounter();
				
				console.log("drag start");
				var _this = $('#'+display_id)[0];
				
				timer.setTimerData(display_id,_this,0,vc,"DRAG_MOVE",_INTERVAL);
				timer.TimerStart();
		    },
		    mouseup: function() {
		        isDragging = false;
		        
	 	        console.log("drag stop");
		        callbackTimer.setToggle(display_id,"DRAG_STOP");
		        
		    },
		    mousemove: function(e) {
		    	if(isDragging){
			    	var distance = Math.floor(Math.sqrt(Math.pow(($('#' + display_id).width()/2 - e.pageX), 2) + Math.pow(($('#' + display_id).width()/2 - e.pageY), 2)));

			    	if(distance <= $('#' + display_id).width()/2){
			       		var parentOffset = $('#' + display_id).offset();
			       		var ownerOffset = $('#'+ owner).offset();
			       		var x = e.pageX+parentOffset.left - prevMousePositionX - ownerOffset.left;
			       		var y = e.pageY+parentOffset.top  - prevMousePositionY - ownerOffset.top;
			       		for(var i=0; i<ModuleController.me.length; i++){
			       			ModuleController.me[i].setModulePos(display_id,x,y);
			       			ModuleController.CollisionTest(display_id);
			       		}
		       		}
		        }
		    }
		});
	}
}

$(document).ready(function() { 
	/*
var childdiv2 = document.createElement("div");
childdiv2.innerHTML = "etstsdfdsfdsfs";
alert(childdiv2.innerHTML);
document.body.appendChild(childdiv2);
*/


/*
var test = new ModuleController();
    test.init("testmain",null);
for (var i =0;i<12;i++) {
	
	test.createModule("testmodule" + i);
	test.setModulePos("testmodule" + i,500 + 200 * Math.cos((360 * i / 12 ) * Math.PI / 180 ),200 + 200 * Math.sin((360 / 12 * i) * Math.PI / 180));	
	
	

}
*/
//console.log(test.getModuleCnt());
//var test2 = new ModuleController();
//test.init("testdiv",null);

});
