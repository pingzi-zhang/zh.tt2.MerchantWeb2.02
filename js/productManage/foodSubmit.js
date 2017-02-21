angular.module('myModule',[
]).controller('myController',function ($scope) {
	$scope.content = null;
})
var userMess=null;
 var userRulesText = null;
$(function(){
	window.parent.document.title=document.title;
	userMess = JSON.parse(sessionStorage.userInfo);
	elementInit();
	var index = location.search.split("&");
	var value = [];
	for(var i = 0; i < index.length;i++){
		var temp = index[i].split("=");
		value.push(temp[1]);
	}
	renderInit(value);
	foodSubmit();
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
}
//请求的对象渲染整个页面 valueInit
function valueInit(obj){
	$("#foodName").val(obj.Name);
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
	}
	$("#diningNum").find("div").eq(people-1).addClass("on");
	
	$("#vipPrice").val(obj.Buy);
	$("#originalCost").val(obj.Market);
	//菜品列表
	var list = obj.FoodList;
	//渲染页面
    foodList = obj.FoodList;
    for(var i = 0; i < list.length;i++){
    	var value={
			"foodType":list[i].Type,
			"foodName":list[i].Name,
			"foodImg":list[i].Pic,
			"foodPrice":list[i].Price,
			"foodNum":1,
			"foodUnit":list[i].Unit
			};
	    var html=template("template-tr",{value});
	    $("#addNewInfo").html($("#addNewInfo").html()+html);
    }
	//模式
	$("#busCrowd").find("div").eq(obj.CancelModel-1).addClass("on");
	//有效期
	$("#validity").val(obj.Effective);
	//使用规则
	$("#userRules").html(obj.Notice);
	 var b=document.createElement("b");
    $(".product_img").append(b)
    b.setAttribute("data",obj.First);
	$("#product_img>.webuploader-pick").css("background-image",'url('+obj.First+')');
	var album = obj.Album.split(",");
	for(var i = 0; i < album.length;i++){
		$("#product_album_list").append('<img src="'+album[i] +'" alt="">');
	}
}
//弹出层的清空
function layerClear(){
	$("#foodtype").val("");
	$("#addFoodName").val("");
	$("#foodUnit").val("");
	$("#foodPrice").val("");
	$("#upload_img b").attr("data","");
	$("#upload_img>.webuploader-pick").css("background-image","")
}
function foodSubmit(){
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
    });
    layer_add();
    //整个页面的保存和保存并提交的按钮监听事件
    $("#save").bind("click",function(){
    	saveSubmit($(this));
    });
    $("#submit").bind("click",function(){
    	saveSubmit($(this));
    });   
}
var arr = [];
function layer_add(){
	//给每一个添加的菜品都加一个listID存入数组
	 //添加菜品的验证
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
    var listindex = 0;
    //将页面中的记录值存入数组
    var $tr = $(".table tbody tr");
    for(var i = 0;i < $tr.length;i++){
    	var value = {
	    	Type:$tr.find("td").eq(0).html(),
			Name:$tr.find("td").eq(1).find("span").html(),
			Quantity:$tr.find("td").eq(3).html(),
			Unit:$tr.find("td").eq(4).html(),
			Price:$tr.find("td").eq(2).html(),
			Pic:$tr.find("td").eq(1).find("img").attr("src")
    	}
    	arr.push(value);
		listindex++;
    }
    var flag = 0;
    //新加的保存按钮
    $("#foodSave").click(function(){
    	for(var i = 0;i < arr.length;i++){
    		if(arr[i].Name == $("#addFoodName").val()){
    			flag = 1;
    		}
    	}
    	if($("#upload_img b").length == 0){
    		$(".pic_tip").css("display","block");
    		flag = 0;
    	}
    	if(flag == 0){
    		if($("#addFoodName").val() == ""){
	    		$("#addFoodName").next().css("display","inline-block");
	        	$("#addFoodName").focus();
	    	}else if($("#upload_img b").length == 0){
	    		$(".pic_tip").css("display","block");
	    	}else{
	    		saveBtn();
    			layerClear();
	    	}
    	}else{
    		$("#addFoodName").next().css("display","inline-block").html("*菜品已经存在");
	        $("#addFoodName").focus();
    		flag = 0;
    	}
    	$(".del").bind("click",function(){
    	$(this).parent().parent().remove();
		//通过菜品名称判断当前要删除的记录根据index
		var trindex = $(this).parent().parent().index();
		for(var i = 0;i < arr.length;i++){
			if(trindex == i){
				for(var j = i;j<arr.length;j++){
					arr[j] = arr[j+1];
				}
				break;
			}
		}
		arr.length = arr.length - 1;
    });
    
    $("._edit").bind("click",function(){
    	$(".layer_bg:last").show();
		$(".layer_addFood .close:last").click(function () {
	        $(".layer_bg:last").hide();
	   });
	    var trindex = $(this).parent().parent().index();
		$("#editFoodtype").val(arr[trindex].Type);
		$("#editFoodName").val(arr[trindex].Name);
		$("#editFoodUnit").val(arr[trindex].Unit);
		$("#editFoodPrice").val(arr[trindex].Price);
		$("#editUpload_img b").attr("data",arr[trindex].Pic);
		$("#editUpload_img>.webuploader-pick").css("background-image",'url('+arr[trindex].Pic+')')
    	/* 编辑界面的保存按钮*/
	  	$("#editFoodSave").click(function(){
	  		var editflag = 0;
	  		for(var i = 0;i < arr.length;i++){
	    		if(arr[i].Name == $("#editFoodName").val()&&trindex != i){
	    			editflag = 1;
	    		}
	    	}
	    	if(editflag == 0){
	    		if($("#editFoodName").val() == ""){
		    		$("#editFoodName").next().css("display","inline-block");
		        	$("#editFoodName").focus();
		    	}else{
		    		editSaveBtn(trindex);
	    			layerClear();
		    	}
	    	}else{
	    		$("#editFoodName").next().css("display","inline-block").html("*菜品已经存在");
		        $("#editFoodName").focus();
	    		editflag = 0;
	    	}
	    	$(".layer_bg:last").hide();
	    	alert("修改已完成")
	  	});
    });
    });
    $(".del").bind("click",function(){
    	$(this).parent().parent().remove();
		//通过菜品名称判断当前要删除的记录根据index
		var trindex = $(this).parent().parent().index();
		for(var i = 0;i < arr.length;i++){
			if(trindex == i){
				for(var j = i;j<arr.length;j++){
					arr[j] = arr[j+1];
				}
				break;
			}
		}
		arr.length = arr.length - 1;
    });
    
    $("._edit").bind("click",function(){
    	$(".layer_bg:last").show();
		$(".layer_addFood .close:last").click(function () {
	        $(".layer_bg:last").hide();
	   });
	    var trindex = $(this).parent().parent().index();
		$("#editFoodtype").val(arr[trindex].Type);
		$("#editFoodName").val(arr[trindex].Name);
		$("#editFoodUnit").val(arr[trindex].Unit);
		$("#editFoodPrice").val(arr[trindex].Price);
		$("#editUpload_img b").attr("data",arr[trindex].Pic);
		$("#editUpload_img>.webuploader-pick").css("background-image",'url('+arr[trindex].Pic+')')
    	/* 编辑界面的保存按钮*/
	  	$("#editFoodSave").click(function(){
	  		var editflag = 0;
	  		for(var i = 0;i < arr.length;i++){
	    		if(arr[i].Name == $("#editFoodName").val()&&trindex != i){
	    			editflag = 1;
	    		}
	    	}
	    	if(editflag == 0){
	    		if($("#editFoodName").val() == ""){
		    		$("#editFoodName").next().css("display","inline-block");
		        	$("#editFoodName").focus();
		    	}else{
		    		editSaveBtn(trindex);
	    			layerClear();
		    	}
	    	}else{
	    		$("#editFoodName").next().css("display","inline-block").html("*菜品已经存在");
		        $("#editFoodName").focus();
	    		editflag = 0;
	    	}
	    	$(".layer_bg:last").hide();
	    	alert("修改已完成")
	  	});
    });
}
//保存按钮的单击事件
function saveBtn(){
	var foodType = $("#foodtype").val();
	switch(foodType){
		case "冷菜":
			foodType = "1";
			break;
		case "热菜":
			foodType = "2";
			break;
		case "点心":
			foodType = "3";
			break;
		case "饮料":
			foodType = "4";
			break;
		default:
			foodType = "9";
			break;
	}
	var foodName = $("#addFoodName").val();
	var foodQuantity = 10;
	var foodUnit = $("#foodUnit").val();
	var foodPrice = $("#foodPrice").val();
	var addFoodPic = $("#upload_img b").attr("data")
	/*addFoodPic = addFoodPic.substring(addFoodPic.search("/U"));*/
	var value = {
		Type:foodType,
		Name:foodName,
		Quantity:foodQuantity,
		Unit:foodUnit,
		Price:foodPrice,
		Pic:addFoodPic
	}
	arr.push(value);
	//添加菜品在页面显示
	var value={
			"foodType":$("#foodtype").val(),
			"foodName":foodName,
			"foodImg":$("#upload_img b").attr("data"),
			"foodPrice":foodPrice,
			"foodNum":1,
			"foodUnit":foodUnit
			};
    var html=template("template-tr",{value});
    $("#addNewInfo").html($("#addNewInfo").html()+html);
}

