var oGoods = document.querySelector("#hot-goods");

var search_text = getQueryString('search_text');

myajax.get('http://h6.duchengjiu.top/shop/api_goods.php',
{search_text:search_text},
function(error,responseText){
	var json = JSON.parse(responseText);
	console.log(json);
	var data = json.data;
	
	//如果没有搜索到商品，设置5秒后回首页
	
	if(data.length === 0){
        oGoods.innerHTML = "<div id='oError'>未搜索到商品, <span id='second'>5</span>秒后跳回首页</div>";
		var oSecond = document.querySelector("#second");
		var timer = setInterval(() =>{
			var second = parseInt(oSecond.innerText);
			oSecond.innerText = --second;
		},1000);
		var timer=setTimeout(() => {
			clearInterval(timer);
			location.href= "index.html"
		},5000);
		return;
	}
	for(var i = 0;i<data.length;i++){
		var obj = data[i];
		oGoods.innerHTML += `
			<div class="goods">
		        <a href="07_goods.html?goods_id=${obj.goods_id}">
		            			<div class="img"><img src="${obj.goods_thumb}"/></div>
		            			<div class="name">${obj.goods_name}</div>
		            			<div class='price'>¥ ${obj.price}</div> 
		            			<i>元</i>
		        </a>
		    </div>`;
	}
});
