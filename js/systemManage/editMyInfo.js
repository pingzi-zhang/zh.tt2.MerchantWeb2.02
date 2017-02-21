$(function(){
	window.parent.document.title=document.title;
	var userMess = JSON.parse(sessionStorage.userInfo);
	//初始页面渲染函数
	function inintShow(obj){
		var spanValue = $("#myInfo p span:nth-of-type(even)");
		spanValue.eq(0).html(obj.Code);//商家编码
		spanValue.eq(1).html(obj.Name);//商家名称
		spanValue.eq(2).html(obj.Brief);//简称
		var temp= null;
		if(obj.Crowd == 0){
			temp = "企业"
		}else if(obj.Crowd == 1){
			temp = "个体"
		}else{
			temp = "个人"
		}
		spanValue.eq(3).html(temp);//商家身份
		//所属行业
		if(obj.Industry==0){
			obj.Industry="景区";
		}else if(obj.Industry==1){
				obj.Industry="酒店";
			}else{
				obj.Industry="饮食";
			}
		spanValue.eq(4).html(obj.Industry);//所属行业
		spanValue.eq(5).html(obj.License);//营业执照号
		spanValue.eq(6).html(obj.Linkman);//联系人
		spanValue.eq(7).html(obj.Telephone);//联系电话
		spanValue.eq(8).html(obj.Telephone);//联系人手机
		spanValue.eq(9).html(obj.Email);//联系邮箱
		spanValue.eq(10).html(obj.Address);//营业场所地址
		spanValue.eq(11).html(obj.BankCode);//开户名
		spanValue.eq(12).html(obj.Bank);//开户银行
		spanValue.eq(13).html(obj.Account);//银行账户
		spanValue.eq(14).html(obj.Alipay);//支付宝账户
		//营业执照图片
		$("#license_pic").attr("src",obj.LicenseP);
		$("#checkPic").attr("href",obj.LicenseP);
		//付款方式
		if(obj.PayMode=="A"){
			var  str1 = "自甲方信息发布/约定功能上线之日起，1周后甲方可以从乙方指定账户提现至甲方银行账户；距上一次提现日或乙方/乙方关联方/乙方合作方主动打款日1周及以上时，甲方可<br/>";
			var str2 = "再次提现；每当距上一次提现或自甲方信息发布之日起每隔4周时，甲方未提现，乙方/乙方关联方/乙方合作方主动将代收净额中已标记信息但未结算的金额支付到甲方银行账户。"
		}else{
			var str1 = "自甲方信息发布/约定功能上线之日起，乙方/乙方关联方/乙方合作方主动将代收净额中已标记消费结算的金额达到1000元，甲方可以从乙方指定账户提现至甲方银行账户";
			var str2 = "";
		}
		spanValue.eq(15).css({"vertical-align":"top","line-height":"20px"});
		spanValue.eq(15).html(str1+str2);//付款方式
		
		var dat = new Date(parseInt(obj.Begin.substring(6,obj.Begin.length-2)));
		dat = dat.getFullYear()+"年"+parseInt(dat.getMonth() + 1)+"月"+dat.getDate()+"日"+" "+dat.getHours()+":"+dat.getSeconds();
		spanValue.eq(16).html(dat);//合同签约
		spanValue.eq(17).html(obj.Contract.substring(obj.Contract.lastIndexOf("/")+1));//合同附件
	}
	//发送ajax请求
        var strActionName="Mer_GetMerchant";
        var arrActionParam = {
            "MerchantID":userMess.MerchantID
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
            timeout : ajaxTimeout,
            async: true,
            //timeout: 60000,
            beforeSend: function () {
            },
            success: function (objResult,textStatus) {
            	if(objResult.Result==1){
            		inintShow(objResult.Model);
            	}else{
            		alert(objResult.Message);
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
})
