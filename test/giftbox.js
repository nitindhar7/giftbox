var Giftbox = require('../lib/giftbox'),
	Option = Giftbox.Option,
	Some = Giftbox.Some,
	None = Giftbox.None;

exports.optionConstructor = function(test) {
    test.equal(Option('') instanceof Option, true);
    test.equal(Option('hello') instanceof Option, true);
    test.equal(Option(null) instanceof Option, true);
    test.equal(Option(undefined) instanceof Option, true);
    test.equal(Option(1) instanceof Option, true);
    test.equal(Option(NaN) instanceof Option, true);
    test.equal(Option(false) instanceof Option, true);
    test.equal(Option(true) instanceof Option, true);
    test.equal(Option([]) instanceof Option, true);
    test.equal(Option({}) instanceof Option, true);
    test.equal(Option(function() {
    	return 'hello world';
    }) instanceof Option, true);
    test.strictEqual(Option(function() {
    	return 'hello world';
    }).get(), 'hello world');
    test.done();
};

exports.optionGet = function(test) {
    test.strictEqual(Option('').get(), '');
    test.strictEqual(Option('hello').get(), 'hello');
    test.strictEqual(Option(null).get(), null);
    test.strictEqual(Option(undefined).get(), undefined);
    test.strictEqual(Option(1).get(), 1);
    test.strictEqual(isNaN(Option(NaN).get()), true);
    test.strictEqual(Option(false).get(), false);
    var arr = [];
    test.strictEqual(Option(arr).get(), arr);
    var obj = {};
    test.strictEqual(Option(obj).get(), obj);
    test.done();
};

exports.optionGetOrElse = function(test) {
    test.strictEqual(Option('').getOrElse('hello'), '');
    test.strictEqual(Option('hello').getOrElse('world'), 'hello');
    test.strictEqual(Option(null).getOrElse('hello'), 'hello');
    test.strictEqual(Option(undefined).getOrElse('hello'), 'hello');
    test.strictEqual(Option(1).getOrElse(2), 1);
    test.strictEqual(Option(NaN).getOrElse(1), 1);
    test.strictEqual(Option(false).getOrElse(true), false);
    var arr = [];
    var elseArr = ['hello'];
    test.strictEqual(Option(arr).getOrElse(elseArr), arr);
    var obj = {};
    var elseObj = {};
    test.strictEqual(Option(obj).getOrElse(elseObj), obj);
    test.done();
};

exports.optionOrElse = function(test) {
	var elseOption = Option('hello');
	test.strictEqual(Option(null).orElse(elseOption), elseOption);
	var option = Option(123);
	test.strictEqual(option.orElse(elseOption), option);
	test.done();
};

exports.optionOrNull = function(test) {
	test.strictEqual(Option(null).orNull(), null);
	test.strictEqual(Option('hello').orNull(), 'hello');
	test.done();
};

exports.optionMap = function(test) {
	test.equal(Option(null).map(function(val) {
		return val.toUpperCase();
	}) instanceof None, true);
	test.equal(Option('hello').map(function(val) {
		return val.toUpperCase();
	}) instanceof Some, true);
	test.strictEqual(Option('hello').map(function(val) {
		return val.toUpperCase();
	}).get(), 'HELLO');
	test.done();
};

exports.optionFlatMap = function(test) {
	test.equal(Option('hello').flatMap(function(val) {
		return Option(val);
	}) instanceof Option, true);
	test.strictEqual(Option('hello').flatMap(function(val) {
		return Option(val.toUpperCase());
	}).get(), 'HELLO');
	test.strictEqual(Option('hello').flatMap(function(val) {
		return Option(val.toUpperCase()).flatMap(function(innerval) {
			return Option(innerval + ' WORLD!');
		});
	}).get(), 'HELLO WORLD!');
	test.equal(Option(null).flatMap(function(val) {
		return Option(val);
	}) instanceof None, true);
	test.done();
};

exports.optionFilter = function(test) {
	var opt = Option('hello');
    test.equal(opt.filter(function(val) {
    	return val === 'hello';
    }) instanceof Some, true);
    test.strictEqual(opt.get(), 'hello');
    var absent = Option(null);
    test.equal(absent.filter(function(val) {
    	return val === 'hello';
    }) instanceof None, true);
    test.strictEqual(absent.getOrElse('world'), 'world');
    test.done();
};

exports.optionFilterNot = function(test) {
	var opt = Option('hello');
    test.equal(opt.filterNot(function(val) {
    	return val === 'hello';
    }) instanceof None, true);
    test.strictEqual(opt.filterNot(function(val) {
    	return val === 'hello';
    }).get(), undefined);
    var absent = Option(null);
    test.equal(absent.filter(function(val) {
    	return val === 'hello';
    }) instanceof None, true);
    test.strictEqual(absent.getOrElse('world'), 'world');
    test.done();
};

exports.optionForeach = function(test) {
	var withPrefix = ' world';
	Option('hello').foreach(function(val) {
		withPrefix = val + withPrefix;
	});
	test.strictEqual(withPrefix, 'hello world');
	Option(null).foreach(function(val) {
		withPrefix = val + withPrefix;
	});
	test.strictEqual(withPrefix, 'hello world');
    test.done();
};

exports.optionMatch = function(test) {
	Option('hello').match(function(val) {
		test.strictEqual(val, 'hello');
	}, function() {
		// should never run. if it does, it rightly failed!
		test.equal(true, false);
	});
	Option(undefined).match(function(val) {
		// should never run. if it does, it rightly failed!
		test.equal(true, false);
	}, function() {
		test.equal(true, true);
	});
	test.done();
};
