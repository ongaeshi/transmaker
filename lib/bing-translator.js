//
// @brief Bing! Translator
// @author ongaeshi
// @date   2011/10/04

const xhr = require("xhr");

exports.translate = function (text, from, to) {
  let appId = '9D3E63A82743F70EE2ED00D952E1B06F619C560E',
      url   = 'http://api.microsofttranslator.com/v2/Http.svc/Translate?' +
              'appId=' + appId +
              '&text=' + encodeURIComponent(text) +
              '&from=' + from +
              '&to='   + to,
      req  = new xhr.XMLHttpRequest();

  req.open("GET", url, false);
  req.send(null);

  if (req.status == 200)
    return req.responseXML.getElementsByTagName('string')[0].textContent;
  else
    return 'Error Translate';
}
