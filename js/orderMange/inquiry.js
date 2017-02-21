/**
 * Created by 11 on 2016/11/30.
 */
$(function () { 
	window.parent.document.title=document.title;
	var userMess = JSON.parse(sessionStorage.userInfo);
    //点击查询时移出表单,创造新的表单元素
    $("#search-btn").click(function(){
    	$(this).val("正在查询");
    	$(this).attr("disabled",true)
        $("dt").remove();
        $("dd").remove();
        InitList();
    });
    InitList();
    //请求数据
    function InitList() {
        //消费码从本地存储或input输入获得
        var consume = $(".search-number").val() || localStorage.getItem("Consume");
        //参数输入
        var arrActionParam = {
            "Consume":consume,
            "MerchantID": userMess.MerchantID
        };
        var strActionName = "Order_GetInfobyConsume";
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
            	$(".manage-btn").css("display","none");
            	$("#loadImg").css("display","block");
            },
            success: function (objResult, textStatus) {
            	$("#loadImg").css("display","none");
            	$(".manage-btn").css("display","block");
            	$("#search-btn").val("查询");
            	$("#search-btn").attr("disabled",false);
                //将消费码传入input中
                $(".search-number").attr("value", consume);
                if(objResult.Result == 1){
                    var Model = objResult.Model;
                    localStorage.setItem("Status",Model.StatusName);

                    //创建表单,渲染页面
                    if(Model.OrderID){
                        var dl = $("dl");
                        var status = Model.Status;
                        switch (status){
				            case 1:
				                status="已付款";
				                break;
				            case 3:
				                status="已消费";
				                break;
				            case 9:
				                status="已完成";
				                break;
				            case -1:
				                status="已取消";
				                break;
				            case -3:
				                status="已退订";
				                break;
				            case -10:
				                status="已关闭";
				                break;
				        }
                        var str = '';
                        str += "<dt>"+ "订单号：" + "<dd>" + Model.OrderID + "</dd>" + "</dt>";
                        str += "<dt>"+ "产品名称：" + "<dd>" + Model.Name + "</dd>" + "</dt>";
                        str += "<dt>"+ "产品分类：" + "<dd>" + Model.VarietyName + "</dd>" + "</dt>";
                        str += "<dt>"+ "状态：" + "<dd>" + status + "</dd>" + "</dt>";
                        str += "<dt>"+ "单价：" + "<dd>" + Model.Sell + "</dd>" + "</dt>";
                        str += "<dt>"+ "数量：" + "<dd>" + Model.Quantity + "</dd>" + "</dt>";
                        str += "<dt>"+ "金额：" + "<dd>" + (Model.Sell * Model.Quantity)+ "</dd>" + "</dt>";
                        //str += '<dd><input type="button" value="消费" class="manage-btn" id="inquiry-btn"/></dd>';
                        dl.prepend(str);
                        $(".manage-btn").css("display","block");
                        $(".none-cont").css("display","none");
                        if(status != "已付款"){
                        	$("#inquiry-btn").val("返回");
                        }
                    }else{
                        $(".manage-btn").css("display","none");
                        $(".none-cont").css("display","block");
                        //alert("未查找到此信息");
                    }
                }else{
                    alert(objResult.Message);
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
//代码修改
    var inquiryBtn = $("#inquiry-btn");
    inquiryBtn.click(function(){
        if(inquiryBtn.val() == "消费"){
            ConsumeText();
        }else if(inquiryBtn.val() == "返回"){
            window.location.href = "orderlist.html";
        }
    });
//
    function ConsumeText() {
        var consume = localStorage.getItem("Consume");
        var arrActionParam = {
            "Consume":consume,
            "WaiterID":userMess.WaiterID,
            "MerchantID":userMess.MerchantID
        };
        console.log("传入的参数",arrActionParam);
        var strActionName = "Order_CheckConsume";
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
            	/*console.log("消费结果",objResult);*/
                $("#id").attr("value", consume);
                if(objResult.Result == 1){
                	$(".manage-btn").val("返回");
                    $(".manage-consume").css("display","block");
                }
            },
            complete : function(XMLHttpRequest,status){
				if(status=='timeout'){
		　　　　　  alert("请求超时");
		　　　　}
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //alert(XMLHttpRequest.status);
                //alert(XMLHttpRequest.readyState);
                //alert(textStatus);
            }
        });
    }
});