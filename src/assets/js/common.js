//$(function () {
//
//topBarHid();
//
//sessionStorageTog("navTogcolor",[0,0,0,0,1],4,"selected",$(".navlist li"));
////导航样式和路由保持一致
//sessionStorageTog("sideBarTogImg",[1, 0, 0, 0, 0,0],0,"selected",$(".companySliderNavList li"));
////侧边栏样式和路由保持一致
//
//})

//function topBarHid() {
//$(window).scroll(function () {
//  if(document.body.scrollTop){
//    $(".header").css("top",-39);
//  }else {
//    $(".header").css("top",0);
//  }
//})
//}
//设置topbar显示隐藏

//function sessionStorageTog(key,value,index,name,obj) {
//if(sessionStorage.getItem(key)==null){
//  sessionStorage.setItem(key,value);
//  obj.eq(index).addClass(name);
//  //console.log("ok")
//}else {
//  var navTogcolor=sessionStorage.getItem(key).split(",");
//
//  for (var i = 0 ;i<navTogcolor.length;i++){
//    obj.eq(i).removeClass(name);
//    if(navTogcolor[i]==1){
//      obj.eq(i).addClass(name);
//    }
//  }
//}
//}
//通过sessionStorage保证页面刷新后obj样式和路由保持对应

