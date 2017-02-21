$(function(){
    //手机验证
    var flag1 = 0;
    var flag2 = 0;
    var flag3 = 0;
    var flag4 = 0;
    var a = 0;
    $("#busPhone").blur(function () {
        var re=/^1[3|4|5|7|8]\d{9}$/;
//      console.log($(this).val().length);
        if($(this).val().length > 0){
            $(".help-tit").eq(0).css("display","none").html("");
            if(!re.test($(this).val().trim())){
                $(this).next().css('display', 'inline-block').html("手机格式不正确");
                $(this).focus();
            }else{
                   $(this).next().css('display', 'none').html("");
//      		   $(".warning").eq(1).css("display", "none").html("");
        		   flag1 = 1;
            }
        }else if($(this).val().length <= 0) {
//          console.log("p");
            $(this).focus();
            $(this).next().css('display', 'none').html("");
//          $(".warning").eq(1).css("display", "none").html("");
            $(".help-tit").eq(0).css("display", "inline-block").html("账号必须填写");
        }
    });
    $("#busPhone").keydown(function(){
    	$(".Info-Pw").val("");
    	$(".active").text("获取验证码");
    	clearInterval(a);
    	$("#new1").val("");
    	$("#new2").val("");
    	$("#new1").next().css('display', 'none');
    	$("#new2").next().css('display', 'none');
    	flag2 = 0;
    	flag3 = 0;
    	flag4 = 0;
    });
    $(".Info-Pw").blur(function(){
    	if(flag2 == 1){
    		flag2 = 1;
    	}else{
    		flag2 = 0;
    	}
    })
    function yzm(){
    	var phonecode = $("#busPhone").val();
    	var strActionName="Public_SendResetSms";
        var arrActionParam = {
            "Mobile": phonecode
        };
        var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);
        var datSubmit = { strRequest: strRequest };

        $.ajax({
            url: jsgDataUrl+jsgDataGate,
            type: 'post',
            dataType: 'json',
            data: datSubmit,
            async: true,
            timeout: ajaxTimeout,
            beforeSend: function () {
            },
            success: function  (objResult,textStatus) {           	
                if(objResult.Result == 1){
//                  $(".active").text("发送成功！");
                    flag2 = 1;
                }else{
//                    alert("请输入手机号码");
                }
            },
            error: function  () {
            }
        });
    }
    function bgd(){
    	if($("#busPhone").val()!=""){
	    	yzm();
	        var t=120;
			a=setInterval(daojishi,1000);//1000毫秒
			$(".active").off("click");
			function daojishi(){
			    t--;
				$(".active").text(t+"秒后可重新发送");
			//刷新时间显示
			    if(t==0){
			        clearInterval(a);//倒计时结束
					$(".active").text("获取验证码");
					$(".active").on("click",function(){
    					bgd();
    				})
			    }
			}
		}else{
			alert("请输入手机号码");
		}
    }
    $(".active").on("click",function(){
    	bgd();
    })
    $("#submit").click(function() {
    	if(flag1 ==1&&flag2==1&&flag3 ==1&&flag4==1){
		var	new1 = $("#new1").val();
        var new2 = $("#new2").val();
        var new3 = 0;
        var yzm = $(".Info-Pw").val();
        var pcd = $("#busPhone").val();
        if(new1 == new2){
        	new3 = new2
        }
//		console.log(1);
        var strActionName="Mer_ResetPassWord";
        var arrActionParam = {
            "Mobile": pcd,
			"Code": yzm,
			"Password": new3
        };
        var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);
        var datSubmit = { strRequest: strRequest };

        $.ajax({
            url: jsgDataUrl+jsgDataGate,
            type: 'post',
            dataType: 'json',
            data: datSubmit,
            timeout: ajaxTimeout,
            async: false,
            beforeSend: function () {
            },
            success: function  (objResult,textStatus) {
                if(objResult.Result == 1){
                   window.location.href="rePswSuccess.html";
                }else{
                    alert(objResult.Message);
                }
            },
            error: function  () {
            }
        })
        }else{
        	$("#tip").css("display","inline-block");
        }
    });
    //新密码验证
    $("#new1").blur(function () {
        var re=/[A-Za-z0-9]{6,20}/;
		var passWord = $("#new1").val();
		if(passWord == "" || passWord == null){
            $(this).next().css('display', 'inline-block').html("<s></s>新密码不能为空！");
            $(this).focus();
            flag3 = 0;
		}else if(!re.test(passWord)){
            $(this).next().css('display', 'inline-block').html("<s></s>密码格式不对");
//          $(".warning").css('display', 'inline-block');
            $(this).focus();
            flag3 = 0;
		}else{
            $(".warning").css('display', 'none');
            flag3 = 1;
            $(this).next().css('display', 'inline-block').html("<s></s>新密码输入正确！");
		}
	});
	$("#new2").blur(function () {
        var re=/^(?![a-z]+$)(?![A-Z]+$)(?!\d+$)[a-zA-Z0-9]{3,}$/;
		var passWord = $("#new1").val();
		var passWord1 = $("#new2").val();
		if(passWord != passWord1){
//			alert("您两次输入的密码不一致！");
			$(this).next().css('display', 'inline-block').html("<s></s>两次密码不一致！");
            $(this).focus();
            flag4 = 0;
		}else if(passWord !=""&&passWord == passWord1){
			flag4 = 1;
			$(this).next().css('display', 'inline-block').html("<s></s>输入密码一致！");
		}
	})
	$("#new1").keydown(function(){
		$("#new2").val("");
		flag4 = 0;
		$("#new1").next().css('display', 'none');
    	$("#new2").next().css('display', 'none');
	})
	$("#new2").keydown(function(){
    	$("#new2").next().css('display', 'none');
	})
})