$(function () {
	window.parent.document.title=document.title;
	var userMess = JSON.parse(sessionStorage.userInfo);
	var pageIndex = 0;
    var pageSize = 5;
    var proID = null;
    var current;
    var maxentries;
	var arrActionParam = {
        "MerchantID":userMess.MerchantID,
        "Code":"",
        "ProductName":"",
        "Status":"-99",
        "Skip":pageIndex*pageSize,
        "Take":pageSize
   };
    var strActionName="Product_GetScenicProductPage";
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
		}
	});
    
    $(function() {
        $(".pagination").pagination(maxentries, {
            callback: PageCallback,
            prev_text: '上一页',
            next_text: '下一页',
            items_per_page: pageSize,//每页显示的条目数
            num_display_entries:5,//连续分页主体部分分页条目数
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
			        "Code":"",
			        "ProductName":"",
			        "Status":"-99",
			        "Skip":pageIndex*pageSize,
			        "Take":pageSize
			    };
			    var strActionName="Product_GetScenicProductPage";
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
								var tao = objResult.Total;
								for(var i=0,len = lists.length;i<len;i++){
							       var temp = lists[i].First;
									lists[i].First = temp.substring(temp.lastIndexOf("http"));
								}
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
            var tdStatus = $(".table tbody tr td:nth-of-type(6)");
           for(var i = 0; i < tdStatus.length;i++){
       			var look = document.createElement("a");
       			look.innerHTML = "查看";
       			$(look).addClass("orenge");
       			$(look).on("click",function(){
       				var _index = $(this).parent().attr("data");
       				window.location.href = "viewTicket.html?index="+_index+"";
       			});
       			var opertd = tdStatus.eq(i).next().next();
       			opertd.append(look);
           		if(tdStatus.eq(i).html()=="未提交" || tdStatus.eq(i).html()=="已下架" || tdStatus.eq(i).html()=="未通过"){
           			var edit = document.createElement("a");
           			edit.innerHTML = "修改";
           			$(edit).addClass("orenge");
           			var opertd = tdStatus.eq(i).next().next();
           			opertd.append(edit);
           			
           			$(edit).on("click",function(){
           				var _index = $(this).parent().attr("data");
         				window.location.href = "changeTicket.html?index="+_index+"";
           			});
           			
           			var _submit = document.createElement("a");
           			_submit.innerHTML = "提交";
           			$(_submit).addClass("orenge");
           			var opertd = tdStatus.eq(i).next().next();
           			opertd.append(_submit);
           			$(_submit).on("click",function(){
           				current = $(this);
           				$('#submitModal').modal('show');
           				proID = $(this).parent().attr("data");
           			});
           			
           		}
           		if(tdStatus.eq(i).html()=="已上架"){
           			var soldOut = document.createElement("a");
           			soldOut.innerHTML = "下架";
           			$(soldOut).addClass("orenge");
           			var opertd = tdStatus.eq(i).next().next();
           			opertd.append(soldOut);
           			$(soldOut).on("click",function(){
           				current = $(this);
           				$('#myModal').modal('show');
           				proID = $(this).parent().attr("data");
           			});
           		}
           }
    	}
     //查询功能
        $("#search").click(function () {
        	$(this).html("正在查询");
            var Industry= $(".searchVariety option:selected").text();
            switch (Industry){
                case "全部":
                    Industry="-99";
                    break;
                case "未提交":
                    Industry="0";
                    break;
                case "已提交":
                    Industry="1";
                    break;
                case "已上架":
                    Industry="2";
                    break;
                case "已下架":
                    Industry="-2";
                    break;
                case "未通过":
                    Industry="-1";
                    break;
            }
            var code= $(".searchCode").val().trim();
            var name= $(".searchName").val().trim();
            var arrActionParam = {
                "MerchantID":userMess.MerchantID,
                "Code":code,
                "ProductName":name,
                "Status":Industry,
                "Skip":pageIndex*pageSize,
                "Take":pageSize
            };
            var strActionName="Product_GetScenicProductPage";
            var strActionParam = JSON.stringify(arrActionParam);
            var strRequest = GetVisitData(strActionName, strActionParam);
            var datSubmit = { strRequest: strRequest };
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
                success: function (objResult,textStatus) {
                	maxentries = objResult.Totel;
                	$(".pagination").pagination(maxentries, {
			            callback: PageCallback,
			            prev_text: '上一页',
			            next_text: '下一页',
			            items_per_page: pageSize,//每页显示的条目数
			            num_display_entries:5,//连续分页主体部分分页条目数
			            current_page: pageIndex,//当前页索引
			            num_edge_entries: 1       //两侧首尾分页条目数
			        });
			        //翻页调用
			        function PageCallback(index, jq) {
			             var arrActionParam = {
			                "MerchantID":userMess.MerchantID,
			                "Code":code,
			                "ProductName":name,
			                "Status":Industry,
			                "Skip":pageIndex*pageSize,
			                "Take":pageSize
			            };
			            var strActionName="Product_GetScenicProductPage";
			            var strActionParam = JSON.stringify(arrActionParam);
			            var strRequest = GetVisitData(strActionName, strActionParam);
			            var datSubmit = { strRequest: strRequest };
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
			            	success: function (objResult,textStatus) {
			            		$("#search").html("查询");
			            		if (objResult.Result=="1"){
			                    	if(objResult.List.length > 0){
			                    		$(".content").css("display","none");
			                    		$(".page").css("display","block");
			                    		var lists=objResult.List;
							            for(var i=0,len = lists.length;i<len;i++){
									       var temp = lists[i].First;
											lists[i].First = temp.substring(temp.lastIndexOf("http"));
										}
						            	//渲染页面
						            	var html = template("template", {items: lists});
			                            $(".table tbody").html(html);
						            	$("#totalR").html(maxentries);
						            	handle();
			                    	}else{
			                    		$("tbody").children().remove();
			                    		$(".page").css("display","none");
			                			$(".content").css("display","block");
			                    	}
			                    }else if(objResult.Result=="-99"){
				                    alert("搜索不存在");
				                }
			            	}
			        })
                	}
		        },
                complete : function(XMLHttpRequest,status){
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // alert(XMLHttpRequest.status);
                    // alert(XMLHttpRequest.readyState);
                    // alert(textStatus);
                }
            });
        })
		//提交的弹出层	
     $("#confirmBtn").click(function(){
    	//提交的ajax请求
		var strActionName="Product_SubmitProduct";
        var arrActionParam = {
		    "ProductID":proID
		    }; 
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
                    $('#submitModal').modal('hide');
                    current.parent().parent().find("td").eq(5).html("已提交");
                    current.siblings().eq(1).remove();
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
    //下架的弹出层
    $("#auditBtn").click(function(){
    	//下架的ajax请求
		var strActionName="Product_UpdateProductRemoved";
        var arrActionParam = {
		    "ProductID":proID,
			 "WaiterID":userMess.WaiterID 
		    }; 
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
                    current.parent().parent().find("td").eq(5).html("已下架");
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
})