//
// @brief Undo
// @author ongaeshi
// @date   2011/10/10

// undo用のコンテナ
var gUndoContainer = [];

self.port.on("undo-translate", function () {
  if (isActiveWindow()) {
    // undo用のデータ
    var undoNodes = gUndoContainer.pop();

    if (undoNodes) {
      // テキスト入れ替え
      for (var i = 0; i < undoNodes.length; i++) {
        // 翻訳アニメーションの実行
        undoAnimation(undoNodes[i].node, undoNodes[i].text);
      }
    }
  }
});
