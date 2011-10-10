//
// @brief Selection Text
// @author ongaeshi
// @date   2011/10/04

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
          if (text.replace(/[ \t\n]/g, "").length > 0)
            this.push({node:node, text:text});
        }
      },
      []);

    nodes = nodes.concat(result);
  }

  return nodes;
}

function nodes2texts(nodes) {
  return nodes.map(function(v) { return v.text; });
}

function deselectWindow() {
  var sel = window.getSelection();

  if (sel)
    sel.removeAllRanges();
}

