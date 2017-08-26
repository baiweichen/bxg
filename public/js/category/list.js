/**
 * Created by Administrator on 2017/8/23.
 */
define(["jquery","template","js/common/common"],function ($,template) {
  
  $.ajax({
    type:"get",
    url:"/api/category",
    success:function (info) {
      console.log(info);
      var html = template("category_tpl",info);
      $("#categroy").html(html);
    }
  })
  
  
  
})