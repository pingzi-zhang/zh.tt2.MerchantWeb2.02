//编辑器的angular的注入
angular.module('myModule',[
]).controller('myController',function ($scope) {
	$scope.content = null;
})

$(function(){
	//标题栏根据相应的页面的title变化
	window.parent.document.title=document.title;
	//获取地址栏中的参数index[0]是修改产品的ID,index[1]是状态没使用
	var userMess = JSON.parse(sessionStorage.userInfo);
	var index = location.search.split("&");
	var proID = index[0].split("=")[1];
	//调用组件初始化
	init();
	//渲染页面
	renderPage(proID);
	addFoodList();
	//菜品列表的修改页面
	foodListOper();
	//保存或者保存并提交的按钮监听事件
    $("#save").bind("click",function(){
    	saveAndSubmit($(this),proID);
    });
    $("#submit").bind("click",function(){
    	saveAndSubmit($(this),proID);
    });
})
/****************************新增菜品的事件****************************/
function addFoodList(){
	$(".btn_addFood").click(function () {
        $("#addfood").show();
        layerClear();
   });
	$("#addfood .dialogSave").click(function(){
		var foodType = $("#foodtype option:selected").text();
		var typeNo = $("#foodtype option:selected").val()
    	var foodName = $("#addFoodName").val();
    	var foodUnit = $("#foodUnit").val();
    	var foodPrice = $("#foodPrice").val();
    	var foodNumber = $("#foodNumber").val();
    	var addFoodPic = $("#upload_img b").attr("data");
		//表单验证
		if(!foodType || !foodName  || !foodUnit || !foodPrice || !foodNumber || !addFoodPic){
			alert("信息输入不完整");
			return false;
		}
		//获取菜品信息
    	var newtr = document.createElement("tr");
    	$(newtr).append("<td data="+typeNo+">"+ foodType +"</td>");
    	$(newtr).append('<td data='+addFoodPic+'>'+
				        	'<img src="'+addFoodPic+'" alt=""/>'+
				            '<span>'+foodName+'</span>'+
				        '</td>');
    	$(newtr).append("<td>"+foodPrice+"</td>");
    	$(newtr).append("<td>"+foodNumber+"</td>");
    	$(newtr).append("<td>"+foodUnit+"</td>");
    	$(newtr).append('<td><span class="del">删除</span><br><span class="_edit">编辑</span></td>');
    	$("#addNewInfo").append(newtr);
		$("#addfood").hide();
	})
}
/****************************菜品列表的操作****************************/
function foodListOper(){
	$("#addNewInfo").on("click"," .del",function(){
		$(this).parent().parent().remove();
	});
	$("#addNewInfo").on("click","._edit",function(){
		var $tr = $(this).parent().parent();
		$("#editfood").show();
		//讲点击的这条记录的菜名绑定在对话框中
		$("#editFoodName").attr("data",$tr.find("td").eq(1).find("span").text())
		var _edittr = $(this).parent().parent();
		var index = $("table tr").index(_edittr);
		dialogSave(index-1);
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
}

/****************************弹出框的保存按钮****************************/
function dialogSave(index){
	$("#editfood .dialogSave").attr("index",index)
	$("#editfood .dialogSave").bind("click",function(){
		var foodType = $("#editfoodtype option:selected").text();
    	var foodName = $("#editFoodName").val();
    	var foodQuantity =  $("#editFoodNumber").val();
    	var foodUnit = $("#editFoodUnit").val();
    	var foodPrice = $("#editFoodPrice").val();
    	var foodNumber = $("#editFoodNumber").val();
    	var addFoodPic = $("#editUpload_img").attr("data");
		//表单验证
		if(!foodType || !foodName || !foodQuantity || !foodUnit || !foodPrice || !foodNumber || !addFoodPic){
			alert("信息输入不完整");
			return false;
		}
		//获取菜品信息
    	var tr = $(".table .addNewInfo tr").eq($(this).attr("index"));
		tr.find("td").eq(0).html(foodType);
		tr.find("td").eq(0).attr("data",$("#editfoodtype option:selected").val());//类型码
		tr.find("img").eq(0).attr("src",addFoodPic);
		tr.find("span").eq(0).html(foodName);
		tr.find("td").eq(2).html(foodPrice);
		tr.find("td").eq(3).html(foodNumber);
		tr.find("td").eq(4).html(foodUnit);
		$("#editfood").hide();
	});
}

/****************************插件初始化****************************/
function init(){
	/****************富文本编辑器上传图片**************/
    var uploaderTxt = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true,
        // swf文件路径
        swf: '../lib/webuploader/Uploader.swf',
        // 文件接收服务端。
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
   /****************产品首图上传图片**************/
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
  /****************产品相册上传图片**************/
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
   /****************新增菜品的列表上传图片**************/
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
    /****************修改菜品的列表上传图片**************/
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
    /****************时间控件初始化**************/
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
    /****************使用规则富文本编辑器ueditor初始化**************/
    var userRules = UE.getEditor('userRules',{autoHeightEnabled: false});
    var ue = UE.getEditor('userRules',{enableAutoSave: false});
    /****************图文描述富文本编辑器ueditor初始化**************/
    var textDescribe=UE.getEditor('textDescribe',{autoHeightEnabled: false});
    var ue = UE.getEditor('textDescribe',{enableAutoSave: false});
    
     /****************自定义人数的弹框**************/
    $("#custom").click(function(){
    	$("#bounced").css("display","block");
    });
    $("#bounced .ensure").click(function(){
    	$("#bounced").css("display","none");
    	var str = $("#bounced input").eq(0).val().trim()+"-";
    	str += $("#bounced input").eq(1).val().trim()+"人餐";
    	$("#custom").html(str);
    });
   /****************按钮的切换**************/
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
    })
    /****************弹出层**************/
    $("#addfood .close").click(function () {
        $("#addfood").hide();
    })
    
    $("#editfood .close").click(function () {
        $("#editfood").hide();
    })
    $("footer #cancel").click(function () {
        window.location.href="foodOrdersList.html";
    })
    //表单验证
    $("#foodPrice,#editFoodPrice").bind("blur",function(){
        var value = $(this).val();
        var reg = /^\d+(\.\d+)?$/;
        if(!reg.test(value) || value == ""){
        	$(this).next().css("display","block");
        	$(this).focus();
        	return false;
        }else{
        	$(this).next().css("display","none");
        	return true;
        }
    });
    $("#foodNumber,#editFoodNumber").bind("blur",function(){
        var value = $(this).val();
        var reg = /^[1-9]\d*$/;
        if(!reg.test(value) || value == ""){
        	$(this).next().css("display","block");
        	$(this).focus();
        	return false;
        }else{
        	$(this).next().css("display","none");
        	return true;
        }
    });
    $("#editFoodName,#addFoodName").bind("blur",function(){
    	var oldValue = $(this).attr("data");//原来的值
    	var flag = 0;
        var element = $(this);
        //获取列表中的菜名用于判断是否已近存在
		var $span = $("#addNewInfo tr td span");
		var name = [];
		for(var i = 0; i < $span.length;i=i+3){
			name.push($span.eq(i));
		}
		var valueName = [];
		for(var i = 0; i < name.length;i++){
			valueName.push(name[i].text());
		}
        if (!element.val()) {
	        element.next().css("display","inline-block");
	        element.focus();
	        return false;
	    }else {
	    	for(var i = 0;i < valueName.length;i++){
	    		if(valueName[i]==$(this).val()&&oldValue != valueName[i]){
	    			flag = 1;
	    			break;
	    		}
	    	}
	    	if(flag == 1){
	    		element.next().css("display","inline-block");
	    		element.next().html("菜品已经存在");
		        element.focus();
		        return false;
	    	}else{
	    		element.next().css("display","none");
	        	return false;
	    	}
	    }
    });	
    $("#foodName,#vipPrice,#originalCost,#validity").on("blur",function () {
        validate($(this));
    })
}

