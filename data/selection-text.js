//
// @brief Selection Text
// @author ongaeshi
// @date   2011/10/04

var SelectNode = function (node, range) {
  this.node = node;
  this.startOffset = (node == range.startContainer) ? range.startOffset : 0;
  this.endOffset   = (node == range.endContainer) ? range.endOffset : node.wholeText.length; /* endOffsetはlengthなので注意 */
}

SelectNode.prototype.translateText = function () {
  var text = this.node.wholeText;
  return text.substring(this.startOffset, this.endOffset);
}

SelectNode.prototype.replaceText = function (translatedText) {
  var text = this.node.wholeText;
  return text.slice(0, this.startOffset) + translatedText + text.slice(this.endOffset);
}

SelectNode.prototype.insertPos = function () {
  return this.endOffset;
}

function findSelectionNode (selection) {
  var nodes = [];
  
  for (var i = 0; i < selection.rangeCount; i++) {
    var range = selection.getRangeAt(i);
    
    var result = Range_walk(
      range,
      function (node) {
        // @todo startOffset, endOffsetに対応
        if (node.nodeType == 3) {
          var text = node.wholeText;
          if (text.replace(/[ \t\n]/g, "").length > 0) {
            this.push( new SelectNode(node, range) );
          }
        }
      },
      []);

    nodes = nodes.concat(result);
  }

  return nodes;
}

function nodes2texts(nodes) {
  return nodes.map(function(v) { return v.translateText(); });
}

function deselectWindow() {
  var sel = window.getSelection();

  if (sel)
    sel.removeAllRanges();
}

