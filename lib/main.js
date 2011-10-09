const widgets = require("widget");
const tabs = require("tabs");
const contextMenu = require("context-menu");
const notifications = require("notifications");
const data = require("self").data;
const bingTranlator = require("bing-translator");
const panel = require("panel");
require("console-p");

// 通知文字最大数
const NOTIFY_LIMIT = 250;

// 登録されているワーカー
var gWorkers = [];

function textLimit(src, length) {
  if (src.length > length)
    return src.substr(0, length) + "..."
  else
    return src;
}

function notify(title, text) {
  notifications.notify({
    title: title,
    text: textLimit(text, NOTIFY_LIMIT),
    data: text,
    onClick: function (data) {
      console.log(data);
    }
  });
}

function replaceTranslate() {
  // console.log("gWorkers.length : " + gWorkers.length);
  gWorkers.forEach(function (worker) {
      worker.port.emit("replace-select");
  });
}

function detachWorker(worker, workerArray) {
  var index = workerArray.indexOf(worker);
  if(index != -1) {
    workerArray.splice(index, 1);
  }
}

exports.main = function(options, callbacks) {
  // ページの書き換え制御 
  var pageMod = require("page-mod");
  pageMod.PageMod({
    include: "*",
    contentScriptFile: [
      data.url("jquery-1.6.4.min.js"),
      data.url("dump.js"),
      data.url("range-walk.js"),
      data.url("selection-text.js")
    ],
    onAttach: function(worker) {
      gWorkers.push(worker);
      
      worker.port.on('translate', function (src) {
        bingTranlator.translateArray(src, 'en', 'ja', function(json) {
          notify("Translate!!", json.map(function(v){return v.TranslatedText;}).join(", "));
          worker.port.emit("replace", json);
        });
      });
      
      worker.on('detach', function () {
        detachWorker(this, gWorkers);
      });
    }
  });

  // --- コンテキストメニュー ---
  // 非選択時
  contextMenu.Item({
    label: "Text translate",
    image: data.url("icon.png"),
    contentScript: 'self.on("click", function(){ self.postMessage(""); });',
    onMessage: function(msg) {
      notify("Sorry!!", "Under construction.");
    }
  });

  contextMenu.Item({
    label: "Undo translate",
    image: data.url("icon.png"),
    contentScript: 'self.on("click", function(){ self.postMessage(""); });',
    onMessage: function(msg) {
      notify("Sorry!!", "Under construction.");
    }
  });

  // 選択時
  contextMenu.Item({
    label: "Insert translate",
    image: data.url("icon.png"),
    context: contextMenu.SelectionContext(),
    contentScript: 'self.on("click", function(){ self.postMessage(""); });',
    onMessage: function(msg) {
      notify("Sorry!!", "Under construction.");
    }
  });

  contextMenu.Item({
    label: "Replace translate",
    image: data.url("icon.png"),
    context: contextMenu.SelectionContext(),
    contentScript: 'self.on("click", function(){ self.postMessage(""); });',
    onMessage: function(msg) {
      replaceTranslate();
    }
  });

}

