/**
 * Created by Administrator on 2017/8/22.
 */
define(["jquery", "template", "tool"], function ($, template, tool) {
  
  $(function () {
    
    var tc_id = tool.getPrama("tc_id");
    
    if (tc_id) {
      //如果tc_id存在，则为编辑页面
      $.ajax({
        type: "get",
        data: {
          tc_id: tc_id
        },
        url: '/api/teacher/edit',
        success: function (info) {
          var data = info.result;
          data.type= "edit";
          data.tc_title = "讲师编辑";
          data.tc_btnText = "编 辑"
          var edit_html = template("teacher_add_edit_tpl", data);
          $(".teacher").html(edit_html);
          //日期控件
          tool.getDate('#datetimepicker');
        }
      })
      
    } else {
      //如果tc_id不存在，则为添加页面
      var html = template("teacher_add_edit_tpl", {
        type: "add",
        tc_title: "讲师添加",
        tc_btnText: "添 加"
      })
      $(".teacher").html(html);
      //日期控件
      tool.getDate('#datetimepicker');
      
    }
  
    //添加讲师功能
  
    $(".teacher").on("click",".btn_save",function () {
      var url;
      if(tc_id){
        url="/api/teacher/update";
      }else{
        url="/api/teacher/add"
      }
      $.ajax({
        type:'post',
        url:url,
        data:$("form").serialize(),
        success:function (info) {
          if(info.code == 200){
            location.href = "/teacher/list"
          }
        }
      })
    })
  
  
  
    
    
  })
  
})