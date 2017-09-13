//得到carousel
    var carousel = document.getElementById("carousel");
    //得到运动机构
    var m_unit = document.getElementById("m_unit");
    //得到ul
    var carouselUL = m_unit.getElementsByTagName("ul")[0];
    //得到li
    var lis = m_unit.getElementsByTagName("li");
    //得到按钮
    var leftBtn = document.getElementById("leftBtn");
    var rightBtn = document.getElementById("rightBtn");
    //得到小圆点
    var circlesLi = document.getElementById("circles").getElementsByTagName("li");
    //图片数量
    var imgLength = lis.length;
    //图片宽度
    var width = 1065;
    //滚动速度
    var animatetime = 600;
    //缓冲描述
    var tween = "BounceEaseOut";
    //间隔时间
    var interval = 2000;
    //函数截流
    var lock = true;

    //把0号li克隆，然后插入到carouselUL的最后面
    //先放在心里，我们下午有专题DOM节点操作
    carouselUL.appendChild(lis[0].cloneNode(true));

    //信号量
    var nowimg = 0;  //0、1、2、3、4。  5是临时状态
    //右按钮的事件
    rightBtn.onclick = rightBtnHandler;

    //自动轮播
    var timer = setInterval(rightBtnHandler,interval);
    //鼠标进入停止
    carousel.onmouseover = function(){
      clearInterval(timer);
    }
    //鼠标离开开始
    carousel.onmouseout = function(){
      timer = setInterval(rightBtnHandler,interval);
    }


    //右按钮的事件处理程序
    function rightBtnHandler(){
      //点击右按钮的时候，运动机构本身在运动，就不让右按钮有任何作用
      if(m_unit.isanimated) return;

      nowimg ++;
      changeCircle();
      animate(m_unit,{"left":-width * nowimg},animatetime,tween,function(){
        if(nowimg > imgLength - 1){
          nowimg = 0;
          this.style.left = "0px";
        }
      });   
    }

    //左按钮的事件
    leftBtn.onclick = function(){
      //点击左按钮的时候，运动机构本身在运动，就不让右按钮有任何作用
      if(m_unit.isanimated) return;

      //左按钮的业务
      nowimg--;
      if(nowimg < 0){
        nowimg = imgLength - 1;
        m_unit.style.left = -width * imgLength + "px";
      }
      changeCircle();
      animate(m_unit,{"left":-width * nowimg},animatetime,tween);
    }

    //批量添加小圆点的监听
    for(var i = 0 ; i <= imgLength - 1 ; i++){
      circlesLi[i].index = i; //先编号
      circlesLi[i].onclick = function(){
        //点击小圆点的时候，运动机构本身在运动，就不让右按钮有任何作用
        if(m_unit.isanimated) return;
        
        //小圆点的点击业务
        nowimg = this.index;
        animate(m_unit,{"left":-width * nowimg},animatetime,tween);
        changeCircle();
      }
    }


    //更换小圆点函数
    function changeCircle(){
      //n就是信号量的副本
      var n = nowimg;
      //判断副本的值如果是5，那么就是0
      if(n == 5){
        n = 0;
      }
      //去掉所有小圆点的cur
      for (var i = 0; i < circlesLi.length; i++) {
        circlesLi[i].className = "";
      }
      //第信号量这个小圆点加cur
      circlesLi[n].className = "cur";
    }