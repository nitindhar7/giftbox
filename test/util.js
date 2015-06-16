var util = require('../lib/util');

exports.isNaNStrict = function(test) {
  test.strictEqual(util.isNaNStrict(1), false);
  test.strictEqual(util.isNaNStrict('hello'), false);
  test.strictEqual(util.isNaNStrict(undefined), false);
  test.strictEqual(util.isNaNStrict(null), false);
  test.strictEqual(util.isNaNStrict([]), false);
  test.strictEqual(util.isNaNStrict({}), false);
  test.strictEqual(util.isNaNStrict(false), false);
  test.strictEqual(util.isNaNStrict(1/'hello'), true);
  test.done()
};

exports.isEmpty = function(test) {
  test.strictEqual(util.isEmpty(null), true);
  test.strictEqual(util.isEmpty(), true);
  test.strictEqual(util.isEmpty(1/'hello'), true);
  test.strictEqual(util.isEmpty('hello'), false);
  test.strictEqual(util.isEmpty(1), false);
  test.strictEqual(util.isEmpty([]), false);
  test.strictEqual(util.isEmpty({}), false);
  test.strictEqual(util.isEmpty(false), false);
  test.done()
};
