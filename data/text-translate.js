// 翻訳結果を送信
$(function() {
  $("#translate-button").click(function(){
    var msg = {
      kind: 'translate',
      from: $('#from-lang-select').val(),
      to: $('#to-lang-select').val(),
      text:$("#src > textarea").val()
    };
    self.postMessage(msg);
  });

  $("#close-button").click(function() {
    var msg = {
      kind: 'close'
    };
    self.postMessage(msg);
  });
});

// 翻訳結果を受け取る
self.on('message', function(msg) {
  $("#dst").text( msg );
});
