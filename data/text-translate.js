// 翻訳結果を送信
$(function() {
  $("#translate-button").click(function(){
    var msg = {
      from: $('#from-lang-select option:selected').val(),
      to: $('#to-lang-select option:selected').val(),
      text:$("#src > textarea").val()
    };
    self.postMessage(msg);
  });
});

// 翻訳結果を受け取る
self.on('message', function(msg) {
  $("#dst").text(msg);
});
