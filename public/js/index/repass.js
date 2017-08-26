/**
 * Created by Administrator on 2017/8/23.
 */
//修改个人密码

define(["jquery"],function ($) {
  
  $(".btn_save").click(function () {
    if($("#newPass").val() != $("#passConfirm").val()){
      alert("两次输入的密码不一致");
      return false;
    };
    
    //发送ajax请求
    $.ajax({
      type:"post",
      data:$("form").serialize(),
      url:"/api/teacher/repass",
      success:function (info) {
        if(info.code == 200){
          $("#quit").click();
        }
      },
      error:function (info) {
        if(info.status == 403){
          alert("用户名或密码输入错误")
        }
      }
    })
    
    return false;
  })
  
  
  
  
})