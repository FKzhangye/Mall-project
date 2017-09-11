var oUsername = document.querySelector("input[name=username]");
var oPassword = document.querySelector("input[name=password]");
var oVerify = document.querySelector("input[name=verify]");
var oButton = document.querySelector("button");

var oUser = document.querySelector("#errorUsername");
var oPass = document.querySelector("#errorPassworld");
var oVer = document.querySelector("#errorVerification");


oUsername.onblur = function(){
	if(!(/^\w{3,16}$/.test(this.value))){
		oUser.style.display = "block";
	}
}
oPassword.onblur = function(){
	if(!(/^\w{6,16}$/.test(this.value))){
		oPass.style.display = "block";
	}
}
oVerify.onblur = function(){
	if(!(oPassword.value === oVerify.value)){
		oVer.style.display = "block";
	}
}

oButton.onclick = function(){
	
    //先进行js校验用户名和密码符合规范，js校验通过
    //请求ajax进行校验用户名是否可用,当这个校验通过，就可以请求注册接口
      myajax.post('http://h6.duchengjiu.top/shop/api_user.php',
    {
      status: 'register',
      username: oUsername.value,
      password: oPassword.value
    }, function(err, responseText){
      var json = JSON.parse(responseText);
      alert(json.message);
    });
    /*//如果localstorage里面有backurl,我们就跳过去, 否则跳回首页
        //登录成功后，跳转至首页
        if (localStorage.backurl) {
          location.href = localStorage.backurl;
        } else {
          location.href = 'login.html';
        }*/
}
