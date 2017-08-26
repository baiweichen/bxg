/**
 * Created by Administrator on 2017/8/23.
 */
define(["jquery", "tool", "template"], function ($, tool, template) {
  var cg_id = tool.getPrama("cg_id");
  if (cg_id) {
    //编辑页面
    $.ajax({
      type: "get",
      url: "/api/category/edit",
      data: {
        cg_id: cg_id
      },
      success: function (info) {
        if (info.code == 200) {
          console.log(info);
          var data = info.result;
          data.title = "课程编辑";
          data.type = "edit";
          data.btnText = "修 改";
          var html = template("categroy_edit", data)
          $(".course-category").html(html);
        }
        
      }
    })
    
  } else {
    //添加页面
    //发送ajax请求，获取级别列表
    $.ajax({
      type: "get",
      url: "/api/category/top",
      success: function (info) {
        if(info.code == 200){
          var data = {};
          data.top = info.result;
          data.title = "添加分类";
          data.btnText = "添 加";
          var html = template("categroy_edit", data);
          $(".course-category").html(html);
        }
      }
    })
  }
  
  //为按钮添加点击事件，发送ajax请求
  
  $(".course-category").on("click", ".btn_save", function () {
    
    var url;
    if (cg_id) {
      url = "/api/category/modify";
    } else {
      url = "/api/category/add";
    }
    $.ajax({
      type:"post",
      url:url,
      data:$("form").serialize(),
      success:function (info) {
        console.log(info);
          if(info.code == 200){
            location.href="/category/list";
          }
      }
    })
  })
  
})
