angular.module('myModule',[
]).controller('myController',function ($scope) {
	$scope.content = null;
})
$(function () {
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
    //
    //
    //
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
        $("#layer .pic_tip").css("display","none");
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
    $("#foodName,#vipPrice,#originalCost,#validity,#editFoodName,#addFoodName,#foodPrice").on("blur",function () {
        validate($(this));
    })
    //时间选择控件初始化
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
    //选择用餐时段切换
    $("#diningDate div").click(function () {
        $(this).toggleClass("on");
    })
    //富文本编辑器ueditor初始化
    var userRules = UE.getEditor('userRules',{autoHeightEnabled: false});
    var textDescribe=UE.getEditor('textDescribe',{autoHeightEnabled: false});
    //使用规则的text
    var ue = UE.getEditor('userRules',{enableAutoSave: false});
    //实时预览功能
    /*var userRulesText = null;*/
 /*   userRules.addListener("contentChange",function () {
        userRulesText=document.getElementById('ueditor_0').contentWindow.document.body.innerHTML;
        userRulesText = userRulesText.substring(3);
        var length = userRulesText.length;
        userRulesText = userRulesText.substring(0,length-4);
    });*/
     //使用图片描述的text
    var ue = UE.getEditor('textDescribe',{enableAutoSave: false});
    
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
    
	//弹出层的清空
	function layerClear(){
		$("#foodtype").val("");
		$("#addFoodName").val("");
		$("#foodUnit").val("");
		$("#foodPrice").val("");
		$("#foodNumber").val("");
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
    //价格验证
    var price = $("#foodPrice");
    price.blur(function(){
        var value = price.val();
        var reg =  /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
        if(!reg.test(value) || value == ""){
        	price.next().css("display","block");
        	price.focus();
        }else{
        	price.next().css("display","none");
        }
    });
    //数量验证
    var number1 = $("#foodNumber");
    number1.blur(function(){
        var value = number1.val().trim();
        var reg = /^[1-9][0-9]*$/;
        if(!reg.test(value) || value == ""){
        	number1.next().css("display","block");
        	number1.focus();
        }else{
        	number1.next().css("display","none");
        }
    });
    var newFoodValue = [];
    var productPhoto=null;
    var flag = 0;
    //添加菜品的弹出层
    var index = 0;
    $("#foodSave").click(function(){
    	$(".addFoodSpace").addClass("hidden");
    	for(var i = 0;i < newFoodValue.length;i++){
    		if(newFoodValue[i].Name == $("#addFoodName").val()){
    			flag = 1;
    		}
    	}
    	if($("#upload_img b").length == 0){
    		$("#layer .pic_tip").css("display","block");
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
        //删除按钮的事件
        $(".del").on("click",function(){
    		$(this).parent().parent().remove();
    		//通过菜品名称判断当前要删除的记录
    		var foodName = $(this).parent().siblings().eq(1).find("span").html();
    		for(var i = 0;i < newFoodValue.length;i++){
    			if(foodName == newFoodValue[i].Name){
    				for(var j = i;j < newFoodValue.length;j++){
    					newFoodValue[j] = newFoodValue[j+1];
    				}
    				break;
    			}
    		}
    		newFoodValue.length = newFoodValue.length-1;
    		if($(".table .addNewInfo tr").length==0){
    			$(".addFoodSpace").removeClass("hidden");
    		}
    	});
    	//修改菜品的弹出层
		$("._edit").on("click",function(){
			$(".layer_bg:last").show();
			$(".layer_addFood .close:last").click(function () {
		        $(".layer_bg:last").hide();
		    });
			var foodName = $(this).parent().siblings().eq(1).find("span").html();
			for(var i = 0;i < newFoodValue.length;i++){
				if(foodName == newFoodValue[i].Name){
					index = i;
					var foodType = "";
					var seloption=$("#editfoodtype option");
					for(var i = 0; i < seloption.length;i++){
						if($("#editfoodtype option").eq(i).attr("value") == newFoodValue[index].Type){
							$("#editfoodtype option")[i].selected = true;
							break;
						}
					}
					
					$("#editFoodtype").val(foodType);
					$("#editFoodName").val(newFoodValue[index].Name);
					$("#editFoodUnit").val(newFoodValue[index].Unit);
					$("#editFoodPrice").val(newFoodValue[index].Price);
					$("#editFoodNumber").val(newFoodValue[index].Quantity);
					var pic = newFoodValue[index].Pic
					pic = pic.substring(pic.search("/U"));//addFoodPic.substring(addFoodPic.search("/U"));
					if($("#editUpload_img b").length){
						$("#editUpload_img b").attr("data",pic);//editUpload_img
					}else{
						$("#editUpload_img").append("<b data="+pic+"></b>");	
					}
					$("#editUpload_img>.webuploader-pick").css("background-image",'url('+jsgImageUrl+pic+')');
					break;
				}
			}
		});
    });
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
    	alert("修改已完成")
    })
    
    //编辑界面的代码
    function editSaveBtn(_index){
    	var foodType = $("#editfoodtype").val();
    	var foodName = $("#editFoodName").val();
    	var foodUnit = $("#editFoodUnit").val();
    	var foodPrice = $("#editFoodPrice").val();
    	var foodNumber = $("#editFoodNumber").val();
    	var addFoodPic = $("#editUpload_img b").attr("data");
    	//同一个菜名不能存在	
    	newFoodValue[_index].Type=foodType;
		newFoodValue[_index].Name=foodName;
		newFoodValue[_index].Unit=foodUnit;
		newFoodValue[_index].Price=foodPrice;
		newFoodValue[_index].Quantity = foodNumber;
		newFoodValue[_index].Pic=addFoodPic.substring(addFoodPic.search("/U"));
		var tr = $(".table .addNewInfo tr").eq(_index);
		tr.find("td").eq(0).html($("#editfoodtype option:selected").text());
		tr.find("img").eq(0).attr("src",jsgImageUrl+newFoodValue[_index].Pic);
		tr.find("span").eq(0).html(foodName);
		tr.find("td").eq(2).html(foodPrice);
		tr.find("td").eq(3).html(foodNumber);
		tr.find("td").eq(4).html(foodUnit);
    }
    
    //保存按钮的单击事件
    function saveBtn(){
    	var foodType = $("#foodtype").val();
    	/*alert("foodType"+foodType);*/
    	/*switch(foodType){
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
    	}*/
    	var foodName = $("#addFoodName").val();
    	var foodNumber = parseInt($("#foodNumber").val());
    	var foodUnit = $("#foodUnit").val();
    	var foodPrice = $("#foodPrice").val();
    	var addFoodPic = $("#upload_img b").attr("data");
    	addFoodPic = addFoodPic.substring(addFoodPic.search("/U"));
    	
    	var value = {
    		Type:foodType,
			Name:foodName,
			Quantity:foodNumber,
			Unit:foodUnit,
			Price:foodPrice,
			Pic:addFoodPic
    	}
    	newFoodValue.push(value);
    	var imgStrim = $("#upload_img b").attr("data");
    	imgStrim = imgStrim.substring(imgStrim.search("/U"));
    	//添加菜品在页面显示
    	var value={
    			"foodType":$("#foodtype option:selected").text(),
    			"foodName":foodName,
    			"foodImg":jsgImageUrl+imgStrim,
    			"foodPrice":foodPrice,
    			"foodNumber":foodNumber,
    			"foodUnit":foodUnit
    		};
        var html=template("template-tr",{value:value});
        $("#addNewInfo").html($("#addNewInfo").html()+html);
    };
    
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
    //保存和保存并提交的按钮监听事件
    $("#save").bind("click",saveSubmit);
    $("#submit").bind("click",saveSubmit);
    //保存和提交要执行的函数
    function saveSubmit(){
    	var _status = null;
    	if($(this).html()=="保存"){
    		_status = 0;
    	}else{
    		_status = 1;
    	}
    	//提交时间的格式化
    	var dat = new Date();
    	//1.产品编号ID
    	var proID = userMess.MerchantID;
    	//2.套餐标题
        var name= $("#foodName").val();
        //用餐时段
        var period= "";
    	var ele = $("#diningDate .on");
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
        diningNum= $("#diningNum .on").html().substr(0,$("#diningNum .on").html().length-2);
        //alert(diningNum);
        if(diningNum=="单"){
        	diningNum ="1"; 
        }else if(diningNum=="双"){
            diningNum ="2"; 
        }else if(diningNum=="3-4"){
            diningNum ="3-4"; 
        }else if(diningNum=="4-5"){
            diningNum ="4-5"; 
        }else if(diningNum=="5-6"){
            diningNum ="5-6"; 
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
        //使用规则
        /*var str = userRulesText.split("</p><p>");
        var notice ="";
        for(var i = 0; i < str.length;i++){
        	notice = notice +str[i];
        }*/
       	var useU = document.getElementById('ueditor_0').contentWindow.document.body;
        var notice = useU.innerHTML;
        //7.图文描述
    	var content=document.getElementById('ueditor_1').contentWindow.document.body;
        var picDescription= content.innerHTML;
        //8.首图
        var firstPic = $("#productImg b").attr("data");
        if(firstPic){
        	firstPic = firstPic.substring(firstPic.search("/U"));
        }
        //9.相册
        var productPhoto="";
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
        //15使用时间
        var useTime = $("#inpstart").val().trim()+","+$("#inpend").val().trim();
        //发送ajax请求
        var strActionName="Product_AddFoodPackage";
        var arrActionParam = {
		   "MerchantID":proID,
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
		    "Creator":mender,
		    "Submit":submitDate,
		    "UseNum":diningNum,
			"FoodList":footList,
			"Change":notice,
			"Description":picDescription,
			"UseTime":useTime
		    }; 
		console.log("传入后台的参数",arrActionParam);
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
            timeout: ajaxTimeout,
            beforeSend: function () {
            },
            success: function (objResult,textStatus) {
                if (objResult.Result=="1"){
                	alert("保存成功了")
                    if(_status == 0){
                    	window.location.href="saveOk.html";
                    }else{
                    	window.location.href='submitOK.html';
                    }
                }else if(objResult.Result=="-99"){
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
                    else{
                    	alert(objResult.Message);
                    	alert("输入信息不完整");
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
})
