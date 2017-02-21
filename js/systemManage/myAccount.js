$(function () {
		window.parent.document.title=document.title;
		var userMess = JSON.parse(sessionStorage.userInfo);
		var strActionName="Mer_GetWaiter";
        var arrActionParam = {
            "MerchantID":userMess.MerchantID
        };
        var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);
        var datSubmit = { strRequest: strRequest };
        $.ajax({
            url: jsgDataUrl+jsgDataGate,
            type: 'post',
            dataType: 'json',
            data: datSubmit,
            timeout : ajaxTimeout,
            async: true,
            beforeSend: function () {
            },
            success: function  (objResult,textStatus) {
                if(objResult.Result == 1){
                    reviseShow(objResult.Model);
                }else{
                    //alert("输入信息不完整");
                }
            },
            error: function  () {
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){
		　　　　　  alert("请求超时");
		　　　　}
		　　}
        })
    function reviseShow(obj){
    	$("#busName").val(obj.Name);
    	$("#busIndustry div").eq(obj.Sex).addClass("on").siblings().removeClass("on");
    	if(obj.Head != ""){
			$("#product_album_list").css("background-image",'url('+obj.Head+')');
			$("#product_album b").attr("data",obj.Head);
    	}
    	//对返回的字符串进行日期化
		var temp = obj.Birth;
		var startDat = new Date(parseInt(temp.substring(6,temp.length-2)));
        startDat = startDat.getFullYear()+"-"+parseInt(startDat.getMonth() + 1)+"-"+startDat.getDate();
        $("#inpstart").val(startDat);
		$("#busPhone").html(obj.Mobile);
    }
//	var userMess = JSON.parse(sessionStorage.userInfo);
    //上传图片控件实例化
    //1.头像上传
    var uploader1 = WebUploader.create({
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
    
    uploader1.on('uploadSuccess',function (file, response) {
    	var showUrl = response.ShowUrl;
    	
    	$("#product_album_list").css("background-image",'url('+response.ShowUrl+')');
    	var b=document.createElement("b");
    	b.setAttribute("data",response.ShowUrl);
    	$("#product_album").append(b);  
    });
    jeDate({
    	format: 'YYYY-MM-DD',
		dateCell:"#inpstart",
		isinitVal:true,
		isTime:false, //isClear:false,
		minDate:"1900-01-01"
	})
  
    //选择按钮切换
    $(".select div").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
    })
	
    //手机验证
    $("#busPhone").blur(function () {
        var re=/^1[3|4|5|7|8]\d{9}$/;
        if(!re.test($(this).val().trim()) && $(this).val().length > 0){
            $(this).next().css('display', 'inline-block').html("<s></s>手机格式不正确");
            $(this).focus();
        }else{
            validate($(this));
        }
    })

    $("#busSubmt").click(function() {
    	var name = $("#busName").val();
    	var head = $("#product_album b").attr("data");
    	if(!head){
    		head = "../../images/poto.jpg";
    	}
    	else{
    		head = head.substring(head.search("/U"));
    	}
    	var sex = $("#busIndustry").find(".on").html();
    	if(sex.substring(7) == "男"){
    		sex = 1;
    	}else if(sex.substring(7) == "女"){
    		sex = 0;
    	}else {
    		sex = 2;
    	}
    	var birth = $("#inpstart").val();
    	var strActionName="Mer_UpdateWaiter";
        var arrActionParam = {
            "WaiterID":userMess.WaiterID,
			"Name":name,
			"Head":head,
			"Sex":sex,
			"Birth":birth
        };
        var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);
        var datSubmit = { strRequest: strRequest };
        $.ajax({
            url: jsgDataUrl+jsgDataGate,
            type: 'post',
            dataType: 'json',
            data: datSubmit,
            timeout : ajaxTimeout,
            async: true,
            beforeSend: function () {
            },
            success: function  (objResult,textStatus) {
                if(objResult.Result == 1){
                	window.location.href="../systemManage/saveOk.html";
                }else{
                    //alert("输入信息不完整");
                }
            },
            error: function  () {
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
		　　　　if(status=='timeout'){
		　　　　　  alert("请求超时");
		　　　　}
		　　}
        })
    });
})