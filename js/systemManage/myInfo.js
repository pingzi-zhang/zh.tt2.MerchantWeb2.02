$(function () {
		window.parent.document.title=document.title;
		var userMess = JSON.parse(sessionStorage.userInfo);
		var strActionName="Mer_GetMerchant";
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
    	$("#busBrief").val(obj.Brief);
    	$("#busIndustry div").eq(obj.Industry-1).addClass("on").siblings().removeClass("on");
    	$("#busCrowd div").eq(obj.Crowd).addClass("on").siblings().removeClass("on");
    	$("#busLinkman").val(obj.Linkman);
    	$("#busTelephone").val(obj.Telephone);
    	$("#busPhone").val(obj.Telephone);
    	$("#busMail").val(obj.Email);
    	$("#busAddress").val(obj.Address);
    	$("#busLicense").val(obj.License);
    	if(obj.LicenseP != ""){
    		$("#product_img>.webuploader-pick").css("background-image",'url('+obj.LicenseP+')');
    		$("#product_img>.webuploader-pick").attr("data",obj.LicenseP);
    	}
    	$("#busBankCode").val(obj.BankCode);
    	$("#busBank").val(obj.Bank);
    	$("#busAccount").val(obj.Account);
    	$("#busAlipay").val(obj.Alipay);
    	//对返回的字符串进行日期化
		var temp = obj.Begin;
		var startDat = new Date(parseInt(temp.substring(6,temp.length-2)));
        startDat = startDat.getFullYear()+"-"+parseInt(startDat.getMonth() + 1)+"-"+startDat.getDate();
        temp = obj.End;
        var endDat = new Date(parseInt(temp.substring(6,temp.length-2)));
        endDat = endDat.getFullYear()+"-"+parseInt(endDat.getMonth() + 1)+"-"+endDat.getDate();
		$("#inpstart").val(startDat);
		$("#inpend").val(endDat);
    	if(obj.PayMode == "A"){
    		obj.PayMode = 0;
    	}else{
    		obj.PayMode = 1;
    	}
    	$("#busPayMode div").eq(obj.PayMode).addClass("on").siblings().removeClass("on");
    	if(obj.Contract != ""){
    		$("#product_img2>.webuploader-pick").css("background-image",'url('+obj.Contract+')');
    		$("#product_img2>.webuploader-pick").attr("data",obj.Contract);
    	}
    }
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
        $(".myInfo .upload_photo #product_img").css('background-image', 'none');
    });

    //上传合同图片到图片服务器
    var uploader2 = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true,
        // swf文件路径
        swf: '../lib/webuploader/Uploader.swf',
        // 文件接收服务端。
         server: jsgImageUrl+jsgImageUplod,
        // 控件按钮
        pick: '#product_img2',
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
    
    uploader2.on('uploadSuccess',function (file, response) { 
        var b=document.createElement("b");
        $(".appendix").append(b)
        b.setAttribute("data",response.ShowUrl);
        $(".tips_suc2").css("display", "inline-block");
        setTimeout(function () {
            $(".tips_suc2").css("display", "none");
        },3000);
        $("#product_img2>.webuploader-pick").css("background-image",'url('+response.ShowUrl+')');
        $('.myInfo .appendix .upload_photo #product_img2').css("background-image","none");
    });


	//时间选择控件初始化
    jeDate({
    	format: 'YYYY-MM-DD',
		dateCell:"#inpstart",
		isinitVal:true,
		isTime:false, //isClear:false,
		minDate:"1900-01-01 00:00:00"
	})
    jeDate({
    	format: 'YYYY-MM-DD',
		dateCell:"#inpend",
		isinitVal:true,
		isTime:false, //isClear:false,
		minDate:"1900-01-01 00:00:00"
	})
  
    //选择按钮切换
    $(".select div").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
    })
    $(".select_pay div").click(function () {
        $(this).addClass("on").siblings().removeClass("on");
    })
    $("#busName,#busBrief,#busLinkman,#busAddress,#busLicense,#busBankCode,#busBank,#busAccount").blur(function() {
        validate($(this));
    })
	
	//电话验证
    $("#busTelephone").blur(function () {
        var re=/(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/;
        if(!re.test($(this).val()) && $(this).val().length > 0){
            $(this).next().css('display', 'inline-block').html("<s></s>电话格式不正确");
            $(this).focus();
        }else if($(this).val().length <= 0){
             validate($(this));
        }else{
            $(this).next().css('display', 'none');
        }
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
    //邮箱地址验证
    $("#busMail").blur(function () {
        var re=/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if(!re.test($(this).val()) && $(this).val().length > 0){
            $(this).next().css('display', 'inline-block').html("<s></s>邮箱格式不正确");
            $(this).focus();
        }else if($(this).val().length <= 0){
           validate($(this));
        }else{
            $(this).next().css('display', 'none');
        }
    })

    $("#busSubmt").click(function() {

        //1.商家名称
        var name= $("#busName").val();
        //2.简称
        var brief = $("#busBrief").val();
        //3.行业
        var industry= $("#busIndustry .on").text();
        switch (industry){
            case "饮食":
                industry="3";
                break;
            case "景区":
                industry="1";
                break;
            case "酒店":
                industry="2";
                break;
        }
        //4.商家身份
        var crowd= $("#busCrowd .on").text();
//      switch (crowd){
//          case "企业":
//              crowd="0";
//              break;
//          case "个体":
//              crowd="1";
//              break;
//          case "个人":
//              crowd="2";
//              break;
//      }
        //5.联系人
        var linkMan= $("#busLinkman").val();
        //6.联系电话
        var telephone= $("#busTelephone").val();
        //7.联系人手机
        var phoneNum = $("#busPhone").val();
        //8.邮箱地址
        var email = $("#busMail").val();
        //9.经营地址
        var address= $("#busAddress").val();
        //10.营业执照
        var license= $("#busLicense").val();
        //11.营业执照图片地址
        if(licenseP){
        	var licenseP= $("#busLicenseP b").attr("data");
        	licenseP = licenseP.substring(licenseP.search("/U"));
        }else{
        	var licenseP= $("#product_img>.webuploader-pick").attr("data");
        	licenseP = licenseP.substring(licenseP.search("/U"));
        }
        
        //12.合同有效期开始
        var begin= $("#inpstart").val();
        // alert(begin+"----"+typeof (begin));
        //13.合同有效期结束
        var end= $("#inpend").val();
        //14.付款方式
        var payMode;
        var idx1= $(this).index();
        switch (idx1){
            case 1:
                payMode="A";
                break;
            case 2:
                payMode="B";
                break;
            default:
                payMode="A";
                break;
        }
        //15.邮箱地址
        var email= $("#busMail").val();
        //16.银行用户名
        var bankCode= $("#busBankCode").val();
        //17.银行全称
        var bank= $("#busBank").val();
        //18.银行账号
        var account= $("#busAccount").val();
        //19.支付宝账号
        var alipay= $("#busAlipay").val();
        if (alipay=="") {
            alipay="无";
        }
        //20合同图片地址
        var contract= $("#busContract b").attr("data");
        if(contract){
			contract = contract.substring(contract.search("/U"));
        }else{
        	contract= $("#product_img2>.webuploader-pick").attr("data");
        	contract = contract.substring(contract.search("/U"));
        }
        var strActionName="Mer_UpdateMerchant";
        var arrActionParam = {
            "Name": name,
            "Brief": brief,
            "Variety": industry,
            "Linkman": linkMan,
            "Telephone": telephone,
            "Email": email,
            "Address": address,
            "Remark":crowd,
            "Mender":userMess.WaiterID,
            "MerchantID": userMess.MerchantID
        };
        var strActionParam = JSON.stringify(arrActionParam);
        var strRequest = GetVisitData(strActionName, strActionParam);
        var datSubmit = { strRequest: strRequest };

        $.ajax({
            url: jsgDataUrl+jsgDataGate,
            type: 'post',
            dataType: 'json',
            data: datSubmit,
            async: true,
            timeout: ajaxTimeout,
            beforeSend: function () {
            },
            success: function  (objResult,textStatus) {
                if(objResult.Result == 1){
                    alert("修改成功");
                    window.location.href="editMyInfo.html";
                }else{
                    //alert("输入信息不完整");
                }
            },
            error: function  () {
            }
        })
        
    });
})
