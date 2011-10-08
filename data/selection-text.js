//
// @brief Selection Text
// @author ongaeshi
// @date   2011/10/04

var translateNode;

self.port.on("replace-select", function() {
  var selection = window.getSelection();

  // @todo 複数ウィンドウ対応
  // @todo 複数範囲に対応
  if (selection && selection.rangeCount) {
    var range = selection.getRangeAt(0);
      
    if (range) {
      if (range.startContainer.nodeType == 3) {
        // @todo 一時変数に保存するのでは無く、コンテナに貯蓄してidを渡すのが良さそう
        // @todo rangeを一気に解析してコンテナに保持、検索先でいい感じにする
        translateNode = range.startContainer; 
        self.port.emit("translate", translateNode.wholeText);
      }
    }
  }
});

self.port.on("replace", function (dst) {
  // @todo アニメーション処理
  translateNode.replaceWholeText(dst);
});

