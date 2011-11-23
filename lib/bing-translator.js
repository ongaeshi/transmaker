//
// @brief Bing! Translator
// @author ongaeshi
// @date   2011/10/04

const xhr = require("xhr");
const request = require("request");

const APP_ID = '9D3E63A82743F70EE2ED00D952E1B06F68E61A40';

exports.translate = function (text, from, to) {
  let url   = 'http://api.microsofttranslator.com/v2/Http.svc/Translate?' +
              'appId=' + APP_ID +
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

exports.translate2 = function (text, from, to, onComplete) {
  let req = request.Request({
    url: "http://api.microsofttranslator.com/V2/Ajax.svc/Translate",
    content: {
      appId: APP_ID,
      text: text,
      from:  from,
      to:    to,
    },
    onComplete: function (response) {
      onComplete(response.json);
    }
  });
  req.get();
}

exports.translateArray = function (texts, from, to, onComplete) {
  let req = request.Request({
    url: "http://api.microsofttranslator.com/V2/Ajax.svc/TranslateArray",
    content: {
      appId: APP_ID,
      texts: JSON.stringify(texts),
      from:  from,
      to:    to,
    },
    onComplete: function (response) {
      onComplete(response.json);
    }
  });
  req.get();
}

exports.translatePost = function (text, from, to, onComplete) {
//   let url   = 'http://api.microsofttranslator.com/v2/Http.svc/Translate?' +
//               'appId=' + APP_ID +
//               '&text=' + encodeURIComponent(text) +
//               '&from=' + from +
//               '&to='   + to,
//       req  = new xhr.XMLHttpRequest();

//   req.onreadystatechange = function() {
//     if (req.readyState === 4) {
// //       console.p(req.responseText);
// //       console.p(req.responseXML);
//       var text = req.responseXML.getElementsByTagName('string')[0].textContent;
//       onComplete(text);
//     }
//   };  

//   req.open("GET", url, true);
//   req.send(null);

  let param = 'appId=' + APP_ID +
              '&text=' + encodeURIComponent(text) +
              '&from=' + from +
              //'&to='   + to +
              '&contentType=text/plain',
      req  = new xhr.XMLHttpRequest();

  req.onreadystatechange = function() {
    if (req.readyState === 4) {
      console.p(req.responseText);
      var text = req.responseXML.getElementsByTagName('string')[0].textContent;
      onComplete(text);
    }
  };  

  // req.open("POST", "http://api.microsofttranslator.com/v2/Http.svc/Translate?appId=9D3E63A82743F70EE2ED00D952E1B06F68E61A40", true);
  //req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  var body = '<TranslateArrayRequest><AppId>9D3E63A82743F70EE2ED00D952E1B06F68E61A40</AppId><From>en</From><Texts><string xmlns="http://schemas.microsoft.com/2003/10/Serialization/Arrays">test</string></Texts><To>ja</To></TranslateArrayRequest>';
  req.open("POST", "http://api.microsofttranslator.com/v2/Http.svc/TranslateArray", true);
  req.setRequestHeader("Content-Type", "text/xml");
  req.setRequestHeader("Content-Length", body.length);
  req.send(body);
  // req.send(param);

//   console.p(req.readyState);
//   console.p(req.responseText);
//   console.p(req.responseXML.getElementsByTagName('string')[0].textContent);
//   console.p(param);

//   if (req.readyState == 4 && req.responseText) {
//     var text = req.responseXML.getElementsByTagName('string')[0].textContent;
//     onComplete(text);
//   }
}

