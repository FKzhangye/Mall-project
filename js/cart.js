var oTable = document.querySelector('table');
var oSum = document.querySelector('#sum');
myajax.get('http://h6.duchengjiu.top/shop/api_cart.php', {
  token: localStorage.token
}, function(err, responseText) {
  var json = JSON.parse(responseText);
  console.log(json);
  var data = json.data;
  for(var i = 0; i < data.length; i++) {
    var obj = data[i];
    obj.goods_sum = obj.goods_price * obj.goods_number;
    oTable.innerHTML += `
                          <tr>
                            <td name="goods_id">${obj.goods_id}</td>
                            <td><img src="${obj.goods_thumb}" ></td>
                            <td>${obj.goods_name}</td>
                            <td class='number'><input data-id="${obj.goods_id}" type="number" name="number" min="1" max="10" value="${obj.goods_number}" /></td>
                            <td>￥ ${obj.goods_price} 元</td>
                            <td name="sum">￥ ${obj.goods_sum} 元</td>
                            <td class='cartInput'><input data-id="${obj.goods_id}" type="button" name="delete" value="删除"></td>
                          </tr>
                          `;
  }

  getSum();
});

oTable.onchange = function(event) {
  event = event || window.event;
  var target = event.target || event.srcElement;
  if(target.name === 'number') {
    if(isNaN(parseInt(target.value))) {
      target.value = 1;
    }
    console.log(target.value, target.dataset.id);
    var goods_id = target.dataset.id;
    var number = target.value;
    myajax.post('http://h6.duchengjiu.top/shop/api_cart.php?token=' + localStorage.token, {
        goods_id,
        number
      },
      function(err, responseText) {
        var json = JSON.parse(responseText);
        console.log(json);
        if(json.code === 0) {
          var goods_price = parseInt(target.parentNode.nextElementSibling.innerText);
          target.parentNode.nextElementSibling.nextElementSibling.innerText = parseInt(target.value) * goods_price;
          getSum();
        }
        
      });
  }
}
oTable.addEventListener('click', function(event) {
  event = event || window.event;
  var target = event.target || event.srcElement;
  if(target.name === 'delete') {
    if(!confirm('确认要删除吗')) {
      return;
    }
    var goods_id = target.dataset.id;
    var number = 0;
    myajax.post('http://h6.duchengjiu.top/shop/api_cart.php?token=' + localStorage.token, {
        goods_id,
        number
      },
      (err, responseText) => {
        var json = JSON.parse(responseText);
        console.log(json);
        if(json.code === 0) {
          var tr = target.parentNode.parentNode;
          tr.parentNode.removeChild(tr);
          getSum();
        }
      })
  }
});

var oClearCart = document.querySelector('#clear-cart');
oClearCart.onclick = () => {
  if(!confirm('确认要清空整个购物车吗？')) {
    return;
  }
  var oGoodsIds = document.querySelectorAll('td[name=goods_id]');
  for(var i = 0; i < oGoodsIds.length; i++) {
    var td = oGoodsIds[i];
    var goods_id = parseInt(td.innerText);
    var number = 0;
    (function(td) {
      myajax.post('http://h6.duchengjiu.top/shop/api_cart.php?token=' + localStorage.token, {
          goods_id,
          number
        },
        (err, responseText) => {
          var json = JSON.parse(responseText);
          console.log(json);
          if(json.code === 0) {
            var tr = td.parentNode;
            tr.parentNode.removeChild(tr);
            getSum();
          }
        });
    })(td);
  }
}

function getSum() {
  var oSums = document.querySelectorAll('td[name=sum]');
  var sum = 0;
  for(var i = 0; i < oSums.length; i++) {
    sum += parseInt(oSums[i].innerText.substr(1));
  }
  localStorage.sum = sum;
  oSum.innerText = "￥" + sum + "元";
}


