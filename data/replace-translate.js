//
// @brief Replace Translate
// @author ongaeshi
// @date   2011/10/04

// 翻訳するノード一覧
var gSelectNodes;

self.port.on("replace-translate", function() {
  var selection = window.getSelection();

  if (selection) {
    var nodes = findSelectionNode(selection),
        texts = nodes2texts(nodes);

    if (texts.length > 0) {
      // @todo 連続翻訳があると上手く動かない気がする
      // @todo 一時変数に保存するのでは無く、コンテナに貯蓄してidを渡すのが良さそう
      // @todo rangeを一気に解析してコンテナに保持、検索先でいい感じにする
      gSelectNodes = nodes;
      self.port.emit("translate", texts);
    }
  }
});

self.port.on("replace-translate-end", function (translatedArray) {
  // テキスト入れ替え
  for (var i = 0; i < gSelectNodes.length; i++) {
    //gSelectNodes[i].node.replaceWholeText(translatedArray[i].TranslatedText);
    replaceAnimation(gSelectNodes[i].node, translatedArray[i].TranslatedText);
  }

  // 選択範囲をクリア
  deselectWindow();

  // 翻訳ノードを解除
  gSelectNodes = null;
});

