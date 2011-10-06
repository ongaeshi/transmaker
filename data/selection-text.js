//
// @brief Selection Text
// @author ongaeshi
// @date   2011/10/04

var translateNode;

self.port.on("replace-select", function() {
  // @todo 複数ウィンドウ対応
  // @todo 複数範囲に対応
  if (window.getSelection()) {
    var range = window.getSelection().getRangeAt(0);

    if (range.startContainer.nodeType == 3) {
      translateNode = range.startContainer;
      self.port.emit("translate", translateNode.wholeText);
    }
  }
});

self.port.on("replace", function (dst) {
  // @todo アニメーション処理
  translateNode.replaceWholeText(dst);
});

