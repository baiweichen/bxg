/**
 * Created by Administrator on 2017/8/24.
 */
define(["jquery"],function ($) {
  
  $(function () {
    $(".create-course").click(function () {
      
      $.ajax({
        type:"post",
        url:"/api/course/create",
        data:$("form").serialize(),
        success:function (info) {
          if(info.code == 200){
            var path = "/course/step1?cs_id="+info.result.cs_id;
            location.href=path;
            console.log(info);
          }
        }
      })
      
    })
  })
  
  
})