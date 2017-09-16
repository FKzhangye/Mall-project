//页面头部
if(localStorage.username) {
	var oUsername = document.querySelector('a[name=username]');
	var oLogout = document.querySelector('.logout');
	oUsername.innerText = localStorage.username;
	oUsername.style.display = 'inline';
	oLogout.style.display = 'inline';
} else {
	var oRegister = document.querySelector('.register');
	var oLogin = document.querySelector('.login');
	oRegister.style.display = 'inline';
	oLogin.style.display = 'inline';
}

//页面导航
var oSearch = document.querySelector('#search');
oSearch.onkeyup = function(event) {
	if(event.keyCode === 13) {
		location.href = 'search.html?search_text=' + this.value;
	}
}
var oCat = document.querySelector('#cat');
myajax.get('http://h6.duchengjiu.top/shop/api_cat.php', {}, function(error, responseText) {
	var json = JSON.parse(responseText);
	var data = json.data;
	for(var i = 0; i < data.length; i++) {
		var obj = data[i];
		oCat.innerHTML += `<li><a href='list.html?cat_id=${obj.cat_id}'>${obj.cat_name}</a></li>`
	}
});

//热门商品      
var oGoods = document.querySelector('#hot-goods');
myajax.get('http://h6.duchengjiu.top/shop/api_goods.php', {
		pagesize: '200'
	},
	function(error, responseText) {
		var json = JSON.parse(responseText);
		console.log(json);
		var data = json.data;
		for(var i = 0; i < data.length; i++) {
			var obj = data[i];
			oGoods.innerHTML += `<li class='goods'><a href='goods.html?goods_id=${obj.goods_id}'>
          <div class='img'><img src='${obj.goods_thumb}' /></div>
          <div class='name'>${obj.goods_name}</div>
          <div class='price'>¥ ${obj.price}</div>         
          </a></li>`
		}
	});