const locale = require("locale");
require("console-p");

exports.test_basic = function(test) {
  test.pass("Unit test running!");
  console.p(locale.getMylang());
};
