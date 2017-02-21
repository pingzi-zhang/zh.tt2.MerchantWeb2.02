$(function () {
	window.parent.document.title=document.title;
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
    jeDate({
    	format: 'YYYY-MM-DD',
		dateCell:"#inpstart",
		isinitVal:true,
		isTime:false, //isClear:false,
		minDate:"2000-01-01"
	})
    jeDate({
    	format: 'YYYY-MM-DD',
		dateCell:"#inpend",
		isinitVal:true,
		isTime:false, //isClear:false,
		minDate:"2000-01-01"
	})
    
    $(".search").click(function(){
    	$(this).html("正在查询");
        PageCount(1);//1表示查询
    });
    $("#inpstart").val("2000-01-01");
    PageCount();
    //获取总的记录数
    function PageCount(status) {
    	var start = "2000-01-01";
    	/*var start = $("#inpstart").val().trim();*/
    	var end = $("#inpend").val().trim();
    	Industry = -99;
    	if(status == 1){
    		start = $("#inpstart").val().trim();
    		end = $("#inpend").val().trim();
    		Industry= $(".searchVariety option:selected").text();
	        switch (Industry){
	            case "全部":
	                Industry="-99";
	                break;
	            case "已付款":
	                Industry="1";
	                break;
	            case "已消费":
	                Industry="3";
	                break;
	            case "已完成":
		            Industry="9";
		            break;
	        }
	        Industry = parseInt(Industry);
    	}
        //页面页数
        var pageIndex = 0;
        var pageSize = 10;
		//代码修改
        var maxentries; //总条目数
        var arrActionParam = {
            "MerchantID": userMess.MerchantID,            //商家编码
            "Status": parseInt(Industry),                    //状态
            "Start": start,               //开始时间
            "End": end,                  //结束时间
            "Skip":pageIndex*pageSize,
        	"Take":pageSize,
        	"VarietyID":orderType
        };
        /*console.log("传入后台的数据",arrActionParam);*/
        var strActionName = "Sale_GetFoodsbySalePage";
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
            	maxentries = objResult.Total;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
               // alert(XMLHttpRequest.status);
                //alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
        });
        
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
        InitList(0);
        //请求数据
        function InitList(pageIndex) {
            var arrActionParam = {
                "MerchantID": userMess.MerchantID,            //商家编码
                "Status": parseInt(Industry),                    //状态
                "Start": start,               //开始时间
                "End": end,                  //结束时间
                "Skip":pageIndex*pageSize,
			    "Take":pageSize,                     //获取记录条数
            	"VarietyID":orderType
            };
            /*console.log("销售加入后台的数据",arrActionParam);*/
            var strActionName = "Sale_GetFoodsbySalePage";
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
                	$(".search").html("查询");
                    //页面列表的渲染功能
                    var lists = objResult.List;
                    var html=template("template",{items:lists});
                    $(".table tbody").html(html);
                    if(lists.length <= 0){
                    	$("table tbody").children().remove();
                        $(".content").css("display","block");
                        $("footer").css("display","none");
                    }else{
                        $("footer").css("display","block");
                        $(".content").css("display","none");
                    }
                    var span = $("footer>p>span");

                    //所有列表总数
                    $(".totalNum>span").html(objResult.TotelQuantity);
                    //所有列表总金额
                   /* $(".totalPrice>span").html(objResult.TotelAmount);*/
                    //当前页总数量
                    span.eq(0).html(objResult.PageQuantity);
                    //当前页总金额
                    span.eq(1).html(objResult.PageAmount);
                    span.eq(2).html(objResult.Total);
                    span.eq(3).html(10);
                },
                complete : function(XMLHttpRequest,status){
					if(status=='timeout'){
			　　　　　  alert("请求超时");
			　　　　}
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                  //  alert(XMLHttpRequest.status);
                   //  alert(XMLHttpRequest.readyState);
                    alert(textStatus);
                }
            });
        }
    }

});