var oCats = document.querySelector('#cats');
cat_id = getQueryString("cat_id");
myajax.get('http://h6.duchengjiu.top/shop/api_goods.php?cat_id=' + cat_id, {},
  function(error, responseText) {
    var json = JSON.parse(responseText); //返回的整个json对象
    var data = json.data; //json对象当中的data是一个数组
    if(data.length === 0) {
      oCats.innerHTML = `<p class='catP'><span>暂无商品上架</span></p>`
    }
    for(var i = 0; i < data.length; i++) {
      var obj = data[i];
      oCats.innerHTML += `
		            	<div class="goods">
		            		<a href="goods.html?goods_id=${obj.goods_id}">
		            			<div class="img"><img src="${obj.goods_thumb}"/></div>
		            			<div class="name">${obj.goods_name}</div>
		            			<div class='price'>¥ ${obj.price}</div> 
		            			<i>元</i>
		            		</a>
		            	</div>`;
    }
  });