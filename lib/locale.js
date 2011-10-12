//
// @brief 
// @author   ongaeshi
// @date     2011/10/13
//
// General.useragent.locale
// http://kb.mozillazine.org/General.useragent.locale
//
// Name of Language
// http://www.loc.gov/standards/iso639-2/php/code_list.php
//
// Microsoft Translator API Languages List - Language Codes and Names 
// http://www.emreakkas.com/internationalization/microsoft-translator-api-languages-list-language-codes-and-names

let prefs = require("preferences-service");

// 現在のロケールを取得
//
// en .. 英語
// ja .. 日本語
//
// en-US 等でも "en" として返す。
// ja-JP-mac 等でも "ja" として返す。
//
exports.getLocale = function(l) {
  let locale = l || prefs.get("general.useragent.locale", "en-US");

  switch (locale) {
   case "ja":
   case "ja-JP-mac":
    return "ja";
  default:
    return "en";
  }
}

// 母国語を取得する
//   general.useragent.locale の値を見て決定する、
//   翻訳先の言語(from)の基本値として使用する
//
exports.getMylang = function() {
  let locale = prefs.get("general.useragent.locale", "en-US");

  switch (locale) {
   case "ja":
   case "ja-JP-mac":
    return "ja";
   case "en":
   case "en-US":
    return "en";
  default:
    return locale;
  }
}

