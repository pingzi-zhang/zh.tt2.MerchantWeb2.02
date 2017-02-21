$(function () {
    if (!!localStorage.mercAccout) {
        var accout=JSON.parse(localStorage.mercAccout);
        $("input[name='username']").val(accout.username);
        $("input[name='password']").val(accout.pwd);
    }

    $(".remember_pwd .select,span").click(function () {
        $(".remember_pwd img").toggleClass("hidden")
    })
    
    //表单验证
     $("input[name='username']").blur(function () {
        var re=/^1[3|4|5|7|8]\d{9}$/;
        if ($(this).val().trim()=="") {
            $(".user_name span").css("display","block").text("* 请输入手机号");
            $(this).focus();
            return false;
        }else if(!re.test($(this).val().trim())) {
            $(".user_name span").css("display","block").text("* 您输入的手机格式有误,请重新输入");
            $(this).focus();
            return false;
        } else {
            $(".user_name span").css("display","none");
            return false;
        }
    })
     
    $("input[name='password']").blur(function () {
        if ($(this).val().trim()=="") {
            $(".password span").css("display","block");
            $(this).focus();
            return false;
        }else {
            $(".password span").css("display","none");
            return false;
        }
    })


    //设置cookie限制地址栏登录
    function setCookie(c_name,value,expiremin) {
        var exdate=new Date()
        exdate.setMinutes(exdate.getMinutes()+expiremin)
        document.cookie=c_name+ "=" +escape(value)+";expires="+exdate.toGMTString()
    }

    $(".login_btn").on('click',function () {
        var tel= $("input[name=username]").val();
        var pwd= $("input[name=password]").val();
        //改变登录按钮状态
        /*$(".login_btn").attr('disabled','true');*/
       if(tel && pwd){
       	 $(".login_btn").text('正在登录,请稍后...');
       }else{
       	if(!tel){
       		$(".user_name span").css("display","block").text("* 请输入手机号");
       		$("input[name=username]").focus();
       	}else{
       		$(".password span").css("display","block").text("* 请输入密码");
       		$("input[name=password]").focus();
       	}
       }
        //记住密码
        var accout={
            username:tel,
            pwd:pwd
        };
        if (!$(".remember_pwd img").hasClass("hidden")) {
            localStorage.mercAccout=JSON.stringify(accout);
        }else {
            localStorage.clear();
        }

        var strActionName="Mer_WaiterLogin";
        var arrActionParam = { "Mobile": tel, "Password": pwd};
        var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);
        var datSubmit = { strRequest: strRequest };
        //登录的ajax请求
        $.ajax({
            url:jsgDataUrl+jsgDataGate,
            type:'post',
            data:datSubmit,
            timeout : ajaxTimeout,
            dataType:'json',
            success:function (re) {
                if (re.Result == 1) {
                	sessionStorage.userAccount = JSON.stringify(accout);
                    sessionStorage.userInfo = JSON.stringify(re.Model);
                    window.location.href = '../html/nav.html';
                } else {
                	if(re.Message == "账户错误或者未添加!"){
                		$(".login_btn").text('登录');
                		$(".user_name span").css("display","block").text("* 账户不存在");
            			$(this).focus();
            			$(".password input").val("");
                	}else if(re.Message == "密码错误!"){
                		$(".login_btn").text('登录');
                		$(".password input").focus().val("");
                		$(".password span").css("display","block").text("*您输入的密码有误");
                	}else{
                		alert(re.Message);
                	}
                }
            },
            error:function (jqXHR, textStatus, errorThrown) {
            	alert(jqXHR);
            	alert(textStatus);
            	alert(errorThrown);
                $(".login_btn").removeAttr("disabled");
                $(".login_btn").text("登录");
                // console.log(3);
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){
		　　　　　  alert("请求超时");
		　　　　}
		　　}
        });
    })
})







































