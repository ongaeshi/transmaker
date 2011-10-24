//
// @brief
// @author ongaeshi
// @date   2011/10/25

const platform = require("platform");

const paramMac = {
  keycombo: {
    replace: "meta-ctrl-r",
    insert:  "meta-ctrl-i",
    undo:    "meta-ctrl-z"
  },

  context_label: {
    text:    "Text translate",
    replace: "Replace translate　　　⌘+Ctrl+R",
    insert:  "Insert translate　　　　⌘+Ctrl+i",
    undo:    "Undo translate　　　　⌘+Ctrl+Z"
  }
};

const paramOther = {
  keycombo: {
    replace: "alt-shift-r",
    insert:  "alt-shift-i",
    undo:    "alt-shift-z"
  },

  context_label: {
    text:    "Text translate",
    replace: "Replace translate　　　Alt+Shift+R",
    insert:  "Insert translate　　　　Alt+Shift+i",
    undo:    "Undo translate　　　　Alt+Shift+Z"
  }
};

exports.getParam = function() {
  if (platform.isMac())
    return paramMac;
  else
    return paramOther;
};

