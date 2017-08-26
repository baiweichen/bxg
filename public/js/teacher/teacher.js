/**
 * Created by Administrator on 2017/8/20.
 */

//渲染teacher列表
require(["jquery", "template","bootstrap"], function ($, template) {
  $.ajax({
    type:"get",
    url:"/api/teacher",
    dataType:"json",
    success:function (info) {
      $("#teacher-list").html(template("teacher-tpl",info))
    }
  });
  
  //添加讲师查看功能，注册委托事件
  $("#teacher-list").on("click","#check",function (e) {
    $that = $(this);
    var tc_id = $that.data("id");
    $.ajax({
      type:"get",
      url:"/api/teacher/view",
      data:{
        tc_id:tc_id
      },
      success:function (info) {
        console.log(info);
        $("#teacherModal").html(template("detail-tpl",info.result)).modal('show');
      }
    })
    
  });
  
  
  //讲师注销/启用功能
  
  $("#teacher-list").on("click",".change",function () {
    $that = $(this);
    var tc_id = $that.data("id");
    var tc_status = $that.parent().data("status")
    $.ajax({
      type:"post",
      url:"/api/teacher/handle",
      data:{
        tc_id:tc_id,
        tc_status:tc_status
      },
      success:function (info) {
        console.log(info);
        if(info.code == 200){
          //根据返回值改变按钮状态
          if(tc_status == 0){
            $that.text("启 用");
            $that.removeClass("btn-warning").addClass("btn-success");
          }else{
            $that.text("注 销");
            $that.removeClass("btn-success").addClass("btn-warning");
          }
          //点击完成之后要改变状态
          $that.parent().data("status",info.result.tc_status);
         console.log(info.result.tc_status);
        }
        
        
      }
    })
    
  });
  
})