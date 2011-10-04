//
// @brief Insert Translate
// @author ongaeshi
// @date   2011/10/04

self.on("click", function () {
  var text = window.getSelection().toString();
  self.postMessage(text);
});

