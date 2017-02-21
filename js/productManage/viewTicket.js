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
        var strActionName = "Product_GetScenicProduct";
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
            	console.log("结果",objResult);
          		renderValue(objResult.Model);
            },
            complete : function(XMLHttpRequest,status){
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                /*alert(XMLHttpRequest.status);
                 alert(XMLHttpRequest.readyState);
                 alert(textStatus);*/
            }
        });
        function renderValue(obj){
        	var typeName = "";
        	switch(obj.TicketType){
        		case 1:
        			typeName = "全价票";
        			break;
        		case 2:
        			typeName = "半价票";
        			break;
        	}
        	var baseInfoObj = $(".baseInfo span:nth-of-type(2)");
        	baseInfoObj.eq(0).html(typeName);
        	baseInfoObj.eq(1).html(obj.Name);
        	baseInfoObj.eq(2).html(obj.AdvanceTime);
        	var priceObj = $(".productPrice p span:nth-of-type(2)");
        	priceObj.eq(0).html(obj.Buy);
        	priceObj.eq(1).html(obj.Market);
        	
            //产品首图
            $("#fitstPic").attr("src",obj.First)
        	var album = obj.Album.split(",");
        	for(var i = 0; i < album.length;i++){
				$("#productAlbum .upload_photo").append('<img src="'+album[i] +'" alt="">');
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
		            if (objResult.Result=="1"){
		            	//介绍
			        	var introduceObj = $(".proInfo div p");
			        	introduceObj.eq(0).html(objResult.Model.CostDescription);
			        	
			        	introduceObj.eq(1).html(objResult.Model.Change);
			        	
			        	introduceObj.eq(2).html(objResult.Model.Instructions);
			        	
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
