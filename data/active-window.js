//
// @brief 現在ウィンドウがアクティブか取得
// @author ongaeshi
// @date   2011/10/10

// 本当はfalseにしたいが、起動時にアクティブなwindowがとれないのでtrueにしておく
var gActiveWindow = true;

$(function() {
  $(document)
    .blur(function(){
      gActiveWindow = false;
    })
    .focus(function(){
      gActiveWindow = true;
    });
});

function isActiveWindow() {
  return gActiveWindow;
}




