var oName = document.querySelector("input[name=username]");
var oPass = document.querySelector("input[name=password]");
var oPassword = document.querySelector("input[name=verify]");
var oSubmit = document.querySelector("#button");

var oUser = document.querySelectorAll(".error")[0];
var oPass1 = document.querySelectorAll(".error")[1];
var oVerify = document.querySelectorAll(".error")[2];

var formState = false; //false表示不可用
var nameState = false;
var passState = false;
var passwordState = false;

//disabled让 oSubmit失去能力，对应true
//让 oSubmit 正常使用 对应false
oSubmit.disabled = true;

oName.onblur = function() {
	nameState = /^\w{3,16}$/.test(this.value);
	if(!nameState) {
		oUser.style.display = "block";
	}
	checkFormState();
}
oPass.onblur = function() {
	passState = /^\w{6,16}$/.test(this.value);
	if(!passState) {
		oPass1.style.display = "block";
	}
	checkFormState();
}
oPassword.onblur = function() {
	passwordState = (oPassword.value === oPass.value);
	if(!passwordState) {
		oVerify.style.display = "block";
	}
	checkFormState();
}

function checkFormState() {
	formState = nameState && passState && passwordState;
	oSubmit.disabled = !formState;
}


oSubmit.onclick = function(){
	
    //先进行js校验用户名和密码符合规范，js校验通过
    //请求ajax进行校验用户名是否可用,当这个校验通过，就可以请求注册接口
      myajax.post('http://h6.duchengjiu.top/shop/api_user.php',
    {
      status: 'register',
      username: oName.value,
      password: oPass.value
    }, function(err, responseText){
      var json = JSON.parse(responseText);
      alert(json.message);
    });
	//如果localstorage里面有backurl,我们就跳过去, 否则跳回首页
    //登录成功后，跳转至首页
    if (localStorage.backurl) {
      location.href = localStorage.backurl;
    } else {
      location.href = 'login.html';
    }
}