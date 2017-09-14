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
	if(!/^\w{3,16}$/.test(this.value)) {
		oUser.style.display = "block";
	}
}
oPass.onblur = function() {
	if(!/^\w{6,16}$/.test(this.value)) {
		oPass1.style.display = "block";
	}
}
oPassword.onblur = function() {
	passwordState = (oPassword.value === oPass.value);
	if(!passwordState) {
		oVerify.style.display = "block";
	} else {
		ajaxVerify();
	}

}

function checkFormState() {
	formState = nameState && passState && passwordState;
	oSubmit.disabled = !formState;
}

function ajaxVerify() {
	myajax.post('http://h6.duchengjiu.top/shop/api_user.php', {
		status: 'register',
		username: oName.value,
		password: oPass.value
	}, function(err, responseText) {
		var json = JSON.parse(responseText);
		toast(json.message,2000);
		if(json.message === "注册成功") {
			nameState = true;
			passState = true;
			checkFormState()
		}
		oSubmit.onclick = function() {
			if(localStorage.backurl) {
				location.href = localStorage.backurl;
			} else {
				location.href = 'login.html';
			}
		}
	});
}
