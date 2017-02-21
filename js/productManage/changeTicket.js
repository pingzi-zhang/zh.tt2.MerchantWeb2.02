angular.module('myModule',[
]).controller('myController',function ($scope) {
	$scope.content = null;
})
function moduleInit(){
	//1.产品介绍-产品首图
    var uploader1 = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true,
        // swf文件路径
        swf: '../lib/webuploader/Uploader.swf',
        // 文件接收服务端。
         server: jsgImageUrl+jsgImageUplod,
        // 控件按钮
        pick: '#product_img',
        //设置传入后台的参数名
        fileVal:"filPicture",
        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/jpg,image/jpeg,image/png'
        },
        duplicate:true,
        method:'POST',
    });
   
    uploader1.on('uploadSuccess',function (file, response) { 
    	$("#productImg b").remove();
        var b=document.createElement("b");
        $(".product_img").append(b)
        b.setAttribute("data",response.ShowUrl);
        $(".tips_suc").css("display", "inline-block");
        setTimeout(function () {
            $(".tips_suc").css("display", "none");
        },3000);
        $("#product_img>.webuploader-pick").css("background-image",'url('+response.ShowUrl+')');
    	
    	var clearBtn = document.createElement("div");
        clearBtn.innerHTML = "×";
        $(clearBtn).addClass("imgClear");
        $(clearBtn).on("click",function(){
        	$("#product_img>.webuploader-pick").css("background-image","");
        	$(".product_img b").remove();
        	$(this).remove();
        })
        $("#product_img").before(clearBtn);
    });
    //2.产品相册
    var uploader2 = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true,
        // swf文件路径
        swf: '../lib/webuploader/Uploader.swf',
        // 文件接收服务端。
         server: jsgImageUrl+jsgImageUplod,
        // 控件按钮
        pick: '#product_album',
        //设置传入后台的参数名
        fileVal:"filPicture",
        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/jpg,image/jpeg,image/png'
        },
        method:'POST',
    });
    
    uploader2.on('uploadSuccess',function (file, response) {
        var showUrl = response.ShowUrl;
    	var newDiv = document.createElement("div");
    	var img = document.createElement("img"); 
    	img.setAttribute("src",showUrl);
    	var b=document.createElement("b");
    	b.setAttribute("data",response.ShowUrl);
    	
    	$(newDiv).append(img);
    	$(newDiv).append(b)  
    	$("#product_album_list").append(newDiv);   
         //删除按钮
    	var clearBtn = document.createElement("div");
        clearBtn.innerHTML = "×";
        $(clearBtn).addClass("imgClear");
        $(newDiv).append(clearBtn);
        $("#product_album_list div .imgClear").on("click",function(){
	    	$(this).parent().remove();
    	})
        
    });
    
   //产品描述ueditor初始化
    textDescribe = UE.getEditor('textDescribe',{autoHeightEnabled: false});
    var ue = UE.getEditor('textDescribe',{enableAutoSave: false});
    
    //重要条款ueditor初始化
    var importantTerms = UE.getEditor('importantTerms',{autoHeightEnabled: false});
    //使用规则的text
    var ue = UE.getEditor('importantTerms',{enableAutoSave: false});
    
    //退改规则ueditor初始化
    var backRule = UE.getEditor('backRule',{autoHeightEnabled: false});
    //使用规则的text
    var ue = UE.getEditor('backRule',{enableAutoSave: false});
    
    //使用方法ueditor初始化
    var useMethod = UE.getEditor('useMethod',{autoHeightEnabled: false});
    //使用规则的text
    var ue = UE.getEditor('useMethod',{enableAutoSave: false});
}

