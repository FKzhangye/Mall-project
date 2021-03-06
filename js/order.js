var oOrder = document.querySelector('#order');
myajax.get('http://h6.duchengjiu.top/shop/api_order.php', {
  token: localStorage.token
}, function(err, responseText) {
  var json = JSON.parse(responseText);
  console.log(json);
  var data = json.data;
  if(data.length === 0) {
    oOrder.innerHTML = "<h3 class='h3'>您的订单为空</h3>";
    return;
  }
  for(var i = 0; i < data.length; i++) {
    var obj = data[i];
    //遍历商品列表，拼装HTML
    var goodsHTML = '';
    for(var j = 0; j < obj.goods_list.length; j++) {
      var goods = obj.goods_list[j];
      goodsHTML += `
            <div>
              <div class='goodsName'>${goods.goods_name}</div>
              <div class='goodstThumb'><img src="${goods.goods_thumb}"></div>
              <div class='goodsPrice'>单价：${goods.goods_price}</div>
              <div class='Number'>数量：${goods.goods_number}</div>
              <div class='goodNumber'>小计：${goods.goods_price * goods.goods_number}</div>
            </div>
          `;
    }
    //一件商品的总价
    oOrder.innerHTML += `
                          <li>
                            <div class="title">收货人：${obj.consignee} &nbsp&nbsp&nbsp 总价:${obj.total_prices} <span data-id="${obj.order_id}" class="cancel-order">取消订单</span></div>
                            <div class="order-goods">
                            ${goodsHTML}
                            </div>
                          </li>
                          `;
  }
});
oOrder.onclick = function(event){
  event = event || window.event;
  var target = event.target || event.srcElement;
  if (target.className === 'cancel-order') {
  	if (!confirm('确定取消订单吗?')) {
  		return;
  	}
  	var order_id = target.dataset.id;
  	myajax.post('http://h6.duchengjiu.top/shop/api_order.php?token='+localStorage.token+'&status=cancel', {order_id},
  	function(error, responseText){
  	  var json = JSON.parse(responseText);
  	  if (json.code === 0) {
  	  	alert('订单取消成功');
  	  }
  	});
  }
  
}
