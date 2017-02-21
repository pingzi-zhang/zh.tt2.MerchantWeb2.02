angular.module('myModule',[
]).controller('myController',function ($scope) {
	$scope.content = null;
})
var userRulesText = null;
$(function(){
	window.parent.document.title=document.title;
	var userMess = JSON.parse(sessionStorage.userInfo);
	/******************图文混编的上传图片******************/
    //富文本编辑器上传图片
    var uploaderTxt = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true,
        // swf文件路径
        swf: '../lib/webuploader/Uploader.swf',
        // 文件接收服务端。
        // server: 'http://imgapi.nihaott.com8015/Picture/UploadPicture',
        server: jsgImageUrl+jsgImageUplod,
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#filePicker1',
        fileVal:"filPicture",
        // 只允许选择图片文件。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/jpg,image/jpeg,image/png'
        },
        duplicate :true,
        method:'POST',
    });
    uploaderTxt.on( 'uploadSuccess', function( file,response ) {
        var ShowUrl=response.ShowUrl;
        var img=document.createElement("img");
        var div=document.createElement("div");
        var p=document.createElement("p");
        var br=document.createElement("br")
        img.setAttribute("src",ShowUrl)
        var view=document.getElementById('ueditor_1').contentWindow.document.body
        view.appendChild(div);
        div.appendChild(img);
        view.appendChild(p);
        p.appendChild(br);
        div.style.width="50%";
        img.style.width="80%";
    });
    /******************图文上传图片结束******************/
	 //上传图片控件实例化
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
    //用餐人数的自定义
    //自定义人数的弹框
    $("#custom").click(function(){
    	$("#bounced").css("display","block");
    });
    $("#bounced .ensure").click(function(){
    	$("#bounced").css("display","none");
    	var str = $("#bounced input").eq(0).val().trim()+"-";
    	str += $("#bounced input").eq(1).val().trim()+"人餐";
    	$("#custom").html(str);
    });
    
    //2.产品介绍-产品介绍
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
	//3.新增菜品的图片上传
    var uploader3 = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true,
        // swf文件路径
        swf: '../lib/webuploader/Uploader.swf',
        // 文件接收服务端。
         server: jsgImageUrl+jsgImageUplod,
        // 控件按钮
        pick: '#upload_img',
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
    uploader3.on('uploadSuccess',function (file, response) { 
        var b=document.createElement("b");
        $(".upload_img b:first").remove();
        $(".upload_img:first").append(b);
        b.setAttribute("data",response.ShowUrl);
        $(".tips_suc:first").css("display", "inline-block");
        setTimeout(function () {
            $(".tips_suc:first").css("display", "none");
        },3000);
        $("#upload_img>.webuploader-pick:first").css("background-image",'url('+response.ShowUrl+')');
    });
    //修改
    //4.修改菜品的图片上传
    var uploader4 = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true,
        // swf文件路径
        swf: '../lib/webuploader/Uploader.swf',
        // 文件接收服务端。
         server: jsgImageUrl+jsgImageUplod,
        // 控件按钮
        pick: '#editUpload_img',
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
    uploader4.on('uploadSuccess',function (file, response) { 
        var b=document.createElement("b");
        $(".upload_img b:nth-of-type(1)").remove();
        $(".upload_img:nth-of-type(1)").append(b);
        b.setAttribute("data",response.ShowUrl);
        $(".tips_suc:nth-of-type(1)").css("display", "inline-block");
        setTimeout(function () {
            $(".tips_suc:nth-of-type(1)").css("display", "none");
        },3000);
        $("#editUpload_img>.webuploader-pick:nth-of-type(1)").css("background-image",'url('+response.ShowUrl+')');
        $("#editUpload_img").attr("data",response.ShowUrl)
    });
    //时间选择控件初始化
	//日期
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
	
    //富文本编辑器ueditor初始化
    var userRules = UE.getEditor('userRules',{autoHeightEnabled: false});
    var textDescribe=UE.getEditor('textDescribe',{autoHeightEnabled: false});
    //使用规则的text
    var ue = UE.getEditor('userRules',{enableAutoSave: false});
     //使用图片描述的text
    var ue = UE.getEditor('textDescribe',{enableAutoSave: false});
	var index = location.search.split("&");
	var value = [];
	for(var i = 0; i < index.length;i++){
		var temp = index[i].split("=");
		value.push(temp[1]);
	}
	renderInit(value);
	foodSubmit(value);
});/*$end*/

