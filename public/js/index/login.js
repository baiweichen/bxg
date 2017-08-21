/**
 * Created by Administrator on 2017/8/20.
 */

define(["jquery","jquery_cookie","jquery_form"],function ($) {
  $(function () {
    $("form").submit(function () {
      
        $(this).ajaxSubmit({
          type:"post",
          url:"/api/login",
          success:function (info) {
            if (info.code == 200) {
              var json = JSON.stringify(info.result);
              $.cookie("info", json, {path: "/", expires: 1});
              location.href = "/index/index";
            }
          }
        })
        
        return false;
      }
    )
  })
})
