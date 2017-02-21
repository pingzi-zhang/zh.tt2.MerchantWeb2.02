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
    
    //接待时间-时间选择控件初始化
    $.jeDate('#serverStart',{format:"hh:mm"});
    $.jeDate('#serverEnd',{format:"hh:mm"});
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
    
     //使用图片描述的text
    var ue = UE.getEditor('textDescribe',{enableAutoSave: false});
    
     //表单非空验证
    $("#foodName,#vipPrice,#originalCost,#validity").on("blur",function () {
        validate($(this));
    })
    //选择按钮的切换
    $("#receiveTime div").click(function () {
        $(this).toggleClass("on");
    })
    $("#dingPeriod div").click(function () {
        $(this).toggleClass("on");
    })
    //限制用餐时间的按钮切换
    $("#diningHours div").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
        //若选择为限制用餐时间，时间的限长为必填项
        if($(this).index()==2){
        	$("#diningHours input").focus();
        	$("#diningHours input").on("blur",function () {
		        validate($(this));
		    })
        }else{
        	$("#diningHours input").val("");
        }
    }) 
    //随时退
    $("#busCrowd div").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
    })
    
    //保存和保存并提交的按钮监听事件
    $("#save").bind("click",saveSubmit);
    $("#busSubmit").bind("click",saveSubmit);
  
    //保存和提交要执行的函数
    function saveSubmit(){
    	var _status = null;
    	//0是保存，1保存并提交
    	if($(this).html()=="保存"){
    		_status = 0;
    	}else{
    		_status = 1;
    	}
    	
        //提交时间的格式化
    	var dat = new Date();
    	//1.产品编号ID
    	var merchantID = userMess.MerchantID;
    	//2.套餐标题
        var name= $("#foodName").val();
        //用餐时段
        var period= "";
    	var ele = $("#dingPeriod .on");
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
        //2.星期几接待
        var week= "";
    	var ele = $("#receiveTime .on");
    	var length = ele.length;
    	for(var i = 0;i < length;i++){
    		var str = ele[i].innerHTML.substring(7);
    		switch(str){
    			case "周一":
    				 week = week+",1";
    				 break;
    			case "周二":
    				 week = week+",2";
    				 break;
    			case "周三":
    				 week = week+",3";
    				 break;
    			case "周四":
    				 week = week+",4";
    				 break;
    			case "周五":
    				 week = week+",5";
    				 break;
    			case "周六":
    				 week = week+",6";
    				 break;
    			case "周日":
    				 week = week+",7";
    				 break;
    		}
    	}
    	week = week.substring(1);
        //3.接待时间
        var startTime=$("#serverStart").val();
        var endTime=$("#serverEnd").val();
        var reception=startTime +"-"+endTime
        //4.用餐时长限制
        var diningHours=parseInt($("#diningHours input").val()||0);
        //5.分销价
        var vipPrice=parseFloat($("#vipPrice").val());
        //6.门店价
        var originalCost=parseFloat($("#originalCost").val());
        //5.退票模式
        var busCrowd= $("#busCrowd .on").text();
        if(busCrowd == "是"){
        	busCrowd = 1;
        }else{
        	busCrowd = 0;
        }
        //6.有效期
        var validity = parseInt($("#validity").val());
       
       	var useU = document.getElementById('ueditor_0').contentWindow.document.body;
        var notice = useU.innerHTML;
        //7.图文描述
    	var content=document.getElementById('ueditor_1').contentWindow.document.body;
        var picDescription= content.innerHTML;

        //8.首图
        var firstPic = $("#productImg b").attr("data");
        firstPic = firstPic.substring(firstPic.search("/U"));
        //9.相册
        var productPhoto = "";
        var length = $("#product_album_list img").length;
    	for(var i = 0; i < length;i++){
    		var temp = $("#product_album_list img").eq(i).attr("src");
    		//排除最后一张图片，不需要逗号
    		if(i == length-1){
    			/*productPhoto = productPhoto + $("#product_album_list img").eq(i).attr("src");*/
    			productPhoto = productPhoto + temp.substring(temp.search("/U"));
    		}else{
    			/*productPhoto = productPhoto + $("#product_album_list img").eq(i).attr("src") + ","*/
    			productPhoto = productPhoto + temp.substring(temp.search("/U")) + ","
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
        //15使用时间
        var useTime = $("#inpstart").val().trim()+","+$("#inpend").val().trim();
        //发送ajax请求
        var strActionName="Product_AddFoodBuffet";
        var arrActionParam = {
		    "MerchantID":merchantID,
			"Week":week,
			"Reception":reception,
			"Name":name,
			"Meal":period,
		   	"Buy":vipPrice,
		   	"Market":originalCost,
			"CancelModel":busCrowd,
			"LongMeal":diningHours,
		   	"Effective":validity,
		   	"Notice":notice,
			"First":firstPic,
		   	"Album":productPhoto,
		   	"Unit":unit,
			"Status":status,
			"Creator":mender,
			"Submit":submitDate,
			"Change":notice,
			"Description":picDescription,
			"UseTime":useTime
		    }; 
		  console.log("传入的参数",arrActionParam);
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
                // alert(XMLHttpRequest.status);
                // alert(XMLHttpRequest.readyState);
                // alert(textStatus);
            }
        });
    }    
})

