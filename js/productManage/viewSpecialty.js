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
        var strActionName = "Product_GetNativeProduct";
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
                /*alert(XMLHttpRequest.status);
                 alert(XMLHttpRequest.readyState);
                 alert(textStatus);*/
            }
        });
        function renderValue(obj){
        	var baseInfoObj = $(".baseInfo p span:nth-of-type(2)");
        	baseInfoObj.eq(0).html(obj.Name);
        	baseInfoObj.eq(1).html(obj.Unit);
        	
        	var priceObj = $(".productPrice p span:nth-of-type(2)");
        	priceObj.eq(0).html(obj.Buy);
        	priceObj.eq(1).html(obj.Market);
        	//介绍
        	var introduceObj = $(".proInfo div p");
        	introduceObj.eq(0).html(obj.Notice);
        	
        	introduceObj.eq(1).html(obj.Notice);
        	
        	introduceObj.eq(2).html(obj.Notice);
        	
        	introduceObj.eq(3).html(obj.Notice);
        	
        	introduceObj.eq(4).html(obj.Notice);
        	
        	introduceObj.eq(5).html(obj.Notice);
            //产品首图
            $("#fitstPic").attr("src",obj.First);
        	var album = obj.Album.split(",");
        	for(var i = 0; i < album.length;i++){
				$("#productAlbum .upload_photo").append('<img src="'+album[i] +'" alt="">');
        	}
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
		        	introduceObj.eq(0).html(objResult.Model.Format);
		        	
		        	introduceObj.eq(1).html(objResult.Model.PickUp);
		        	
		        	introduceObj.eq(2).html(objResult.Model.Change);
		        	
		        	introduceObj.eq(3).html(objResult.Model.Service);
		        	
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
})
