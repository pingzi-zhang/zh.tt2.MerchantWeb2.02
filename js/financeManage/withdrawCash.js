/**
 * Created by 11 on 2016/12/6.
 * 
 */
$(function () {
	window.parent.document.title=document.title;
    var dd =  $(".dl-horizontal>dd");
    dd.eq(0).html(localStorage.getItem("Name"));
    dd.eq(1).html(localStorage.getItem("Account"));
    dd.eq(2).html(localStorage.getItem("Bank"));
    $("dd>p>span").html("￥" + localStorage.getItem("Balance"));
	$("#money,#psw").on("blur",function () {
        validate($(this));
  })
	var money = parseInt(localStorage.getItem("Balance"));
	var $money = $("#money");
	$money.blur(function(){
		var value = $money.val();
        var reg = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
        if(reg.test(value)){
        	if(parseInt(value) > parseInt(money)){
        		$(this).next().show();
        		$(this).focus();
        		$(this).next().html("余额不足");
        	}else{
        		$(this).next().hide();
        	}
        }else{
        	$(this).next().show();
    		$(this).focus();
    		$(this).next().html("输入格式不正确");
        }
	});
	
	var psw = $("#psw");
	psw.blur(function(){
		if($(".password").val() != ""){
            count++;
            InitList();
            $(this).focus();
            $(".manage-tit2").css("display","none");
        }else{
            $(".manage-tit2").css("display","inline-block");
        }
	});
	
    $(".cancel-btn").click(function(){
        window.location.href = "withdrawList.html";
    });

    var userMess = JSON.parse(sessionStorage.userInfo);
    var userAccount = JSON.parse(sessionStorage.userAccount);

    var count = 0;
    var i = 5;
    //请求数据
    function InitList() {
        //参数输入
        var arrActionParam = {
            "MerchantID": userMess.MerchantID,
            "Mobile":userAccount.username,
            "Password":$(".password").val(),
            "Amount":parseFloat($money.val()).toFixed(2)
        };
        console.log("传入后台的参数",arrActionParam);
        var strActionName = "Fin_AddMerCash";
        var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);
        var datSubmit = {strRequest: strRequest};
        $.ajax({
            url: jsgDataUrl+jsgDataGate,
            type: "POST",
            dataType: "json",
            //cache: true,
            data: datSubmit,
            async: true,
            timeout: ajaxTimeout,
            beforeSend: function () {
            },
            success: function (objResult, textStatus) {
                if(objResult.Result == 1){
                    $(".save-btn").click(function () {
                        window.location.href = "drawSuccess.html";
                    });
                    $(".manage-tit1").css("display","none");
                }else{
                    $(".point-manage>span").html(i);
                    $(".manage-tit1").css("display","inline-block");
                    $(".password").val("");
                    i--;
                    if(i < 0){
                        $(".password").attr("disabled","disabled");
                    }
                    //alert(objResult.Message);
                }

            },
            complete : function(XMLHttpRequest,status){
				if(status=='timeout'){
		　　　　　  alert("请求超时");
		　　　　}
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                /*alert(XMLHttpRequest.status);
                 alert(XMLHttpRequest.readyState);
                 alert(textStatus);*/
            }
        });
    }
});