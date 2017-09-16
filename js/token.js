//ajax token的验证，购物车，我的订单
var oShoppingCart = document.querySelector(".shopping-cart");
oShoppingCart.onclick = function() {
	myajax.get('http://h6.duchengjiu.top/shop/api_cart.php', {
			token: localStorage.token
		},
		function(err, responseText) {
			var json = JSON.parse(responseText);
			console.log(json);

			if(json.message === "用户Token无效") {
				console.log(json.code);
				toast('请先登录再查看购物车', 2000);
				var timer = setInterval(function() {
					window.location.href = 'login.html';
				}, 2000);
			}else{
				window.location.href = "cart.html";
			}
			
		});

}
var oMyOrder = document.querySelector(".my-order");
oMyOrder.onclick = function() {
	myajax.get('http://h6.duchengjiu.top/shop/api_order.php', {
			token: localStorage.token
		},
		function(err, responseText) {
			var json = JSON.parse(responseText);
			console.log(json);

			if(json.message === "用户Token无效") {
				console.log(json.code);
				toast('请先登录再查看订单', 2000);
				var timer = setInterval(function() {
					window.location.href = 'login.html';
				}, 2000);
			}else{
				window.location.href = "order.html";
			}
			
		});

}