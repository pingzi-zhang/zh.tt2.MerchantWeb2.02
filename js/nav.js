$(function () {
	var userMess = JSON.parse(sessionStorage.userInfo);
	var type = userMess.Variety.split(",");
	/*console.log("type",type);*/
	var temp = [];
	var sub_Menuorder = $(".sub_order");
	var sub_MenuProduct = $(".sub_product");
	var sub_Menusale = $(".sub_saleQuery");
	for(var i = 1;i < 9;i++){
		for(var j = 0; j < type.length;j++){
			if(type[j]==i){
				break;
			}
		}
		if(j == type.length){
			temp.push(i);
		}
	}
	for(var i = 0; i < temp.length;i++){
		sub_Menuorder.eq(temp[i]-1).remove();
		sub_MenuProduct.eq(temp[i]-1).remove();
		sub_Menusale.eq(temp[i]-1).remove();
	}
	
	setUser(userMess)
	function setUser(userMess){
		if(userMess.PicHead){
			$("#avatar").css("background-image",'url('+userMess.PicHead+')');
		}
		$("#name").html(userMess.Name);
	}
})
