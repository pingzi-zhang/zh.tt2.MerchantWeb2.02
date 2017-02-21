$(function(){ 
	window.parent.document.title=document.title;
	var index = location.search.substring(7);
	InitList()
	
	//请求数据
    function InitList(){
        //参数输入
        var arrActionParam = {
            "ProductID":index
        };
        var strActionName = "Product_GetProduct";
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
          		renderValue(objResult.Model);
            },
            complete : function(XMLHttpRequest,status){
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                 alert(XMLHttpRequest.status);
                 alert(XMLHttpRequest.readyState);
                 alert(textStatus);
            }
        });
        function renderValue(obj){
        	//基本信息
        	var $baseInfo_P = $("#baseInfo p");
        	$baseInfo_P.eq(0).find("span").eq(1).html(obj.Name);
        	//用餐时段
        	var mealPeriod = "",str;
        	str = obj.Meal;
        	if(str){
        		str = obj.Meal.split(",");
        		for(var i = 0; i < str.length;i++){
        			switch(str[i]){
        				case "0":
        					mealPeriod = mealPeriod+"早餐 ";
        					break;
        				case "1":
        					mealPeriod = mealPeriod+"午餐 ";
        					break;
        				case "2":
        					mealPeriod = mealPeriod+"晚餐 ";
        					break;
        				case "3":
        					mealPeriod = mealPeriod+"夜宵 ";
        					break;
        				
        			}
        		}
        	}
        	$baseInfo_P.eq(1).find("span").eq(1).html(mealPeriod);
        	//星期几接待
        	var str = obj.Week;
        	var week = "";
            str = str.split(',');
            for(var i = 0; i < str.length; i++){
                switch(str[i]){
    				case "1":
    					week = week+"星期一   ";
    					break;
    				case "2":
    					week = week+"星期二   ";
    					break;
    				case "3":
    					week = week+"星期三   ";
    					break;
    				case "4":
    					week = week+"星期四    ";
    					break;
    				case "5":
    					week = week+"星期五   ";
    					break;
    				case "6":
    					week = week+"星期六   ";
    					break;
    				case "7":
    					week = week+"星期日  ";
    					break;
    			}
            }
        	$baseInfo_P.eq(2).find("span").eq(1).html(week);
        	$baseInfo_P.eq(3).find("span").eq(1).html(obj.UseNum+"人餐");
        	//用餐时长
        	if(obj.LongMeal == 0){
        		$baseInfo_P.eq(4).find("span").eq(1).html("无限制");
        	}else{
        		$baseInfo_P.eq(4).find("span").eq(1).html(obj.LongMeal);
        	}
        	//产品价格
        	var $proPrice = $("#productPrice p");
        	$proPrice.eq(0).find("span").eq(1).html(obj.Buy);
        	$proPrice.eq(1).find("span").eq(1).html(obj.Market);
        	
        	//购买须知
        	var $proInfo_p = $("#proInfo p");
        	var model = obj.CancelModel;
        	if(model == 1){
        		model = "是";
        	}else{
        		model = "否";
        	}
        	$proInfo_p.eq(0).find("span").eq(1).html(model);
        	if(obj.Effective==0){
        		$proInfo_p.eq(1).find("span").eq(1).html("永久有效");
        	}else{
        		$proInfo_p.eq(1).find("span").eq(1).html(obj.Effective+"天");
        	}
        	//产品首图
            $("#fitstPic").attr("src",obj.First)
            
        	var album = obj.Album.split(",");
        	for(var i = 0; i < album.length;i++){
				$("#product_album_list").append('<img src="'+album[i] +'" alt="">&nbsp;');
        	}
        }
        //退改规则和图文描述********************************************************
	  	var strActionName="Product_GetProductDetail";
	    var arrActionParam = {
		    "strProductID":index
		}; 
	   	var strActionParam = JSON.stringify(arrActionParam);
	    var strRequest = GetVisitData(strActionName, strActionParam);
	    var datSubmit = { strRequest: strRequest };
	    $.ajax({
	        url: jsgDataUrl+jsgDataGate,
	        type: "POST",
	        dataType: "json",
	        //cache: true,
	        data: datSubmit,
	        async: false,
	        timeout : ajaxTimeout,
	        beforeSend: function () {
	        },
	        success: function (objResult,textStatus) {
	        	console.log("美食",objResult);
	            if (objResult.Result=="1"){
	            	//介绍
		        	$("#useRule div").html(objResult.Model.Change);
		        	
	            }else if(objResult.Result=="-99"){
	                alert(objResult.Message);
	            }
	        },
	        complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){
		　　　　　  alert("请求超时");
		　　　　}
		　　},
	        error: function (XMLHttpRequest, textStatus, errorThrown) {
	        }
	 });
    }
})
