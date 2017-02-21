$(function () {
	window.parent.document.title=document.title;                    
	var userMess = JSON.parse(sessionStorage.userInfo);
	var pageIndex = 0;
    var pageSize = 9;
    var proID = null;
    var current;
    var maxentries;
	var arrActionParam = {
        "MerchantID":userMess.MerchantID,
        "Skip":pageIndex*pageSize,
        "Take":pageSize
   };
    var strActionName="Order_GetNativeGoodsPage";
    var strActionParam = JSON.stringify(arrActionParam);
    var strRequest = GetVisitData(strActionName, strActionParam);
    var datSubmit = { strRequest: strRequest };
	$.ajax({
		url: jsgDataUrl+jsgDataGate,
		type: "POST",
		dataType: "json",
		timeout : ajaxTimeout,
		//cache: true,
		data: datSubmit,
		async: false,
		beforeSend: function () {
			 $("#loadImg").css("display","block");       	
		},
		success: function (objResult,textStatus) {
			maxentries = objResult.Totel;
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {   
            alert(XMLHttpRequest.readyState);
            alert(textStatus);
        } 
	});
    
    $(function() {
        $(".pagination").pagination(maxentries, {
            callback: PageCallback,
            prev_text: '上一页',
            next_text: '下一页',
            items_per_page: pageSize,//每页显示的条目数
            num_display_entries:9,//连续分页主体部分分页条目数
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
			        "MerchantID":userMess.MerchantID,
			        "Skip":pageIndex*pageSize,
			        "Take":pageSize
			    };
			    var strActionName="Order_GetNativeGoodsPage";
			    var strActionParam = JSON.stringify(arrActionParam);
			    var strRequest = GetVisitData(strActionName, strActionParam);
			    var datSubmit = { strRequest: strRequest };
			    $.ajax({
			        url: jsgDataUrl+jsgDataGate,
			        type: "POST",
			        dataType: "json",
			        timeout : ajaxTimeout,
			        data: datSubmit,
			        async: true,
			        beforeSend: function () {
			        },
			        success: function (objResult,textStatus) {
			        	$("#loadImg").css("display","none");
						if (objResult.Result=="1"){
		                    if(objResult.List.length > 0){
		                    	var lists=objResult.List;
								var tao = objResult.Totel;
				            	//渲染页面
				            	var html = template("template", {items: lists});
	                            $(".table tbody").html(html);
				            	$("#totalR").html(maxentries);
				            	//操作绑定的事件
				            	handle();
		                    }else{
		                    	$(".page").css("display","none");
                            	$(".content").css("display","block");
		                    }
		                }else if(objResult.Result=="-99"){
		                    alert("输入信息不完整");
		                }
			        },
			        complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
				　　　　if(status=='timeout'){
				　　　　　  alert("请求超时");
				　　　　}
				　　},
			        error: function (XMLHttpRequest, textStatus, errorThrown) {
			         
			            // alert(XMLHttpRequest.readyState);
			            // alert(textStatus);
			        } 
			       });
			  }
        })
	    //操作的事件
    	function handle(){
    		//状态的tr
            var tdStatus = $(".table tbody tr td:nth-of-type(11)");
           for(var i = 0; i < tdStatus.length;i++){
           		var opt = tdStatus.eq(i).next().find("a");
       			if(tdStatus.eq(i).text()==""){
       				opt.html("填写运单号");
       			}else{
       				opt.html("确认到达");
       			}
           }
            $(".operBtn").on("click",function(){
            	current = $(this);
	    		var orderNO = null;
	    		if($(this).html()=="填写运单号"){
	    			$('#Modal').modal('show');
	    			//当前的订单号
	    			orderNO = $(this).parent().attr("data");
	    			$("#Modal").attr("data",orderNO);
	    			$("#Modal").attr("goodsID",$(this).parent().attr("goodsID"));
	    		}else{
	    			$('#myModal').modal('show');
	    			//当前的订单号
	    			orderNO = $(this).parent().attr("data");
	    			$("#myModal").attr("data",orderNO);
	    			$("#myModal").attr("goodsID",$(this).parent().attr("goodsID"));
	    		}
	    	});
    	}
    //确认发货的弹出层(确认收货的按钮)填写运单号
    $("#auditBtn").click(function(){
    	//下架的ajax请求
    	var orderID = $("#myModal").attr("data");
		var strActionName="Order_CheckConsume";
        var arrActionParam = {
		     "Consume":orderID,
			 "WaiterID":userMess.WaiterID,
			 "MerchantID":userMess.MerchantID,
		    }; 
		    console.log("传入后台的参数",arrActionParam);
       	var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);
        var datSubmit = { strRequest: strRequest };
        $.ajax({
            url: jsgDataUrl+jsgDataGate,
            type: "POST",
            dataType: "json",
            data: datSubmit,
            async: true,
            timeout : ajaxTimeout,
            success: function (objResult,textStatus) {
                if (objResult.Result=="1"){
                	$('#myModal').modal('hide');
                    current.parent().parent().find("td").eq(9).html("已收货");
                    current.remove();
                }else if(objResult.Result=="-99"){
                    alert("输入信息不完整");
                }
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){
		　　　　　  alert("请求超时");
		　　　　}
		　　}
       });
    });
    //设置快递公司/运单号
    $("#submitBtn").click(function(){
    	//快递公司
    	var company = $("#company").val();
    	if(company==""){
    		$("#express").css("display","inline-block");
    		$("#express").html("快递公司必须填写");
    		$("#company").focus();
    		return false;
    	}
    	var waybill = $("#waybill").val();
    	if(waybill==""){
    		$("#express").css("display","inline-block");
    		$("#express").html("快递单号必须填写");
    		return false;
    	}
    	var orderID = $("#Modal").attr("goodsID");
     	var compbill = company.trim()+waybill.trim();
        var arrActionParam = {
           "GoodsID":orderID,
			Waybill: compbill,
			WayPeople: userMess.WaiterID
        };
        /*console.log("传入后台的参数",arrActionParam);*/
        var strActionName="Order_UpdateWaybill";
        var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);
        var datSubmit = { strRequest: strRequest };
        $.ajax({
            url: jsgDataUrl+jsgDataGate,
            type: "POST",
            dataType: "json",
            data: datSubmit,
            async: true,
            beforeSend: function () {
            },
            success: function (objResult,textStatus) {
                if (objResult.Result=="1"){
                    $('#Modal').modal('hide');
                    current.parent().parent().find("td").eq(9).html("已发货");
                    current.html("确认到达");
                }else {
                    alert(objResult.Message);
                }
            },
            complete: function (XMLHttpRequest, textStatus) {

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // alert(XMLHttpRequest.status);
                // alert(XMLHttpRequest.readyState);
                // alert(textStatus);
            }
        });

    })
})