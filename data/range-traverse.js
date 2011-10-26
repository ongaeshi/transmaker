//
// @brief
// @author ongaeshi
// @date   2011/10/26

var Traverse = {
  range: function(range, callback, self) {
    var startNode = this.rangeStartNode(range),
        endNode   = this.rangeEndNode(range, startNode);

    return this.node(startNode, endNode, callback, self);
  },

  // --------------------------------------

  node: function(node, endNode, callback, self) {
    var n;

    while (node) {
      // コールバック呼び出し
      callback.call(self, node);

      // 終端まで来たら終了
      if (node === endNode)
        break;

      // 子供を辿る
      n = node.firstChild;
      if (n) {
        node = n;
        continue;
      }

      // 兄弟を辿る
      n = node.nextSibling;
      if (n) {
        node = n;
        continue;
      }
      
      // 子も兄弟もいなければ親に戻っていく
      node = node.parentNode;
      while (node) {
        // 途中に兄弟が見つかればそちらへ
        n = node.nextSibling;
        if (n) {
          node = n;
          break;
        }

        // さらに上の階層へ
        node = node.parentNode;
      }
    }

    // 結果を返す
    return self;
  },

  rangeStartNode: function(range) {
    var node = range.startContainer,
        offset = range.startOffset;
    
    if (this.isTextNode(node))
      return node;
    else
      return node.childNodes[offset - Number(offset === node.length)];
  },

  rangeEndNode: function(range, startNode) {
    var node = range.endContainer,
        offset = range.endOffset;

    if (this.isTextNode(node)) {
      return node;
    }
    else {
      node = node.childNodes[offset - 1];
      
      if (node === startNode) {
        while (node.hasChildNodes()) {
          node = node.lastChild; 
        }
      }
      return node;
    }
  },

  isTextNode: function(node) {
    switch (node.nodeType) {
     case 3:
     case 4:
     case 7:
     case 8:
      return true;
    default:
      return false;
    }
  }
};





