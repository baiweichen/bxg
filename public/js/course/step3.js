/**
 * Created by Administrator on 2017/8/24.
 */
define(["jquery","template","tool","bootstrap","jquery_form"],function ($,template,tool) {
  
  var cs_id = tool.getPrama("cs_id");
  
  $.ajax({
    type: "get",
    url: "/api/course/basic",
    data: {
      cs_id: cs_id
    },
    success: function (info) {
      if (info.code == 200) {
        // console.log(info);
        var html = template("step3", info.result)
        $(".steps").html(html);
  
        getLesson();
      }
     
    }
  })
  
  //课时编辑
  $("body").on("click",".keshi_edit",function () {
    var ct_id = $(this).data("id");
    $.ajax({
      type:"get",
      url:"/api/course/chapter/edit",
      data:{
        ct_id : ct_id
      },
      success:function (info) {
        console.log(info);
        var data = info.result;
        data.title="编辑课时";
        data.btnText="修 改";
        data.cs_id = cs_id;
        data.type="edit";
        $("#lesson").html(template("motai-ypl",data)).modal("show");
        /*if(info.result.ct_is_free == "0"){
          $("#ct_is_free").prop("checked",false);
        }else{
          $("#ct_is_free").prop("checked",true);
        }*/
      }
    })
  })
  
  
  //添加课时功能
  $("body").on("click",".add_lesson",function (e) {
    var data = {};
    data.title = "添加课时";
    data.btnText = "添 加";
    data.cs_id = cs_id;
    data.type="add";
    $("#lesson").html(template("motai-ypl",data)).modal("show");
    e.stopPropagation()
  })
  
  //课时保存/编辑
  $("body").on("click",".add_lesson_info",function () {
    var url;
    var ct_is_free;
    if($("#ct_is_free").prop("checked")){
      ct_is_free = 1
    }else{
      ct_is_free = 0;
    }
    console.log(ct_is_free);
    if($(this).data("type") == "add"){
      url="/api/course/chapter/add";
    }
    if($(this).data("type") == "edit"){
      url="/api/course/chapter/modify";
    }
    $("form").ajaxSubmit({
      type:"post",
      url:url,
      data:{
        ct_is_free:ct_is_free
      },
      success:function (info) {
        if(info.code == 200){
          // console.log(info);
          $("#lesson").modal("hide");
          //获取一次lesson数据
          getLesson()
        }
      }
    })
   
  })
  
  //封装：发送ajax，获取课时信息
  function getLesson(){
    $.ajax({
      type:"get",
      url:"/api/course/lesson",
      data:{
        cs_id: cs_id
      },
      success:function (info) {
        // console.log(info);
        var html = template("keshi-tpl",info.result)
        $(".lessons").html(html)
      }
    })
  }
  
  
})