function renderInit(_value){
	//发送ajax请求
    var strActionName="Product_GetProduct";
    var arrActionParam = {
	    "ProductID":_value[0]
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
                valueInit(objResult.Model);
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
        	console.log("请求回来的",objResult);
            if (objResult.Result=="1"){
            	$("#textDescribe").html(objResult.Model.Description);
            	$("#userRules").html(objResult.Model.Change);
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
//请求的对象渲染整个页面 valueInit
function valueInit(obj){
	$("#foodName").val(obj.Name);
	var period = obj.Meal.split(",");
	for(var i = 0; i < period.length;i++){
		$("#diningP").find("div").eq(period[i]).addClass("on");
	}
	//用餐人数
	var people =obj.UseNum;
	switch(people){
		case "1":
			people = 1;
			break;
		case "2":
			people = 2;
			break;
		case "3-4":
			people = 3;
			break;
		case "4-5":
			people = 4;
			break;
		case "5-6":
			people = 5;
			break;
		default:
			$("#custom").html(people+"人餐");
			people = 6;
			break;
	}
	$("#diningNum").find("div").eq(people-1).addClass("on");
	$("#vipPrice").val(obj.Buy);
	$("#originalCost").val(obj.Market);
	//菜品列表
	var list;
	//渲染页面
    if(obj.FoodList){
    	list = obj.FoodList;
    	foodList = obj.FoodList;
    	for(var i = 0; i < list.length;i++){
	    	var foodType = list[i].Type;
	    	var str;
	    	switch(foodType){
				case 1:
					str="冷菜";
					break;
				case 2:
					str="热菜";
					break;
				case 3:
					str="点心";
					break;
				case 4:
					str="饮料";
					break;
				case 9:
					str="其他";
					break;
			}
	    	var value={
				"foodType":str,
				"foodName":list[i].Name,
				"foodImg":list[i].Pic,
				"foodPrice":list[i].Price,
				"foodNum":list[i].Quantity,
				"foodUnit":list[i].Unit
				};
		    var html=template("template-tr",{value:value});
		    $("#addNewInfo").html($("#addNewInfo").html()+html);
	    }
    }
	//模式
	$("#busCrowd").find("div").eq(obj.CancelModel-1).addClass("on");
	
	//有效期
	$("#validity").val(obj.Effective);
	
	//使用规则
	/*$("#userRules").html(obj.Notice);*/
	
	//使用时间
	$time = obj.UseTime;
	if($time){
		var str= $time.split(",");
		$("#inpstart").val(str[0]);
		$("#inpend").val(str[1]);
	}
	
	var b=document.createElement("b");
    $(".product_img").append(b)
    b.setAttribute("data",obj.First);
	$(".product_img .webuploader-pick").css("background-image",'url('+obj.First+')');
	
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
}

function foodSubmit(_value){
    //价格验证
    var price = $("#foodPrice");
    price.blur(function(){
        var value = price.val();
        var reg = /^[1-9]\d*$/;
        if(!reg.test(value) || value == ""){
        	price.next().css("display","block");
        	price.focus();
        }else{
        	price.next().css("display","none");
        }
    });
    
     //表单非空验证
    $("#foodName,#vipPrice,#originalCost,#validity,#editFoodName,#editFoodName，#editFoodName,#addFoodName").on("blur",function () {
        validate($(this));
    })
    
  //弹出层的清空
	function layerClear(){
		$("#foodtype").val("");
		$("#addFoodName").val("");
		$("#foodUnit").val("");
		$("#foodPrice").val("");
		$("#upload_img b").attr("data","");
		$("#upload_img>.webuploader-pick").css("background-image","")
	}
    //弹出层控制
    $(".btn_addFood:first").click(function () {
        $(".layer_bg:first").show();
        layerClear();
    })
    $("#addNewFood").click(function () {
        $(".layer_bg:first").show();
        layerClear();
    })
    $(".layer_addFood .close:first").click(function () {
        $(".layer_bg:first").hide();
    })
    $("#cancel").click(function () {
        $(".layer_bg1").show();
    })
    $(".layer_publish .close").click(function () {
        $(".layer_bg1").hide();
    })
    $(".layer_publish .cancel").click(function () {
        $(".layer_bg1").hide();
    })
    $(".layer_publish .certain").click(function () {
        window.location.href="foodOrdersList.html";
    })
    var newFoodValue = [];
    var productPhoto=null;
    var flag = 0;
    //添加菜品的弹出层
    var index = 0;
    btnInit();
    function btnInit(){
    	$(".addFoodSpace").addClass("hidden");
    	//将页面中的值存入newFoodValue
    	var $tr = $(".table tbody tr");
    	for(var i = 0; i < $tr.length;i++){
    		var temp = $tr.eq(i).find("td").eq(1).find("img").attr("src");
    		temp = temp.substring(temp.search("/U"));
    		var type = $tr.eq(i).find("td").eq(0).html();
    		switch(type){
	    		case "冷菜":
	    			type = "1";
	    			break;
	    		case "热菜":
	    			type = "2";
	    			break;
	    		case "点心":
	    			type = "3";
	    			break;
	    		case "饮料":
	    			type = "4";
	    			break;
	    		default:
	    			type = "9";
	    			break;
	    	}
    		var value = {
    			Type:type,
				Name:$tr.eq(i).find("td").eq(1).find("span").html(),
				Quantity:$tr.eq(i).find("td").eq(3).html(),
				Unit:$tr.eq(i).find("td").eq(4).html(),
				Price:$tr.eq(i).find("td").eq(2).html(),
				Pic: temp
    		}
    		newFoodValue.push(value);
    	}
    	//修改菜品的弹出层
		$("._edit").on("click",function(){
			$(".layer_bg:last").show();
			$(".layer_addFood .close:last").click(function () {
			        $(".layer_bg:last").hide();
			  });
		  	var $tr = $(this).parent().parent();
		  	var editfoodtype = $tr.find("td").eq(0).html().trim();
		  	var seloption=$("#editfoodtype option");
			for(var i = 0; i < seloption.length;i++){
				if($("#editfoodtype option").eq(i).text() == editfoodtype){
					$("#editfoodtype option")[i].selected = true;
					break;
				}
			}
			$("#editFoodName").val($tr.find("td").eq(1).find("span").html());
			$("#editFoodUnit").val($tr.find("td").eq(4).html());
			$("#editFoodPrice").val($tr.find("td").eq(2).html());
			$("#editFoodNumber").val($tr.find("td").eq(3).html());
			$("#editUpload_img").attr("data",$tr.find("td").eq(1).find("img").attr("src"));
			$("#editUpload_img>.webuploader-pick").css("background-image",'url('+$tr.find("td").eq(1).find("img").attr("src")+')')
		});
    };
    var editflag = 0;
    $("#editFoodSave").click(function(){
    	for(var i = 0;i < newFoodValue.length;i++){
    		if(newFoodValue[i].Name == $("#editFoodName").val()&&index != i){
    			editflag = 1;
    		}
    	}
    	if(editflag == 0){
    		if($("#editFoodName").val() == ""){
	    		$("#editFoodName").next().css("display","inline-block");
	        	$("#editFoodName").focus();
	    	}else{
	    		editSaveBtn(index);
    			layerClear();
	    	}
    	}else{
    		$("#editFoodName").next().css("display","inline-block").html("*菜品已经存在");
	        $("#editFoodName").focus();
    		editflag = 0;
    	}
    	$(".layer_bg:last").hide();
    })
    //编辑界面的代码
    function editSaveBtn(_index){
    	var foodType = $("#editfoodtype").val();
    	var foodName = $("#editFoodName").val();
    	var foodQuantity =  $("#editFoodNumber").val();
    	var foodUnit = $("#editFoodUnit").val();
    	var foodPrice = $("#editFoodPrice").val();
    	var foodNumber = $("#editFoodNumber").val();
    	var temp = $("#editUpload_img").attr("data");
    	var addFoodPic = temp.substring(temp.search("/U"));
    	//console.log(typeof temp); 
    	//同一个菜名不能存在	
    	newFoodValue[_index].Type=foodType;
		newFoodValue[_index].Name=foodName;
		newFoodValue[_index].Quantity=foodQuantity;
		newFoodValue[_index].Unit=foodUnit;
		newFoodValue[_index].Price=foodPrice;
		newFoodValue[_index].Number=foodNumber;
		newFoodValue[_index].Pic=addFoodPic; 
		console.log("foodQuantity:"+foodQuantity);
		var tr = $(".table .addNewInfo tr").eq(_index);
		tr.find("td").eq(0).html($("#editfoodtype option:selected").text());
		tr.find("img").eq(0).attr("src",$("#editUpload_img b").attr("data"));
		tr.find("span").eq(0).html(foodName);
		tr.find("td").eq(2).html(foodPrice);
		tr.find("td").eq(3).html(foodNumber);
		tr.find("td").eq(4).html(foodUnit);
    }
    var flag = 0;
    //选择按钮的切换
    $("#supportQuit div").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
    })
    $("#diningNum .numdiv").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
        if(!$(this).hasClass("self")){
        	$("#bounced").css("display","none");
        }
    }) 
    $("#diningP div").click(function () {
    	if($(this).hasClass("on")){
    		$(this).removeClass("on");
    	}else{
    		$(this).addClass("on");
    	}
       /* $(this).toggle("on");*/
    }) 
    //保存和保存并提交的按钮监听事件
    $("#save").bind("click",function(){
    	saveSubmit($(this));
    });
    $("#submit").bind("click",function(){
    	saveSubmit($(this));
    });
    //保存和提交要执行的函数
    function saveSubmit(_this){
    	var userMess = JSON.parse(sessionStorage.userInfo);
    	var _status = null;
    	if(_this.html()=="保存"){
    		_status = 0;
    	}else{
    		_status = 1;
    	}
    	//提交时间的格式化
    	var dat = new Date();
    	var mender = userMess.WaiterID;
    	//1.产品编号ID
    	var proID = userMess.MerchantID;
    	//2.套餐标题
        var name= $("#foodName").val();
        //用餐时段
	    var period= "";
		var ele = $("#diningP .on");
		var length = ele.length;
		for(var i = 0;i < length;i++){
			var str = ele[i].innerHTML.substring(7);
			switch(str){
				case "早餐":
					 period = period+",0";
					 break;
				case "午餐":
					 period = period+",1";
					 break;
				case "晚餐":
					 period = period+",2";
					 break;
				case "夜宵":
					 period = period+",3";
					 break;
			}
		}
		period = period.substring(1);
         //2.用餐人数
	    var diningNum= null;
	    if($("#diningNum .on").html()){
	    	diningNum= $("#diningNum .on").html();
	    	switch(diningNum){
	    		case "单人餐":
	    			diningNum = "1";
	    			break;
	    		case "双人餐":
	    			diningNum = "2";
	    			break;
	    		case "3-4人餐":
	    			diningNum = "3-4";
	    			break;
	    		case "4-5人餐":
	    			diningNum = "4-5";
	    			break;
	    		case "5-6人餐":
	    			diningNum = "5-6";
	    			break;
	    	}
	    }
	   	if($("#custom").hasClass("on")){
	   		var temp = $("#custom").html();
	   		diningNum = temp.substring(0,temp.length-2);
	   	}
        //3.分销价
        var vipPrice=parseFloat($("#vipPrice").val());
        //4.门店价
        var originalCost=parseFloat($("#originalCost").val());
        //5.退票模式
        var supportQuit= $("#supportQuit .on").text();
        if(supportQuit == "是"){
        	supportQuit = 1;
        }else{
        	supportQuit = 0;
        }
        //6.有效期
        var validity = 0;
        if($("#validity").val()){
        	validity = parseInt($("#validity").val());
        }
        
        //8.首图
        var firstPic = $("#productImg b").attr("data");
        firstPic = firstPic.substring(firstPic.search("/U"));
        //9.相册
        var productPhoto = "";
        var length = $("#product_album_list img").length;
    	for(var i = 0; i < length;i++){
    		var temp = $("#product_album_list img").eq(i).attr("src");
    		//排除最后一张图片，不需要，
    		if(i == length-1){
    			productPhoto = productPhoto + temp.substring(temp.search("/U"));
    			/*productPhoto = productPhoto + $("#product_album_list img").eq(i).attr("src");*/
    		}else{
    			productPhoto = productPhoto + temp.substring(temp.search("/U")) + ","
    			/*productPhoto = productPhoto + $("#product_album_list img").eq(i).attr("src") + ","*/
    			
    		}
    	}
    	//使用规则
    	var useU = document.getElementById('ueditor_0').contentWindow.document.body;
        var change = useU.innerHTML;
        //7.图文描述
    	var content=document.getElementById('ueditor_1').contentWindow.document.body;
        var description= content.innerHTML;
        //10.单位
        var unit = "单";
        //11.状态
        var status = _status;
        //12.修改人编码
        var mender = userMess.WaiterID;
        //13.提交时间
        var submitDate = dat.getFullYear()+"-"+(dat.getMonth()+1)+"-"+dat.getDate();
        //14.菜单列表
        var footList = JSON.stringify(newFoodValue);
        
        var useTime = $("#inpstart").val().trim()+","+$("#inpend").val().trim();
        	//发送ajax请求
	        var strActionName="Product_UpdateFoodPackage";
	        var arrActionParam = {
			    "ProductID":_value[0],
			    "Name":name,
			    "Meal":period,
			    "Buy":parseFloat(vipPrice),
			    "Market":parseFloat(originalCost),
			    "CancelModel":parseInt(supportQuit),
			    "Effective":parseInt(validity),
			    "Notice":"",
			    "First":firstPic,
			    "Album":productPhoto,
			    "Unit":unit,
			    "Status":parseInt(status),
			    "Mender":mender,
			    "Submit":submitDate,
			    "Change":change,
			    "Description":description,
			    "UseNum":diningNum,
			    "UseTime":useTime,
				"FoodList":footList
			    }; 
			console.log("传入后台的数据",arrActionParam);
	       	var strActionParam = JSON.stringify(arrActionParam);
	        var strRequest = GetVisitData(strActionName, strActionParam);
	        var datSubmit = { strRequest: strRequest };
	        //发送ajax请求
	       /* $.ajax({
	            url: jsgDataUrl+jsgDataGate,
	            type: "POST",
	            dataType: "json",
	            data: datSubmit,
	            timeout : ajaxTimeout,
	            async: true,
	            //timeout: 60000,
	            beforeSend: function () {
	            },
	            success: function (objResult,textStatus) {
	                if (objResult.Result=="1"){
	                    if(_status == 0){
                    		window.location.href="saveOk.html";
	                    }else{
	                    	window.location.href='submitOK.html';
	                    }
	                   alert("成功了");
	                }else if(objResult.Result=="-99"){
	                    if(!$("#foodName").val()){
	                    	alert("输入信息不完整");
	                    	$("#foodName").focus();
	                    	$("#foodName").next().css("display","inline-block");
	                    }else
	                    if(!$("#vipPrice").val()){
	                    	alert("输入信息不完整");
	                    	$("#vipPrice").focus();
	                    	$("#vipPrice").next().css("display","inline-block");
	                    }else
	                    if(!$("#originalCost").val()){
	                    	alert("输入信息不完整");
	                    	$("#originalCost").focus();
	                    	$("#originalCost").next().css("display","inline-block");
	                    }else
	                    if(!$("#validity").val()){
	                    	alert("输入信息不完整");
	                    	$("#validity").focus();
	                    	$("#validity").next().css("display","inline-block");
	                    }else{
	                    	alert(objResult.Message);
	                    }
	                }
	            },
	            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
			　　　　if(status=='timeout'){
			　　　　　  alert("请求超时");
			　　　　}
			　　},
	            error: function (XMLHttpRequest, textStatus, errorThrown) {
	            	alert("error");
	                alert(XMLHttpRequest.status);
	                alert(XMLHttpRequest.readyState);
	                alert(textStatus);
	            }
	       });
    */}    
}

