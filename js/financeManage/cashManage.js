/**
 * Created by 11 on 2016/12/6.
 */
$(function () {
	window.parent.document.title=document.title;
	var userMess = JSON.parse(sessionStorage.userInfo);
	var userAccount = JSON.parse(sessionStorage.userAccount);
    var dd =  $(".dl-horizontal>dd");
    dd.eq(0).html(localStorage.getItem("Name"));
    dd.eq(1).html(localStorage.getItem("Account"));
    dd.eq(2).html(localStorage.getItem("Bank"));
    dd.eq(3).html("￥"+localStorage.getItem("Cash"));

    $(".cancel-btn").click(function(){
        window.location.href = "withdrawList.html";
    });
    var count = 0;
    var i = 5;
    $(".save-btn").click(function(){
        if($(".password").val() != ""){
            count++;
            InitList();
            $(".manage-tit2").css("display","none");
        }else{
            $(".manage-tit2").css("display","block");
        }
    });
    //请求数据
    function InitList() {
        //参数输入
        var arrActionParam = {
            "MerchantID": userMess.MerchantID,
            "Mobile":userAccount.username,
            "Password":$(".password").val(),
            "Amount":100
        };
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
                    window.location.href = "drawSuccess.html";
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
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
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