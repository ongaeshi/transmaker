//
// @brief Selection Text
// @author ongaeshi
// @date   2011/10/04

var translateNode;

self.port.on("replace-select", function() {
  var selection = window.getSelection();

  if (selection && selection.rangeCount) {
    var range = selection.getRangeAt(0); // @todo 複数の選択範囲に対応
      
    if (range) {
      var selectNodes = Range_walk(
        range,
        function (node) {
          if (node.nodeType == 3) {
            var text = node.wholeText;
            if (text.replace(/[ \t\n]/g, "").length > 0)
              this.push({node:node, text:text});
          }
        },
        []);

      var srcArray = selectNodes.map(function(v) {
        return v.text;
      });

      Dump.p(srcArray);

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

