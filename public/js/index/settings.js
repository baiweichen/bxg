/**
 * Created by Administrator on 2017/8/22.
 */
define(["jquery", "template", "tool", "ckeditor", "uploadify", "jquery_region"], function ($, template, tool, CKEDITOR) {
  
  
  
  //获取个人资料
  $.ajax({
    type: "get",
    url: "/api/teacher/profile",
    success: function (info) {
      var html = template("private_detail_tpl", info.result);
      $(".settings").html(html);
      //日期插件
      tool.getDate("#tc_birthday");
      tool.getDate("#tc_join_date");
      
      
      //上传头像
      $("#upfile").uploadify({
        height: 120,
        swf: '/public/assets/uploadify/uploadify.swf',
        uploader: '/api/uploader/avatar',
        width: 120,
        buttonText: "",
        fileObjName: 'tc_avatar',
        onUploadSuccess: function (file, data, response) {
          var data = JSON.parse(data);
          var path = data.result.path;
          $(".preview img").attr("src", path);
          //更新侧边栏内的头像
          $(".avatar img").attr("src", path);
          //更新cookies
          var userInfo = $.cookie("info");
          userInfo = JSON.parse(userInfo);
          userInfo.tc_avatar = path;
          $.cookie("info", JSON.stringify(userInfo), {path: "/", expires: 1})
        }
      });
      
      
      //实现三级联动
      $("#region").region({
        url: "/public/assets/jquery-region/region.json"
      });
      
      
      //副文本编辑器插件
      CKEDITOR.replace("tc_introduce", {
        toolbarGroups: [
          {name: 'clipboard', groups: ['clipboard', 'undo']},
          
          {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
          '/',
          {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi']},
          {name: 'styles'},
          {name: 'colors'},
        ]
      });
      
      
    }
  });
  
  
  //更新个人资料
  $(".settings").on("click", ".btn_save", function () {
    //点击提交时，把富文本编辑的内容同步到textarea中，这样后端获取到这个值
    for ( instance in CKEDITOR.instances ) {
      CKEDITOR.instances[instance].updateElement();
    }
    console.log($("form").serialize());
    $.ajax({
      type: "post",
      url: "/api/teacher/modify",
      data: $("form").serialize(),
      success: function (info) {
        console.log(info);
      }
    })
  })
  
})