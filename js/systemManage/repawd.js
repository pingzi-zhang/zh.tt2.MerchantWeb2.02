$(function(){
	//随机四位验证码
	function validateCode(){
        var _code=[];
        var m=0;
        for(var i=0;i<36;i++){
            if(i<=9){
                _code[i]=i;
            }else{
                _code[i]=String.fromCharCode("a".charCodeAt(0)+m);
                m++;
            }
        }
        return ""+_code[Math.floor(Math.random()*_code.length)]+_code[Math.floor(Math.random()*_code.length)]+_code[Math.floor(Math.random()*_code.length)]+_code[Math.floor(Math.random()*_code.length)];
    }
	$("#yzh").text(validateCode());
	$("#shua").click(function(){$("#yzh").text(validateCode())});
	$("#pwd3").blur(function(){
    	if($("#yzh").text()==$(this).val()){
            _flag4=1;
             $("#dc4").html("输入正确");
        }else{
            $("#dc4").html("输入错误");
            _flag4=0;
        }
    });
    //手机验证
    $("#busPhone").blur(function () {
        var re=/^1[3|4|5|7|8]\d{9}$/;
        if(!re.test($(this).val().trim()) && $(this).val().length > 0){
            $(this).next().css('display', 'inline-block').html("<s></s>手机格式不正确");
            $(this).focus();
        }else{
            validate($(this));
        }
    });
    
    $("#submit").click(function() {
        var strActionName="Mer_UpdatePassWord";
        var arrActionParam = {
            "OldPassword":"123456",
			"Password":"123456",
			"WaiterID":"8f689e23401f4da7bc6dde63e7de0178"
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
                    alert(objResult.Message);
                    
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
