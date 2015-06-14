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
    test.equal(Option(function() {
    	return 'hello world';
    }).get() === 'hello world', true);
    test.done();
};

exports.optionGet = function(test) {
    test.equal(Option('').get() === '', true);
    test.equal(Option('hello').get() === 'hello', true);
    test.equal(Option(null).get() === null, true);
    test.equal(Option(undefined).get() === undefined, true);
    test.equal(Option(1).get() === 1, true);
    test.equal(isNaN(Option(NaN).get()), true);
    test.equal(Option(false).get() === false, true);
    var arr = [];
    test.equal(Option(arr).get() === arr, true);
    var obj = {};
    test.equal(Option(obj).get() === obj, true);
    test.done();
};

exports.optionGetOrElse = function(test) {
    test.equal(Option('').getOrElse('hello') === '', true);
    test.equal(Option('hello').getOrElse('world') === 'hello', true);
    test.equal(Option(null).getOrElse('hello') === 'hello', true);
    test.equal(Option(undefined).getOrElse('hello') === 'hello', true);
    test.equal(Option(1).getOrElse(2) === 1, true);
    test.equal(Option(NaN).getOrElse(1) === 1, true);
    test.equal(Option(false).getOrElse(true) === false, true);
    var arr = [];
    var elseArr = ['hello'];
    test.equal(Option(arr).getOrElse(elseArr) === arr, true);
    var obj = {};
    var elseObj = {};
    test.equal(Option(obj).getOrElse(elseObj) === obj, true);
    test.done();
};

exports.optionOrElse = function(test) {
	var elseOption = Option('hello');
	test.equal(Option(null).orElse(elseOption) === elseOption, true);
	var option = Option(123);
	test.equal(option.orElse(elseOption) === option, true);
	test.done();
};

exports.optionOrNull = function(test) {
	test.equal(Option(null).orNull() === null, true);
	test.equal(Option('hello').orNull() === 'hello', true);
	test.done();
};

exports.optionMap = function(test) {
	test.equal(Option(null).map(function(val) {
		return val.toUpperCase();
	}) instanceof None, true);
	test.equal(Option('hello').map(function(val) {
		return val.toUpperCase();
	}) instanceof Some, true);
	test.equal(Option('hello').map(function(val) {
		return val.toUpperCase();
	}).get() === 'HELLO', true);
	test.done();
};

exports.optionFlatMap = function(test) {
	test.equal(Option('hello').flatMap(function(val) {
		return Option(val);
	}) instanceof Option, true);
	test.equal(Option('hello').flatMap(function(val) {
		return Option(val.toUpperCase());
	}).get() === 'HELLO', true);
	test.equal(Option('hello').flatMap(function(val) {
		return Option(val.toUpperCase()).flatMap(function(innerval) {
			return Option(innerval + ' WORLD!');
		});
	}).get() === 'HELLO WORLD!', true);
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
    test.equal(opt.get() === 'hello', true);
    var absent = Option(null);
    test.equal(absent.filter(function(val) {
    	return val === 'hello';
    }) instanceof None, true);
    test.equals(absent.getOrElse('world') === 'world', true);
    test.done();
};

exports.optionFilterNot = function(test) {
	var opt = Option('hello');
    test.equal(opt.filterNot(function(val) {
    	return val === 'hello';
    }) instanceof None, true);
    test.equal(opt.filterNot(function(val) {
    	return val === 'hello';
    }).get() === undefined, true);
    var absent = Option(null);
    test.equal(absent.filter(function(val) {
    	return val === 'hello';
    }) instanceof None, true);
    test.equals(absent.getOrElse('world') === 'world', true);
    test.done();
};

exports.optionForeach = function(test) {
	var withPrefix = ' world';
	Option('hello').foreach(function(val) {
		withPrefix = val + withPrefix;
	});
	test.equals(withPrefix === 'hello world', true);
	Option(null).foreach(function(val) {
		withPrefix = val + withPrefix;
	});
	test.equals(withPrefix === 'hello world', true);
    test.done();
};
