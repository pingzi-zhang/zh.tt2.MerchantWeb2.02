$(function(){
	window.parent.document.title=document.title;
	var a = 0;
	var b = 0;
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
             $("#dc4").html("输入正确");
             b = 1;
             return b;
        }else{
             $("#dc4").html("输入错误");
             b = 0;
             return b;
        }
    });
    //手机验证
    $("#busPhone").blur(function () {
        var re=/^1[3|4|5|7|8]\d{9}$/;
        if(!re.test($(this).val().trim()) && $(this).val().length > 0){
            $(this).next().css('display', 'inline-block').html("<s></s>账号格式不正确");
            $(this).focus();
        }else if(re.test($(this).val().trim()) && $(this).val().length > 0){
        	$(this).next().css('display', 'inline-block').html("<s></s>输入正确");
        	a = 1;
        	return a;
        }else{
            validate($(this));
        }
    });
    $(".button").click(function(){
		if(a == 1 && b == 1){
    	$(".button").attr("href","safeCheck.html");
    	}else{
    	$(".button").attr("href","javascript:void (0)");
    	}
    
    })
       
})