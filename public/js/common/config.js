/**
 * Created by Administrator on 2017/8/20.
 */
require.config({
  baseUrl: "/public/",
  paths:{
    jquery:"assets/jquery/jquery.min",
    jquery_cookie:"assets/jquery-cookie/jquery.cookie",
    jquery_form:"assets/jquery-form/jquery.form",
    jquery_region:"assets/jquery-region/jquery.region",
    jquery_Jcrop:"assets/Jcrop/js/Jcrop",
    echarts:"assets/echarts/echarts.min",
    template:"assets/artTemplate/template-web",
    bootstrap:"assets/bootstrap/js/bootstrap.min",
    tool:"js/common/tool",
    datepicker:"assets/bootstrap-datepicker/js/bootstrap-datepicker.min",
    datepicker_cn:"assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min",
    nprogress:"assets/nprogress/nprogress",
    uploadify:"assets/uploadify/jquery.uploadify",
    ckeditor:"assets/ckeditor/ckeditor",
  },
  shim:{
    bootstrap:{
      deps:["jquery"]
    },
    datepicker_cn:{
      deps:["jquery","datepicker"]
    },
    uploadify:{
      deps:["jquery"]
    },
    ckeditor:{
      exports:"CKEDITOR"
    },
    jquery_Jcrop:{
      deps:["jquery"]
    }
  }
  
});