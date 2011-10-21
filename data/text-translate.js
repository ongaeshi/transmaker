// 翻訳結果を送信
$(function() {
  $("#translate-button").click(function(){
    self.postMessage($("#src > textarea").val());
  });
});

// 翻訳結果を受け取る
self.on('message', function(msg) {
  $("#dst").text(msg);
});
