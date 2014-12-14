<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Do it Yourself!</title>
    <link rel="stylesheet" type="text/css" href="css/animations.css" />
    <link rel="stylesheet" type="text/css" href="css/component.css" />
    
    <script type="text/javascript" src="transitionJS/modernizr.custom.js"></script>

    <link rel="stylesheet" type="text/css" href="moduletest/module.css"/>
    <link rel="stylesheet" type="text/css" href="css/loginPage.css"/>
    <link rel="stylesheet" type="text/css" href="css/mainPage.css"/>
    
    <script type="text/javascript" src="scripts/jquery-1.11.0.min.js"></script>
    <script type="text/javascript" src="scripts/jquery.connectingLine.js"></script>
    <script type="text/javascript" src="scripts/jquery-ui-1.10.4.custom.min.js"></script>
    <script type="text/javascript" src = "scripts/Search.js"></script>

    <script src="https://apis.google.com/js/client:platform.js" async defer></script>
    <link href="//fonts.googleapis.com/css?family=Amaranth:400italic,400,70\
		0italic,700" rel="stylesheet" type="text/css">                     
    <!-- change -->

    <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css"> 
    <script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
    <!--<script src='http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js'></script>-->
    <link rel="stylesheet" type="text/css" href="test.css"/>
	

  </head>
  <body>

    <!-- 큐브회전에 사용된 페이지1, 페이지2가 각각 div형태로 아래 pt-page-1(스타트화면), pt-page-2(메인프레임) -->
    <div id="pt-main" class="pt-perspective">
      <div class="pt-page pt-page-1 mainpage">
	<div id="iterateEffects" class="login-page sign_in circle" data-type="zoomin" data-shape="Circle">
	  Sign in
	</div>
	
	<div class="login-page usage circle" data-type="zoomin" data-shape="Circle">
	  Usage
	</div>
	
	<div class="login-page credit circle" data-type="zoomin" data-shape="Circle">
	  Credit
	</div>

	<!-- 페이지1(스타트화면) 내 모달 -->
	<div class="overlay-container">
	  <div class="window-container zoomin">
	    <div class="login_modal">
	      <span id="signinButton">
			<span
			   class="g-signin"
			   data-callback="signinCallback"
			   data-clientid="113389404643-f6s9uiqiiho83f2pbv97fg98jgdngo95.apps.googleusercontent.com"
			   data-cookiepolicy="single_host_origin"
			   data-requestvisibleactions="http://schema.org/AddAction"
			   data-scope="https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile">
			</span>
	      </span>
	      <span class="close">Close Me</span>
	    </div>
	    <div class="usage_modal">
	      <p>Usage</p>
	      <span class="close">Close Me</span>
	    </div>

	    <div class="credit_modal">
	      <p>Credit</p>
	      <p>2012037506 황교준</p>
	      <span class="close">Close Me</span>
	    </div>
	  </div>
	</div>	
      </div>


    <div class="pt-page pt-page-2 mainpage" id="testmain">
    <div><p id="loginStatus" style="margin-left: 50pt">welcome!</p></div>
	<!-- Side 메뉴 -->
	<span id = "menubutton" class="entypo-menu"></span>

        <!-- Side Bar 내부 -->
        <div class="menu closed">
          <header>
            <p>Module list</p> <span id = "close" class="entypo-cancel"></span>
            <button id = "delete" class="menu_button">Delete</button>
	    <button type="button" class="menu_button" data-toggle="modal" data-target="#search_modal">Search</button>
            <!-- <button id = "search" class="menu_button">Search</button> --><br />
            <button id = "confirm" class="menu_button">Confirm</button>
            <button id = "cancel" class="menu_button">Cancel</button>

          </header>

<!--hari-->
          <ul id ="module_list"> 
          </ul>
        </div>

	<!-- Main -->
<!--
	<div class="overlay-container">
	  <div class="window-container zoomin">
	    <iframe id="modal_iframe"></iframe>
	    <span class="close">Close Me</span>	  
	  </div>
	</div>	
-->
      </div>
    </div>
    <!-- 페이지1(스타트페이지)의 드래그 기능 위한 JS -->
    <script type="text/javascript" src="scripts/dom.jsPlumb-1.6.4-min.js"></script>
    <script type="text/javascript" src="moduletest/module.js"></script>
    
    <script type="text/javascript" src="scripts/loginPage.js"></script>
    <script type="text/javascript" src="scripts/mainPage.js"></script>

    <!-- 페이지 트랜지션(큐브회전) 위한 JS -->
<!--    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script> -->
    <script type="text/javascript" src="transitionJS/jquery.dlmenu.js"></script>
    <script type="text/javascript" src="transitionJS/pagetransitions.js"></script>
    <!-- google+ API asynchronous loading. . . -->
    <script type="text/javascript">
      (function() {
      var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
      po.src = 'https://apis.google.com/js/client:plusone.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
      })();
    </script>

    <button id="lock">Save</button>
    <button id="upload1">upload</button>
    <button id="resetIframe">Reset Iframe</button>
	



    <!-- <div id="search_modal" title="search_modal"> -->
    <!--   <h3>찾고자 하는 모듈의 이름을 입력하세요.</h3> -->
      
    <!--   <input type="text" id="q" name="q" /> -->
    <!--   <button id="find">Submit</button> -->
      
    <!--   <ol id = "modulelist"> -->
	
    <!--   </ol> -->
    <!--   <button>confirm</button> -->

    <!-- </div> -->



  </body>

    <div class="modal fade" id="search_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
	<div class="modal-content">
	  <div class="modal-header">
            <h4 class="modal-title">모듈찾기</h4>
	  </div>
	  <div class="modal-body">
	    <h3>찾고자 하는 모듈의 이름을 입력하세요.</h3>
	    
	    <input type="text" id="q" name="q" />
	    <button id="find">Submit</button>
	    
	    <ul id="modulelist">
	      
	    </ul>
	  </div>
	  <div class="modal-footer">
            <button id="search_modal_close" type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button id="search_modal_confirm" type="button" class="btn btn-primary">Save changes</button>
	  </div>
	</div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->




</html>

