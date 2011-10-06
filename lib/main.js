const widgets = require("widget");
const tabs = require("tabs");
const contextMenu = require("context-menu");
const notifications = require("notifications");
const data = require("self").data;
const bingTranlator = require("bing-translator");
const panel = require("panel");

// 登録されているワーカー
var workers = [];

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

function replaceTranslate() {
  workers.forEach(
    function (worker) {
      worker.port.emit("replace-select");
  });
}

exports.main = function(options, callbacks) {
  // ページの書き換え制御 
  var pageMod = require("page-mod");
  pageMod.PageMod({
    include: "*",
    contentScriptFile: [data.url("jquery-1.6.4.min.js"), data.url("selection-text.js")],
    onAttach: function(worker) {
      workers.push(worker);
      worker.port.on('translate', function (msg) {
        var dst = bingTranlator.translate(msg, 'en', 'ja');
        notify(dst);
        worker.port.emit("replace", dst);
      });
    }
  });
  
  // コンテキストメニュー
  var childMenus = [];

//   var insertText = contextMenu.Item({ label: "Insert translate text" });
//   childMenus.push(insertText);

  var replaceText = contextMenu.Item({label: "Replace translate text"});
  childMenus.push(replaceText);

  var rootMenu = contextMenu.Menu({
    label: "JustTrans",
    items: childMenus,
    context: contextMenu.SelectionContext(), 
    contentScript: 'self.on("click", function(){ self.postMessage(""); });',
    onMessage: function(msg) {
      replaceTranslate();
    }
  });

}

