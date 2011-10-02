const widgets = require("widget");
const tabs = require("tabs");
const contextMenu = require("context-menu");

exports.main = function(options, callbacks) {
  // Build contextMenu.
  var childMenus = [];

  var insertText = contextMenu.Item({label: "Insert translate text"});
  childMenus.push(insertText);

  var replaceText = contextMenu.Item({label: "Replace translate text"});
  childMenus.push(replaceText);
  
  var rootMenu = contextMenu.Menu({
    label: "JustTrans",
    items: childMenus,
    context: contextMenu.SelectionContext(),
  });
}

