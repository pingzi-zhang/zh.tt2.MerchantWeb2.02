/**
 * Created by 11 on 2016/12/6.
 */
$(function () {
	window.parent.document.title=document.title;
    $(".balance-num").html("");
    var total = localStorage.getItem("Num");
	var userMess = JSON.parse(sessionStorage.userInfo);
    var pageIndex = 0;
    var pageSize = 5;
    var maxentries; //总条目数
    var arrActionParam = {
        "MerchantID": userMess.MerchantID,            //商家编码
        "Skip":pageIndex*pageSize,
		"Take":pageSize                      //获取记录条数
    };
    var strActionName = "Fin_GetMerCashPage";
    var strActionParam = JSON.stringify(arrActionParam);
    var strRequest = GetVisitData(strActionName, strActionParam);
    var datSubmit = {strRequest: strRequest};
    $.ajax({
        url: jsgDataUrl+jsgDataGate,
        type: "POST",
        dataType: "json",
        //cache: true,
        data: datSubmit,
        async: false,
        timeout: ajaxTimeout,
        beforeSend: function () {
        	$("#loadImg").css("display","block");
        },
        success: function (objResult, textStatus) {
        	maxentries = objResult.Totel;
        }
    });
    
    $(function () {
        $(".pagination").pagination(maxentries, {
            callback: PageCallback,
            prev_text: '上一页',
            next_text: '下一页',
            items_per_page: pageSize,//每页显示的条目数
            num_display_entries: 10,//连续分页主体部分分页条目数
            current_page: pageIndex,//当前页索引
            num_edge_entries: 1//两侧首尾分页条目数
        });
        //翻页调用
        function PageCallback(index, jq) {
            InitList(index);
        }
        //请求数据
        function InitList(pageIndex) {
            var arrActionParam = {
                "MerchantID": userMess.MerchantID,            //商家编码
                "Skip":pageIndex*pageSize,
        		"Take":pageSize                        //获取记录条数
            };
            var strActionName = "Fin_GetMerCashPage";
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
                	$("#loadImg").css("display","none");
                	/*console.log("提现记录的结果",objResult);*/
                    if(objResult.Result == 1){
                        var lists = objResult.List;
                        if(lists.length > 0){
                            var html = template("template", {items: lists});

                            localStorage.setItem("Num",lists.length);
                            //渲染页面
                            $(".table tbody").html(html);
                            $(".total>span").html(total);
                            $(".page").css("display","block");
                            $(".content").css("display","none");
                        }else{
                            $(".page").css("display","none");
                            $(".content").css("display","block");
                        }
                    	$("#search-btn").click(function () {
	                        window.location.href = "inquiry.html";
	                    })
                    }else{
                    	alert(objResult.Message)
                    }
                },
                complete : function(XMLHttpRequest,status){
					if(status=='timeout'){
			　　　　　  alert("请求超时");
			　　　　 }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.status);
                    alert(XMLHttpRequest.readyState);
                    alert(textStatus);
                }

            });
        }
        InfoBalance();
        function InfoBalance() {
            var arrActionParam = {
                "MerchantID": userMess.MerchantID            //商家编码
            };
            var strActionName = "Fin_GetMerchantFinanceView";
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
                    if(objResult.Result == "1"){
                    	localStorage.setItem("Name",objResult.Model.BankCode);
	                    localStorage.setItem("Account",objResult.Model.Account);
	                    localStorage.setItem("Bank",objResult.Model.Bank);
	                    localStorage.setItem("Balance",objResult.Model.Balance);
	                    $(".balance>span").html("￥"+objResult.Model.Balance);
	                    $(".withdraw-btn").click(function(){
	                        window.location.href = "withdrawCash.html";
	                    })
                    }else{
                    	alert(objResult.Message)
                    }
                },
                complete : function(XMLHttpRequest,status){
					if(status=='timeout'){
			　　　　　  alert("请求超时");
			　　　　}
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.status);
                    alert(XMLHttpRequest.readyState);
                    alert(textStatus);
                }

            });
        }
    })
});