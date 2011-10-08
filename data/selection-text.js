//
// @brief Selection Text
// @author ongaeshi
// @date   2011/10/04

// 複数の翻訳ノードを連結するためのもの
const TRANSLATE_DELIMITER = " @ ";

// 翻訳するノード一覧
var gSelectNodes;

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

      if (srcArray.length > 0) {
        // @todo 一時変数に保存するのでは無く、コンテナに貯蓄してidを渡すのが良さそう
        // @todo rangeを一気に解析してコンテナに保持、検索先でいい感じにする
        gSelectNodes = selectNodes;
        self.port.emit("translate", srcArray);
      }
    }
  }
});

self.port.on("replace", function (dst) {
  // 翻訳単位に分割
  var dstArray = dst.split(TRANSLATE_DELIMITER);

  // @todo アニメーション処理
  // @todo 選択範囲の更新(少なくとも解除するべき)
  for (var i = 0; i < gSelectNodes.length; i++) {
    gSelectNodes[i].node.replaceWholeText(dstArray[i]);
  }
});

