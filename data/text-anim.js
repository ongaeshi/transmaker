//
// @brief Text Animation
// @author ongaeshi
// @date   2011/10/04

var easeInQuad = function (t, b, c, d) {
  return c*(t/=d)*t + b;
}

var easeOutQuad = function (t, b, c, d) {
  return -c *(t/=d)*(t-2) + b;
}

var linear = function(t, b, c, d) {
  //return firstNum + diff * p;
  return c * (t/=d) + b;
}


var replaceAnimation = function (node, dst) {
  // パラメータ
  const CHANGE_MSEC   = 300,
        INTERVAL_MSEC = 32; // 30F

  // 作業用変数
  var src = node.wholeText;
  var currentTime = 0;

  // アニメーション処理
  var timer = setInterval(function() {
    var rate = easeOutQuad(currentTime, 0, 1, CHANGE_MSEC);

    node.replaceWholeText(dst.substring(0, dst.length * rate) +
                          src.substring(src.length * rate, src.length));

    currentTime += INTERVAL_MSEC;

    if (currentTime >= CHANGE_MSEC) {
      node.replaceWholeText(dst);
      clearInterval(timer);
    }
  }, INTERVAL_MSEC);
}

var insertAnimation = function (node, insertText) {
  // パラメータ
  const CHANGE_MSEC   = 300,
        INTERVAL_MSEC = 32; // 30F

  // 作業用変数
  var src = node.wholeText;
  var currentTime = 0;

  // アニメーション処理
  var timer = setInterval(function() {
    var rate = easeOutQuad(currentTime, 0, 1, CHANGE_MSEC);

    node.replaceWholeText(src + insertText.substring(0, insertText.length * rate));

    currentTime += INTERVAL_MSEC;

    if (currentTime >= CHANGE_MSEC) {
      node.replaceWholeText(src + insertText);
      clearInterval(timer);
    }
  }, INTERVAL_MSEC);
}

var undoAnimation = function (node, dst) {
  // @todo アニメーションにすると上手くいかない？要検証。
  //node.replaceWholeText(dst);
  //replaceAnimation(node, dst);

  // パラメータ
  const CHANGE_MSEC   = 200,
        INTERVAL_MSEC = 32; // 30F

  // 作業用変数
  var src = node.wholeText;
  var currentTime = 0;

  // アニメーション処理
  var timer = setInterval(function() {
    var rate = 1.0 - linear(currentTime, 0, 1, CHANGE_MSEC);

    node.replaceWholeText(src.substring(0, src.length * rate) +
                          dst.substring(dst.length * rate, dst.length));

    currentTime += INTERVAL_MSEC;

    if (currentTime >= CHANGE_MSEC) {
      node.replaceWholeText(dst);
      clearInterval(timer);
    }
  }, INTERVAL_MSEC);
  
}