/**
 * Created by Administrator on 2017/8/24.
 */
define(["jquery","template"],function ($,template) {
    
  $.ajax({
    type:"get",
    url:"/api/course",
    success:function (info) {
      if(info.code == 200){
        console.log(info);
        var html = template("course-tpl",info)
        $(".courses").html(html);
      }
    }
  })
})