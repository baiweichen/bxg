/**
 * Created by Administrator on 2017/8/20.
 */

define(["jquery", "template","nprogress", "jquery_cookie"], function ($, template,np) {
  
  //nprogress进度条，提升用户体验
  np.start();
  setTimeout(function () {
      np.done();
  },300)
  
  //为document添加ajaxStart
  $(document).ajaxStart(function () {
      $(".mask").show();
  });
  $(document).ajaxStop(function () {
    setTimeout(function () {
      $(".mask").hide();
    },300)
  })
  
  
  //只要不是登录页，就需要用到模版引擎渲染头像和名字
  if (location.pathname != "/login") {
    
    //如果登录信息没有，即PHPSESSID值为空，直接跳到登录页面
    if ($.cookie("PHPSESSID")) {
      $(function () {
        var userInfo = JSON.parse($.cookie("info"));
        var html = template("private-tpl", userInfo);
        $("#private").html(html);
      })
    } else {
      location.href = '/login';
    }
    
  }
  
  //退出登录功能
  $("#quit").click(function () {
    $.ajax({
      type: "post",
      url: "/api/logout",
      success: function (info) {
        $.removeCookie("info", {path: "/"});
        location.href = "/login";
      }
    })
  });
  
  //根据路径设置侧边栏高亮
  var address = location.pathname;
  var addressObj = {
    "/teacher/add":"/teacher/list",
    "/repass":"/index/index",
    "/index/settings":"/index/index",
    "/category/add":"/category/list",
    "/course/step1":"/course/add",
    "/course/step2":"/course/add",
    "/course/step3":"/course/add",
  };
  address = addressObj[address] || address;
  $("#nav-list a").each(function () {
    var $that = $(this);
    $that.removeClass("active");
    if ($that.attr("href") == address) {
      $that.addClass("active");
    }
    
          
    
  });
  //点击切换二级菜单
  $("#toggleControl").click(function () {
    $("#toggleList").slideToggle();
  });
  
  //如果切换到二级目录下，列表保持展开
  $("#toggleList").find(".active").parent().parent().show();
  
  
})
