/**
 * Created by Administrator on 2017/8/22.
 */
define(["jquery","datepicker","datepicker_cn"],function ($) {
  function getPramaObj (){
    var prama = location.search;
    var prama = prama.slice(1);
    var pramaArr = prama.split("&");
    var pramaObj = {};
    for (var i = 0; i < pramaArr.length; i++){
      var key = pramaArr[i].split("=")[0];
      var value = pramaArr[i].split("=")[1];
      pramaObj[key] = value;
    }
    return pramaObj;
  }
  function getPrama(key){
    return getPramaObj()[key];
  }
  
  function getDate(ele){
    //添加日期插件
    $(ele).datepicker({
      format: 'yyyy-mm-dd',//日期的格式
      //startDate: '-10d',  //可以选择的开始时间
      endDate:"+0d",        //选择的结束时间
      autoclose:true,      //选完日期自动关闭
      language:"zh-CN",     //选择语言，注意需要额外引入一个语言包
      todayBtn:"linked",
      todayHighlight:true
    });
  }
  
  return {
    getPramaObj:getPramaObj,
    getPrama:getPrama,
    getDate:getDate
  }
  
  
  
})