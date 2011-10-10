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

    node.replaceWholeText(dst.substring(0, src.length * rate) +
                          src.substring(dst.length * rate, dst.length));

    currentTime += INTERVAL_MSEC;

    if (currentTime >= CHANGE_MSEC) {
      node.replaceWholeText(dst);
      clearInterval(timer);
    }
  }, INTERVAL_MSEC);
}

