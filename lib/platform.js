//
// @brief
// @author ongaeshi
// @date   2011/10/24

const { Cc, Ci } = require("chrome");
const runtime = Cc["@mozilla.org/xre/app-info;1"].getService(Ci.nsIXULRuntime);

exports.isMac = function() {
  return runtime.OS === "Darwin";
}
