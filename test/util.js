var util = require('../lib/util');

exports.isNaNStrict = function(test) {
	test.equals(util.isNaNStrict(1), false);
	test.equals(util.isNaNStrict('hello'), false);
	test.equals(util.isNaNStrict(undefined), false);
	test.equals(util.isNaNStrict(null), false);
	test.equals(util.isNaNStrict([]), false);
	test.equals(util.isNaNStrict({}), false);
	test.equals(util.isNaNStrict(false), false);
	test.equals(util.isNaNStrict(1/'hello'), true);
	test.done()
};

exports.isEmpty = function(test) {
	test.equals(util.isEmpty(null), true);
	test.equals(util.isEmpty(), true);
	test.equals(util.isEmpty(1/'hello'), true);
	test.equals(util.isEmpty('hello'), false);
	test.equals(util.isEmpty(1), false);
	test.equals(util.isEmpty([]), false);
	test.equals(util.isEmpty({}), false);
	test.equals(util.isEmpty(false), false);
	test.done()
};
