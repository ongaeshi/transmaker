//
// @brief Replace Translate
// @author ongaeshi
// @date   2011/10/04

// 翻訳するノード一覧
var gSelectNodes;

self.port.on("replace-translate", function() {
  var selection = window.getSelection();

  if (selection && isActiveWindow()) {
    var nodes = findSelectionNode(selection),
        texts = nodes2texts(nodes);

    if (texts.length > 0) {
      // @todo 連続翻訳があると上手く動かない気がする
      // @todo 一時変数に保存するのでは無く、コンテナに貯蓄してidを渡すのが良さそう
      // @todo rangeを一気に解析してコンテナに保持、検索先でいい感じにする
      gSelectNodes = nodes;
      self.port.emit("translate", {msg:"replace-translate-end", texts:texts, from:document.documentElement.lang });
    }
  }
});

self.port.on("replace-translate-end", function (translatedArray) {
  // undo用のデータ
  var undoNodes = [];
  
  // テキスト入れ替え
  for (var i = 0; i < gSelectNodes.length; i++) {
    // 翻訳前のテキストを記録
    undoNodes.push({node: gSelectNodes[i].node, text: gSelectNodes[i].node.wholeText + ''}); // 文字列は複製しておくこと
    
    // 翻訳アニメーションの実行
    replaceAnimation(gSelectNodes[i].node, gSelectNodes[i].replaceText(translatedArray[i].TranslatedText));
  }

  // コンテナに記録
  addUndoContainer(undoNodes);

  // 選択範囲をクリア
  deselectWindow();

  // 翻訳ノードを解除
  gSelectNodes = null;
});

