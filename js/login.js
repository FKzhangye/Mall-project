var oUsername = document.querySelector("input[name=username]");
var oVerify = document.querySelector("input[name=verify]");
var oSubmit = document.querySelector("button");

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
	passState = /^\w{6,16}$/.test(this.value);
	if(!passState){
		oVer.style.display = "block";
	}
	checkFormState();
}

function checkFormState(){
	console.log(nameState);
	console.log(passState);
	formState = nameState && passState;
	console.log(formState);
	console.log(!formState);
	oSubmit.disabled = !formState;
	console.log(oSubmit.disabled);
}




oSubmit.onclick = function() {
      //js校验
      //直接调用登录的接口
      myajax.post('http://h6.duchengjiu.top/shop/api_user.php',
      {
        status: 'login',
        username: oUsername.value,
        password: oVerify.value
      }, function(error, responseText){
        var json = JSON.parse(responseText);
        console.log(json);
        localStorage.token = json.data.token;
        localStorage.username = json.data.username;
        /*console.log(localStorage.token);
        console.log(localStorage.username);*/
        
        //如果localstorage里面有backurl,我们就跳过去, 否则跳回首页
        //登录成功后，跳转至首页
        if (localStorage.backurl) {
          alert("用户名或密码错误，请重新输入")
          location.href = localStorage.backurl;
        } else {
          location.href = 'index.html';
        }
      });
    }