/********************弹出层的清空*********************/
function layerClear(){
	$("#foodtype").val("");
	$("#addFoodName").val("");
	$("#foodUnit").val("");
	$("#foodPrice").val("");
	$("#upload_img b").attr("data","");
	$("#upload_img>.webuploader-pick").css("background-image","")
}
/********************从 后台获取proID的信息渲染页面*********************/
function renderPage(proID){
	(function(){
		var strActionName="Product_GetProduct";
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
	        //cache: true,
	        data: datSubmit,
	        async: false,
	        timeout : ajaxTimeout,
	        beforeSend: function () {
	        },
	        success: function (objResult,textStatus) {
	            if (objResult.Result=="1"){
	                valueRender(objResult.Model);
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
	})();
	(function(){
		var strActionName="Product_GetProductDetail";
	    var arrActionParam = {
		    "strProductID":proID
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
	})();
}
function valueRender(obj){
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
				"listNo":foodType,
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
function saveAndSubmit(_this,proID){
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
		}else{
			productPhoto = productPhoto + temp.substring(temp.search("/U")) + ","
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
    var listtr = $("#addNewInfo tr");
    var listArr = [];
    var obj={}
    for(var i = 0; i < listtr.length;i++){
    	var listObj = {};
    	listObj.Type = listtr.eq(i).find("td").eq(0).attr("data");
    	listObj.Name = listtr.eq(i).find("td").eq(1).find("span").text();
    	listObj.Quantity = listtr.eq(i).find("td").eq(3).text();
    	listObj.Unit = listtr.eq(i).find("td").eq(4).text();
    	listObj.Price = listtr.eq(i).find("td").eq(2).text();
    	//图片去掉前缀
    	var temp = listtr.eq(i).find("td").eq(1).attr("data");
    	var addFoodPic = temp.substring(temp.search("/U"));
    	listObj.Pic = addFoodPic;
    	listArr.push(listObj);
    }
    
    var footList = JSON.stringify(listArr);
    
    //15.使用时间
    var useTime = $("#inpstart").val().trim()+","+$("#inpend").val().trim();
	//发送ajax请求
    var strActionName="Product_UpdateFoodPackage";
    var arrActionParam = {
	    "ProductID":proID,
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
	/*console.log("传入后台的数据",arrActionParam);*/
   	var strActionParam = JSON.stringify(arrActionParam);
    var strRequest = GetVisitData(strActionName, strActionParam);
    var datSubmit = { strRequest: strRequest };
    //发送ajax请求
    $.ajax({
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
}
