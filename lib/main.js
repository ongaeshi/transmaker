const widgets = require("widget");
const tabs = require("tabs");
const contextMenu = require("context-menu");
const notifications = require("notifications");

function notify(text) {
  notifications.notify({
    title: "Translate!!",
    text: text,
    data: text,
    onClick: function (data) {
      console.log(data);
    }
  });
}

exports.main = function(options, callbacks) {
  // Build contextMenu.
  var childMenus = [];

  var insertText = contextMenu.Item({ label: "Insert translate text" });
  childMenus.push(insertText);

  var replaceText = contextMenu.Item({label: "Replace translate text"});
  childMenus.push(replaceText);
  
  var rootMenu = contextMenu.Menu({
    label: "JustTrans",
    items: childMenus,
    context: contextMenu.SelectionContext(),
    contentScript: 'self.on("click", function () { ' +
                   '  var text = window.getSelection().toString();' +
                   '  self.postMessage(text);' +
                   '});',
    onMessage: function(msg) {
      notify(msg);
    }
  });
}

