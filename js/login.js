var oUsername = document.querySelector("input[name=username]");
var oVerify = document.querySelector("input[name=verify]");
var oSubmit = document.querySelector("#button");

var oUser = document.querySelector("#errorUsername");
var oVer = document.querySelector("#errorVerification");


var nameState = false;
var passState = false;
var formState = false; 

oSubmit.disabled = true;

oUsername.onblur = function(){
	if(!/^\w{3,16}$/.test(this.value)){
		oUser.style.display = "block";
	}
}
oVerify.onblur = function(){
	if(! /^\w{6,16}$/.test(this.value)){
		oVer.style.display = "block";
	}else{
		ajaxVerify();
	}
}

function checkFormState(){
	formState = nameState && passState;
	oSubmit.disabled = !formState;
}


function ajaxVerify() {
	//js校验
	//直接调用登录的接口
	myajax.post('http://h6.duchengjiu.top/shop/api_user.php', {
		status: 'login',
		username: oUsername.value,
		password: oVerify.value
	}, function(error, responseText) {
		var json = JSON.parse(responseText);

		localStorage.token = json.data.token;
		localStorage.username = json.data.username;
 		
 		console.log(json.message);
 		toast(json.message,2000);
		
		if(json.message === "登录成功"){
			nameState = true;
			passState = true;
			checkFormState()
		}
		//如果localstorage里面有backurl,我们就跳过去, 否则跳回首页
		oSubmit.onclick = function() {
			if(localStorage.backurl) {
				location.href = localStorage.backurl;
			} else {
				location.href = 'index.html';
			}
		}
	});
}