//
// @brief Selection Text
// @author ongaeshi
// @date   2011/10/04

// 翻訳するノード一覧
var gSelectNodes;

function deselectWindow() {
  var sel = window.getSelection();

  if (sel)
    sel.removeAllRanges();
}

self.port.on("replace-select", function() {
  var selection = window.getSelection();

  if (selection) {
    var selectNodes = [];
    
    for (var i = 0; i < selection.rangeCount; i++) {
      var range = selection.getRangeAt(i);
      
      var result = Range_walk(
        range,
        function (node) {
          // @todo startOffset, endOffsetに対応
          if (node.nodeType == 3) {
            var text = node.wholeText;
            if (text.replace(/[ \t\n]/g, "").length > 0)
              this.push({node:node, text:text});
          }
        },
        []);

      selectNodes = selectNodes.concat(result);
    }

    var srcArray = selectNodes.map(function(v) {
      return v.text;
    });

    if (srcArray.length > 0) {
      // @todo 連続翻訳があると上手く動かない気がする
      // @todo 一時変数に保存するのでは無く、コンテナに貯蓄してidを渡すのが良さそう
      // @todo rangeを一気に解析してコンテナに保持、検索先でいい感じにする
      gSelectNodes = selectNodes;
      self.port.emit("translate", srcArray);
    }
  }
});

var easeInQuad = function (t, b, c, d) {
  return c*(t/=d)*t + b;
}

var easeOutQuad = function (t, b, c, d) {
  return -c *(t/=d)*(t-2) + b;
}

var replaceAnimation = function (node, dst) {
  var src = node.wholeText,
      progress = 0;

  var changeMsec = 250;
  var intervalMsec = 32;
  var currentTime = 0;

  var timer = setInterval(function() {
    // var rate = progress * intervalMsec / changeMsec;

    var rate = easeOutQuad(currentTime, 0, 1, changeMsec);
    //Dump.p(rate);
    
    node.replaceWholeText(dst.substring(0, src.length * rate) +
                          src.substring(dst.length * rate, dst.length));
    //progress++;

    currentTime += intervalMsec;

    if (currentTime >= changeMsec) {
      node.replaceWholeText(dst);
      clearInterval(timer);
    }
  }, intervalMsec);
}

self.port.on("replace", function (translatedArray) {
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

