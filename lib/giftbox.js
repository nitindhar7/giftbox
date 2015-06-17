(function(root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Giftbox = factory();
  }
}(this, function() {
  'use strict';

  var util, Option, Some, None, empty = [
    null,
    undefined,
    NaN
  ];

  util = {
    isNaNStrict: function(val) {
      return typeof val === 'number' && isNaN(val);
    },
    isEmpty: function(val) {
      return empty.indexOf(val) > -1 || this.isNaNStrict(val);
    },
    isFunction: function(callback) {
      return typeof callback === 'function';
    }
  };

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

  Option.prototype.match = function(someCallback, noneCallback) {
    if(this.isDefined() && util.isFunction(someCallback)) {
      return someCallback(this.val);
    } else {
      return noneCallback();
    }
  };

  Option.prototype.collect = function(predicate, callback) {
    if(util.isEmpty(this.val)) {
      return None();
    } else if (util.isFunction(predicate) && predicate(this.val) === false) {
      return None();
    } else if (!util.isFunction(callback)) {
      return None();
    } else {
      return Some(callback(this.val));
    }
  };

  Option.prototype.toArray = function() {
    return this.map(function(val) {
      return [val];
    }).getOrElse([]);
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

  return {
    Option: Option,
    Some: Some,
    None: None,
    util: util
  };
}));