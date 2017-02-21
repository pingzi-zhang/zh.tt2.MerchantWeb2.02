/**
 * Created by 11 on 2016/11/29.
 */
$(function () { 
	window.parent.document.title=document.title;
    var pageIndex = 0;
    var pageSize = 5;
	var userMess = JSON.parse(sessionStorage.userInfo);
	if(sessionStorage.orderType){
		var orderType = sessionStorage.orderType;
	}else{
		var orderType = "美食";
	}
	switch(orderType){
    	case "门票":
    		orderType = "01";
    		break;
    	case "特产":
    		orderType = "02";
    		break;
    	case "美食":
    		orderType = "08";
    		break;
    }
//代码修改区域
    var maxentries; //总条目数
	var arrActionParam = {
        /*"MerchantID": userMess.MerchantID,            //商家编码
        "Status": -99,                       //状态
        "Orderform": "",                   //订单号
        "Linkman": "",                     //联系人
        "Start": "",               //开始时间
        "End": "",                 //结束时间
        "Skip":pageIndex*pageSize,
        "Take":pageSize*/
       	"MerchantID": userMess.MerchantID,
       	"Skip":pageIndex*pageSize,
       	"Take":pageSize,
       	"VarietyID":orderType
 };
    var strActionName = "Order_GetFoodbyOrderPage";
    var strActionParam = JSON.stringify(arrActionParam);
    var strRequest = GetVisitData(strActionName, strActionParam);
    var datSubmit = {strRequest: strRequest};
    $.ajax({
        url: jsgDataUrl+jsgDataGate,
        type: "POST",
        dataType: "json",
        //cache: true,
        data: datSubmit,
        async: false,
        timeout: ajaxTimeout,
        beforeSend: function () {
        	$("#loadImg").css("display","block");
        },
        success: function (objResult, textStatus) {
        	maxentries = objResult.Totel;
        }
    });
    $(function () {
        $(".pagination").pagination(maxentries, {
            callback: PageCallback,
            prev_text: '上一页',
            next_text: '下一页',
            items_per_page: pageSize,//每页显示的条目数
            num_display_entries: 10,//连续分页主体部分分页条目数
            current_page: pageIndex,//当前页索引
            num_edge_entries: 1//两侧首尾分页条目数
        });
        //翻页调用
        function PageCallback(index, jq) {
            InitList(index);
        }
        //请求数据
        function InitList(pageIndex) {
            var arrActionParam = {
                "MerchantID": userMess.MerchantID,
		       	"Skip":pageIndex*pageSize,
		       	"Take":pageSize,
		       	"VarietyID":orderType
            };
            /*console.log("传入后台的参数",arrActionParam);*/
            var strActionName = "Order_GetFoodbyOrderPage";
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
                	$("#loadImg").css("display","none");
                    if(objResult.Result == 1){
                        var lists = objResult.List;
                        var total = objResult.Totel;
                        //判断是否有消费记录
                        if(lists.length <= 0){
                            $(".none-tit").css("display","block");
                            $(".page").css("display","none");
                        }else{
                            $(".page").css("display","block");
                            $(".none-tit").css("display","none");
                            $(".search-number").removeAttr("disabled");
                            //页面列表的渲染功能
                            var html = template("template", {items: lists});
                            $(".table tbody").html(html);
                        }
                        //列表总数
                        $(".count>span").html(total);

                    }else{
                    	console.log("错误的提示",objResult);
                        alert(objResult.Message);
                    }
                },
                complete : function(XMLHttpRequest,status){
					if(status=='timeout'){
			　　　　　  alert("请求超时");
			　　　　}
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.status);
                    alert(XMLHttpRequest.readyState);
                    alert(textStatus);
                },
				complete:function (XMLHttpRequest, textStatus){
					if(textStatus == "success"){
						
					}
				}
            });
        }
    })
     //输入消费码跳转到另一界面
        $("#search-btn").click(function () {
        	$("form>p").css("display","none");
        	var consume = $(".search-number").val().trim();
        	if(consume){
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
		            },
		            success: function (objResult, textStatus) {
		            	if(objResult.Model.Amount){
		            		localStorage.setItem("Consume", consume);
		            		window.location.href = "inquiry.html";
		            	}else{
		            		$("form>p").html("消费码不存在,请重新输入");
		            		$("form>p").css("display","block");
		            	}
		            }
	        	});
        	}else{
        		$("form>p").html("请输入消费码");
        		$("form>p").css("display","block");
        	}
    	})
});