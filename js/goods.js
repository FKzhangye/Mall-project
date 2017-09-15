var oGoods = document.querySelector('#hot-goods');
myajax.get('http://h6.duchengjiu.top/shop/api_goods.php',
{
	pagesize:'200'
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