//修改请求的函数
function editRender(_value){
	var userMess = JSON.parse(sessionStorage.userInfo);
	//发送ajax请求
    var strActionName="Product_GetScenicProduct";
    var arrActionParam = {
	    "ProductID":_value[0]
	    }; 
	/*console.log("请求参数",arrActionParam);*/
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
                var obj = objResult.Model;
                //1.景区
	        	/*$("#ticketType option").eq(obj.TicketType - 1).css("selected","selected");*/
	        	var $sciec = $("#ticketType option");
	        	var str = "";
	        	switch(obj.TicketType){
	        		case 1:
	        			str = "全价票";
	        			break;
	        		case 2:
	        			str = "半价票";
	        			break;
	        	}
	        	for(var i = 0; i < $sciec.length;i++){
	        		if(str == $sciec.eq(i).val()){
	        			$sciec[i].selected = true;
	        		}
	        	}
	        	
				//2.门票类型
			    var ticketType= obj.TicketType;
			    switch(ticketType){
			    	case "1":
			    		$("#scenicName option").eq(0).attr("selected","selected");
			    		break;
			    	case "2":
			    		$("#scenicName option").eq(1).attr("selected","selected");
			    		break;
			    }
			    //3.套餐标题
			    $("#proName").val(obj.Name);
			    //4.提前预定时间
			    $("#orderHour").val(obj.AdvanceTime);
			    //5.分销价
			    $("#vipPrice").val(obj.Buy);
			    //6.门店价
			    $("#originalCost").val(obj.Market);
			    //7.产品描述
			   // productDiscText = obj;
			    //8.预定须知
			  //  orderDiscText = obj;
			    //9.重要条款
			    //importantTermsText = obj;
			    //10.退改规则
			    //backRuleText = obj;
			    //11.使用方法
			   // useMethodText = obj;
	        	
	        	$("#productImg").append("<b data="+obj.First+"></b>");
	        	$("#product_img>.webuploader-pick").css("background-image",'url('+obj.First+')');
	        	
	        	var album = obj.Album.split(",");
	        	for(var i = 0; i < album.length;i++){
	        		var newdiv = document.createElement("div");
	        		$(newdiv).append('<img src="'+album[i] +'" alt="">');
					$("#product_album_list").append(newdiv);
					var clearBtn = document.createElement("div");
			        clearBtn.innerHTML = "×";
			        $(clearBtn).addClass("imgClear");
			        $(clearBtn).on("click",function(){
			        	$(this).parent().remove();
			        	$(this).remove();
			        })
			        $(newdiv).append(clearBtn);
	        	}
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
  //退改规则和图文描述********************************************************
  	var strActionName="Product_GetProductDetail";
    var arrActionParam = {
	    "strProductID":_value[0]
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
            	$("#textDescribe").html(objResult.Model.Description);
	        	 $("#importantTerms").html(objResult.Model.CostDescription);
	        	 $("#backRule").html(objResult.Model.Change);
	        	 $("#useMethod").html(objResult.Model.Instructions);
	        	
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
 //退改规则和图文描述********************************************************
}
//变量初始化
var productDiscText = null; //产品描述ueditor初始化
var orderDiscText = null; //预定须知ueditor初始化
var importantTermsText = null; //重要条款ueditor初始化
var backRuleText = null; //退改规则ueditor初始化
var useMethodText = null; //使用方法ueditor初始化

$(function(){
	window.parent.document.title=document.title;
	moduleInit();
	var userMess = JSON.parse(sessionStorage.userInfo);
	var index = location.search.split("&");
	var value = [];
	for(var i = 0; i < index.length;i++){
		var temp = index[i].split("=");
		value.push(temp[1]);
	}
	editRender(value);
    //表单非空验证
    $("#proName,#orderHour,#vipPrice,#originalCost").on("blur",function () {
        validate($(this));
    })
    //保存和保存并提交的按钮监听事件
	$("#save").bind("click",function(){
		saveSubmit($(this),value);
	});
	$("#busSubmit").bind("click",function(){
		saveSubmit($(this),value);
	});
	//保存和提交要执行的函数
    function saveSubmit(_this,value){
    	var _status = null;
    	//0是保存，1保存并提交
    	if(_this.html()=="保存"){
    		_status = 0;
    	}else{
    		_status = 1;
    	}
        //1.景区名称
		var scenicName = $("#scenicName option:selected").text();
		//2.门票类型
	    var tempstr= $("#ticketType option:selected").text();
	    if(tempstr == "全价票"){
	    	ticketType = 1;
	    }else if(tempstr == "半价票"){
	    	ticketType = 2;
	    }
	    //3.套餐标题
	    var proName=$("#proName").val();
	    //4.提前预定时间
	    var orderHour=parseInt($("#orderHour").val());
	    //5.分销价
	    var vipPrice=parseFloat($("#vipPrice").val());
	    //6.门店价
	    var originalCost=parseFloat($("#originalCost").val());
	     //7.产品描述
	    var useU = document.getElementById('ueditor_0').contentWindow.document.body;
        var describe = useU.innerHTML;
	    //9.正要条款
	    var useU = document.getElementById('ueditor_1').contentWindow.document.body;
        var items = useU.innerHTML;
	    //10.退改规则
	    var useU = document.getElementById('ueditor_2').contentWindow.document.body;
        var backRule = useU.innerHTML;
	    //11.使用方法
	    var useU = document.getElementById('ueditor_3').contentWindow.document.body;
        var method = useU.innerHTML;
	    //8.首图
	    var firstPic = $("#productImg b").attr("data");
	    if(firstPic){
	    	firstPic = firstPic.substring(firstPic.search("/U"));
	    }
	    //9.相册
	    var productPhoto = "";
	    var length = $("#product_album_list img").length;
		for(var i = 0; i < length;i++){
			var temp = $("#product_album_list img").eq(i).attr("src");
			//排除最后一张图片，不需要逗号
			if(i == length-1){
				productPhoto = productPhoto + temp.substring(temp.search("/U"));
			}else{
				productPhoto = productPhoto + temp.substring(temp.search("/U")) + ","
			}
		}
	    //10.状态
	    var status = _status;
	    //11.修改人编码
	    var mender = userMess.WaiterID;
	    //12.提交时间
		var dat = new Date();
	    var submitDate = dat.getFullYear()+"-"+(dat.getMonth()+1)+"-"+dat.getDate();
	   	var arrActionParam = {
	   		"Name":proName,
	   		"ProductID":value[0],
	   		"Scenic":scenicName,
	   		"Buy":vipPrice,
		   	"Market":originalCost,
	   		"Status":status,
	   		"First":firstPic,
		   	"Album":productPhoto,
	   		"Notice":"",
	   		"Mender":mender,
	   		"AdvanceTime":orderHour,
	   		"TicketType":ticketType,
			"Submit":submitDate,
			"Description":describe,
			"Change":backRule,
			"CostDescription":items,
			"Instructions":method
		};  
		/*console.log("传入后台的参数",arrActionParam);*/
        var strActionName="Product_UpdateScenicProduct";
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
            timeout : ajaxTimeout,
            beforeSend: function () {
            },
            success: function (objResult,textStatus) {
                if (objResult.Result=="1"){
                    if(_status == 0){
                    	window.location.href="saveOk.html";
                    	
                    }else{
                    	window.location.href='submitOK.html';
                    }
                }else if(objResult.Result=="-99"){
                    alert("输入信息不完整");
                    if(!$("#proName").val()){
                    	$("#proName").focus();
                    	$("#proName").next().css("display","inline-block");
                    }else
                    if(!$("#orderHour").val()){
                    	$("#orderHour").focus();
                    	$("#orderHour").next().css("display","inline-block");
                    }else
                    if(!$("#originalCost").val()){
                    	$("#originalCost").focus();
                    	$("#originalCost").next().css("display","inline-block");
                    }else
                    if(!$("#vipPrice").val()){
                    	$("#vipPrice").focus();
                    	$("#vipPrice").next().css("display","inline-block");
                    }
                }
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){
		　　　　　  alert("请求超时");
		　　　　}
		　　},
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // alert(XMLHttpRequest.status);
                // alert(XMLHttpRequest.readyState);
                // alert(textStatus);
            }
        });
    }    
});