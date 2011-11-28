//
// @brief
// @author ongaeshi
// @date   2011/11/23

function escapeHTML(str) str.replace(/[&"'<>]/g, function (m) "&" + ({ "&": "amp", '"': "quot", "'": "apos", "<": "lt", ">": "gt" })[m] + ";");

var replaceTextSafety = function(node, text) {
  // node.replaceWholeText(text);
  node.textContent = escapeHTML(text);
}





