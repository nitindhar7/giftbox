var empty = [
  null,
  undefined,
  NaN
];

module.exports = {
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
