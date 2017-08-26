/**
 * Created by Administrator on 2017/8/24.
 */
define(["jquery","template","tool","uploadify","jquery_Jcrop"],function ($,template,tool) {
  
  var cs_id = tool.getPrama("cs_id");
  var x, y, w, h;
  
  $.ajax({
    type: "get",
    url: "/api/course/picture",
    data: {
      cs_id: cs_id
    },
    success: function (info) {
      if (info.code == 200) {
        console.log(info);
        //渲染
        var html = template("step2-tpl", info.result)
        $(".steps").html(html);
  
        //添加选择图片功能
        $("#selectedPic").uploadify({
          height: 30,
          swf: '/public/assets/uploadify/uploadify.swf',
          uploader: '/api/uploader/cover',
          width: 70,
          buttonText: "上传图片",
          fileObjName: 'cs_cover_original',
          fileSizeLimit: "2MB",
          fileTypeExts: '*.gif; *.jpg; *.png',
          buttonClass:"btn btn-success btn-sm",
          formData:{
            cs_id: cs_id
          },
          itemTemplate:"<span></span>",
          onUploadSuccess: function (file, data, response) {
            data = JSON.parse(data);
            var path = data.result.path;
            $(".preview img").attr("src", path);
            $(".brief img").attr("src", path);
            location.reload();
          }
        });
        
      }
    }
  })
  
  $("body").on("click", "#btn_jcrop", function () {
    if ($(this).text() == "裁切图片") {
      $(this).text("保存图片");
      $('.preview img').Jcrop({
        setSelect: [0, 0, 10000, 10000],
        aspectRatio: 2,   //宽高比
        boxWidth: 400
      }, function () {
        this.initComponent('Thumbnailer', {width: 240, height: 120, parent: ".thumb"});
        //一进来，先获取到裁剪框的值，初始化x,y,w,h
        var init = this.getSelection();
        x = init.x;
        y = init.y;
        w = init.w;
        h = init.h;
        
        $('.preview').on("cropmove", function (a, b, c) {
          x = parseInt(c.x);
          y = parseInt(c.y);
          w = parseInt(c.w);
          h = parseInt(c.h);
        });
      });
    } else {
      //发送ajax请求，裁切图片
      $.ajax({
        type:"post",
        url:"/api/course/update/picture",
        data:{
          cs_id:cs_id,
          x:x,
          y:y,
          w:w,
          h:h
        },
        success:function (info) {
          console.log(info);
          if(info.code == 200){
            location.href = "/course/step3?cs_id="+cs_id;
          }
        }
      });
    }
  })
  
})