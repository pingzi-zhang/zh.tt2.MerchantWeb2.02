/*window.config={
    domain: jsgDataUrl +　jsgDataGate,
    imgDomain: jsgImageUrl　+　jsgImageUplod
}
window.$C = window.config;*/
//侧边栏点击效果
$(function () {
    $(".sub_menu").hide();
    $(".manage_order").click(function () {
        $(".sub_order").slideToggle(300);
        $(".manage_order .arrow_icon").toggleClass("rotate");
    });
    $(".manage_product").click(function () {
        $(".sub_product").slideToggle(300);
        $(".manage_product .arrow_icon").toggleClass("rotate");
    });
    $(".manage_system").click(function () {
        $(".sub_system").slideToggle(300);
        $(".manage_system .arrow_icon").toggleClass("rotate");
    });
    $(".manage_sale").click(function (){
    	$(".sub_sale").slideToggle(300);
        $(".manage_sale .arrow_icon").toggleClass("rotate");
    })
    $(".manage_saleQuery").click(function (){
        $(".sub_saleQuery").slideToggle(300);
        $(".manage_saleQuery .arrow_icon").toggleClass("rotate");
    })
    
    $(".sub_menu").click(function () {
        var src= $(this).attr("myAttr");
        $("#myIframe").attr("src",src);
        $(this).addClass("bgon").siblings().removeClass("bgon");
        $(".path1").siblings().show();
        $(".path2").text($(this).text());
    });
    $(".sideBar li:not(.sub_menu)").click(function () {
        $(".path1").text($(this).text());
        $(".path1").siblings().hide();
    });
    
    //退出按钮
	$(".quit").click(function(){
		window.location.href = "login.html";
		sessionStorage.userAccount = "";
	});
	//获取当前点击的订单管理的类型,存入session
	$(".sub_order").bind("click",function(){
		sessionStorage.orderType = $(this).text();
	});
	$(".sub_saleQuery").bind("click",function(){
		sessionStorage.orderType = $(this).text();
	});
	
})
// 获取登录名字和登录时间
$(function () {
    $(".header-r>.name").text(localStorage.user);
    //获取系统时间
    // var systemTime=new Date();
    // var day=systemTime.getDate();
    // var month=systemTime.getMonth() + 1;
    // var year=systemTime.getFullYear();
    // var hour=systemTime.getHours();
    // var minutes=systemTime.getMinutes();
    // var seconds=systemTime.getSeconds();
    // $(".date").text(year + "/" + month + "/" + day);
    // $(".time").text(hour + ":" + minutes + ":" + seconds);
})

function resizeHtmlFont() {
    var hW = $("html").width();
    $("body,html").attr("style", "font-size:" + hW * 14 / 1920 + "px !important;");
}
window.onresize =  function(){
	resizeHtmlFont();
};
addEventListener("orientationchange", function (e) {
    e.preventDefault();
});
resizeHtmlFont();

//表单非空验证
function validate(element) {
    if (!element.val()) {
        element.next().css("display","inline-block");
        element.focus();
        return false;
    }else {
        element.next().css("display","none");
        return false;
    }
}
//请求超时的变量
var ajaxTimeout = 20000;

