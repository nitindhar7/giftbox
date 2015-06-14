var util = require('./util'), Option, Some, None;

Option = function(val) {
	if(util.isFunction(val)) {
		val = val();
	}

	if (this instanceof Option) {
		this.val = val;
  	} else {
		return new Option(val);
  	}
};

Option.prototype.isDefined = function() {
	return !util.isEmpty(this.val);
};

Option.prototype.get = function() {
	return this.val;
};

Option.prototype.getOrElse = function(elseVal) {
	return this.isDefined() ? this.val : 
		(util.isFunction(elseVal) ? elseVal() : elseVal);
};

Option.prototype.orElse = function(alternative) {
	if(!(alternative instanceof Option || alternative instanceof Some)) {
		alternative = None();
	}
	return this.isDefined() ? this : alternative;
};

Option.prototype.orNull = function() {
	return this.isDefined() ? this.val : null;
};

Option.prototype.map = function(callback) {
	if(this.isDefined() && util.isFunction(callback)) {
		this.val = callback(this.val);
	}
	return this.isDefined() ? Some(this.val) : None();
};

Option.prototype.flatMap = function(callback) {
	if(this.isDefined() && util.isFunction(callback)) {
		var mapped = callback(this.val);
	}
	if(mapped instanceof Option || mapped instanceof Some) {
		return Some(mapped.get());
	} else {
		return None();
	}
};

Option.prototype.filter = function(predicate) {
	if(!util.isFunction(predicate)) {
		return Some(this.val);
	} else if(predicate(this.val) === true) {
		return Some(this.val);
	} else {
		return None();
	}
};

Option.prototype.filterNot = function(predicate) {
	if(!util.isFunction(predicate)) {
		return Some(this.val);
	} else if(predicate(this.val) === false) {
		return Some(this.val);
	} else {
		return None();
	}
};

Option.prototype.foreach = function(callback) {
	if(util.isFunction(callback) && this.isDefined()) {
		callback(this.val);
	}
};

Some = function(val) {
  	if (this instanceof Some) {
		Option.call(this, val);
	} else {
		return new Some(val);
	}
};

Some.prototype = Object.create(Option.prototype);

None = function() {
	if (this instanceof None) {
		Option.call(this);
	} else {
		return new None();
	}
};

None.prototype = Object.create(Option.prototype);

module.exports = {
	Option: Option,
	Some: Some,
	None: None
};