//编辑界面的代码
function editSaveBtn(_index){
	var foodType = $("#editFoodtype").val();
	switch(foodType){
		case "冷菜":
			foodType = "1";
			break;
		case "热菜":
			foodType = "2";
			break;
		case "点心":
			foodType = "3";
			break;
		case "饮料":
			foodType = "4";
			break;
		default:
			foodType = "9";
			break;
	}
	var foodName = $("#editFoodName").val();
	var foodQuantity = 10;
	var foodUnit = $("#editFoodUnit").val();
	var foodPrice = $("#editFoodPrice").val();
	var addFoodPic = $("#editUpload_img b").attr("data");
	//同一个菜名不能存在	
	arr[_index].Type=foodType;
	arr[_index].Name=foodName;
	arr[_index].Quantity=foodQuantity;
	arr[_index].Unit=foodUnit;
	arr[_index].Price=foodPrice;
	arr[_index].Pic=addFoodPic; 
	var tr = $(".table .addNewInfo tr").eq(_index);
	tr.find("td").eq(0).html(foodType);
	tr.find("img").eq(0).attr("src",addFoodPic);
	tr.find("span").eq(0).html(foodName);
	tr.find("td").eq(2).html(foodPrice);
	tr.find("td").eq(4).html(foodUnit);
}
function elementInit(){
	var userMess = JSON.parse(sessionStorage.userInfo);
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
    });
     //表单非空验证
    $("#foodName,#vipPrice,#originalCost,#validity,#editFoodName,#editFoodName，#editFoodName,#addFoodName").on("blur",function () {
        validate($(this));
    })
    //时间选择控件初始化
    var start = {
        format: 'YYYY-MM-DD',
        minDate: "1900-01-01 00:00:00", //设定最小日期为当前日期
        isinitVal: true,
        festival: true,
        ishmsVal: false,
        maxDate: '2099-06-30 23:59:59', //最大日期
        choosefun: function (elem, datas) {
            end.minDate = datas; //开始日选好后，重置结束日的最小日期
        }
    };
    var end = {
        format: 'YYYY-MM-DD',
        minDate: "1900-01-01 00:00:00", //设定最小日期为当前日期
        isinitVal: true,
        festival: true,
        maxDate: '2099-06-16 23:59:59', //最大日期
        choosefun: function (elem, datas) {
            start.maxDate = datas; //将结束日的初始值设定为开始日的最大日期
        }
    };
    
    $('#inpstart').jeDate(start);
    $('#inpend').jeDate(end);
	
	
    //富文本编辑器ueditor初始化
    var userRules = UE.getEditor('userRules',{autoHeightEnabled: false});
    var textDescribe=UE.getEditor('textDescribe',{autoHeightEnabled: false});
    //使用规则的text
    var ue = UE.getEditor('userRules',{enableAutoSave: false});
    //实时预览功能
    var DescribeText = null;
    ue.addListener("contentChange",function () {
        userRulesText=document.getElementById('ueditor_0').contentWindow.document.body.innerHTML;
        userRulesText = userRulesText.substring(3);
        var length = userRulesText.length;
        userRulesText = userRulesText.substring(0,length-4);
    });
     //使用图片描述的text
    var ue = UE.getEditor('textDescribe',{enableAutoSave: false});
    //实时预览功能
    ue.addListener("contentChange",function () {
        DescribeText=document.getElementById('ueditor_1').contentWindow.document.body.innerHTML;
        DescribeText = DescribeText.substring(3);
        var length = DescribeText.length;
        DescribeText = DescribeText.substring(0,length-4);
    });
}
//保存和提交要执行的函数
function saveSubmit(){
	_status = 1;
	//提交时间的格式化
	var dat = new Date();
	var mender = userMess.WaiterID;
	//1.产品编号ID
	var proID = userMess.MerchantID;
	//2.套餐标题
    var name= $("#foodName").val();
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
    if($("#diningNum .personNum").eq(0).val()||$("#diningNum .personNum").eq(1).val()){
    	diningNum = $("#diningNum .personNum").eq(0).val()+"-"+$("#diningNum .personNum").eq(1).val();
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
    var validity = parseInt($("#validity").val());
    //7.购买须知
    var notice = userRulesText;
    //8.首图
    var firstPic = $("#productImg b").attr("data");
   /* firstPic = firstPic.substring(firstPic.search("/U"));*/
    //9.相册
    var productPhoto = "";
    var length = $("#product_album_list img").length;
	for(var i = 0; i < length;i++){
		var temp = $("#product_album_list img").eq(i).attr("src");
		//排除最后一张图片，不需要，
		if(i == length-1){
			/*productPhoto = productPhoto + temp.substring(temp.search("/U"));*/
			productPhoto = productPhoto + $("#product_album_list img").eq(i).attr("src");
		}else{
			/*productPhoto = productPhoto + temp.substring(temp.search("/U")) + ","*/
			productPhoto = productPhoto + $("#product_album_list img").eq(i).attr("src") + ","
			
		}
	}
    //10.单位
    var unit = "单";
    //11.状态
    var status = _status;
    //12.修改人编码
    var mender = userMess.WaiterID;
    //13.提交时间
    var submitDate = dat.getFullYear()+"-"+(dat.getMonth()+1)+"-"+dat.getDate();
    //14.菜单列表
    var footList = JSON.stringify(arr);
    	//发送ajax请求
        var strActionName="Product_AddFoodPackage";
        var arrActionParam = {
		    "MerchantID":proID,
		    "Name":name,
		    "Buy":parseFloat(vipPrice),
		    "Market":parseFloat(originalCost),
		    "CancelModel":parseInt(supportQuit),
		    "Effective":parseInt(validity),
		    "Notice":notice,
		    "First":firstPic,
		    "Album":productPhoto,
		    "Unit":unit,
		    "Status":parseInt(status),
		    "Creator":mender,
		    "Submit":submitDate,
		    "UseNum":diningNum,
			"FoodList":footList
		    }; 
       	var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);
        var datSubmit = { strRequest: strRequest };
        //发送ajax请求
        $.ajax({
            url: jsgDataUrl+jsgDataGate,
            type: "POST",
            dataType: "json",
            //cache: true,
            data: datSubmit,
            timeout : ajaxTimeout,
            async: true,
            //timeout: 60000,
            beforeSend: function () {
            },
            success: function (objResult,textStatus) {
                if (objResult.Result=="1"){
                    if(_status == 0){
                    	alert("已保存");
                    }else{
                    	window.location.href='submitOK.html';
                    }
                }else if(objResult.Result=="-99"){
                	console.log(objResult);
                    alert("输入信息不完整");
                    if(!$("#foodName").val()){
                    	$("#foodName").focus();
                    	$("#foodName").next().css("display","inline-block");
                    }else
                    if(!$("#vipPrice").val()){
                    	$("#vipPrice").focus();
                    	$("#vipPrice").next().css("display","inline-block");
                    }else
                    if(!$("#originalCost").val()){
                    	$("#originalCost").focus();
                    	$("#originalCost").next().css("display","inline-block");
                    }else
                    if(!$("#validity").val()){
                    	$("#validity").focus();
                    	$("#validity").next().css("display","inline-block");
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
            	
                // alert(XMLHttpRequest.status);
                // alert(XMLHttpRequest.readyState);
                // alert(textStatus);
            }
       });
}
