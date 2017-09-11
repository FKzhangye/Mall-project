var oNav = document.querySelector('#nav');
var topDis = oNav.offsetTop;
window.onscroll = function(e) {
  var nowTop = document.documentElement.scrollTop || document.body.scrollTop;
  if(nowTop >= topDis) {
    if(nowTop >= topDis) {
      oNav.style.position = 'fixed';
      oNav.style.top = 0;
    } else {
      oNav.style.position = 'relative';
      oNav.style.top = topDis + 'px';
    }
  } else {
    oNav.style.position = '';
  }
}