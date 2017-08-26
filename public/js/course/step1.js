/**
 * Created by Administrator on 2017/8/24.
 */
define(["jquery", "tool", "template", "ckeditor"], function ($, tool, template, CKEDITOR) {
  
  var cs_id = tool.getPrama("cs_id");
  $.ajax({
    type: "get",
    url: "/api/course/basic",
    data: {
      cs_id: cs_id
    },
    success: function (info) {
      if (info.code == 200) {
        console.log(info);
       
        //渲染 标题  侧边栏 基本信息
        var html = template("basic-tpl", info.result)
        $(".steps").html(html);
        //渲染step列表
        
        //副文本编辑器插件
        CKEDITOR.replace("course_desc", {
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
    }
  })
  
  //为一级分类加change事件，发送ajax
  $("body").on("change","#fir_fenlei",function () {
    var cg_id = $(this).val();
    $.ajax({
      type:"get",
      url:"/api/category/child",
      data:{
        cg_id:cg_id,
      },
      success:function (info) {
        console.log(info);
        $("#sed_fenlei").html(template("sed_fenlei_tpl",info))
      }
      
    })
  })
  
  //为保存按钮注册事件
  $(".steps").on("click", ".btn_save", function () {
    console.log(111);
    for (instance in CKEDITOR.instances) {
      CKEDITOR.instances[instance].updateElement();
    }
    console.log($("form").serialize());
    $.ajax({
      type: "post",
      url: "/api/course/update/basic",
      data: $("form").serialize(),
      success: function (info) {
        if (info.code == 200) {
          console.log(info);
          //转到step2页面
          var path = "/course/step2?cs_id=" + info.result.cs_id;
          location.href = path;
          
        }
        
      }
    })
  })
  
})