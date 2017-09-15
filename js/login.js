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
	nameState = /^\w{3,16}$/.test(this.value);
	if(!nameState){
		oUser.style.display = "block";
	}
	checkFormState();
}
oVerify.onblur = function(){
	passState =  /^\w{6,16}$/.test(this.value);
	if(!passState){
		oVer.style.display = "block";
	}
	checkFormState();
}


function checkFormState(){
	formState = nameState && passState;
	oSubmit.disabled = !formState;
}


oSubmit.onclick = function(){
	ajaxVerify();
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
 		toast(json.message,1000);
		
		if(json.message === "登录成功"){
			var timer = setInterval(function(){
				//如果localstorage里面有backurl,我们就跳过去, 否则跳回首页
				if(localStorage.backurl) {
					location.href = localStorage.backurl;
				} else {
					location.href = 'index.html';
				}
			},1000);
		}
	});
}