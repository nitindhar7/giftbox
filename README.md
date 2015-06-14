giftbox [![Build Status](https://travis-ci.org/nitindhar7/giftbox.png)](https://travis-ci.org/nitindhar7/giftbox)
=======

A lightweight Javascript library for the Option monad. Maybe there's something in it, maybe there isn't ;)

```bash
$ npm install giftbox
```

```js
var Option = require('giftbox').Option;

Option('hello world') // returns Some
Option(undefined) // returns None
```

Giftbox aims to provide a wrapper API around absent values and is highly motivated by [Scala's Option][scala-option].

One of big source of bugs in production environments is missing data represented by nulls, undefined, empty strings, etc. Traditionally calling methods on `null` or 'empty' values causes NPE's, etc. and forces developers to create disorganized utilities with null/empty checks all over the codebase, adding further complexity.

## Overview

Giftbox provides 3 simple classes to handle optional data - `Option`, `Some` & `None`. Here's how to use them:

### Simple Examples

Where Giftbox becomes powerful is when you have some logic that returns data and you need to handle that data:

```js
var userDetails = userFetcher('bob@example.com');

if(Option(userDetails).isDefined()) {
	render(userDetails);
}
```

A more functional way:

```js
Option(userDetails).map(function(details) {
	render(details);
})

// improved:
Option(userDetails).map(render);
```

Giftbox is not only useful for wrapping returned data, but also as a return value from methods:

```js
var userFetcher = function(email) {
	return Option(userClient.findByEmail(email));
};

// improved:
userFetcher('bob@example.com').map(render);
```

Note how `userFetcher` is `Option`, whose value is generated using `userClient.findByEmail()`. So it's totally legal to write functions wrapped with Option inline:

```js
Option(function() {
	return userClient.findByEmail('bob@example.com');
});
```
### Advanced Examples

## Contribution

Please contribute to Giftbox via [GitHub issues][github-issues]. Would be great if all new code is submitted with tests and documentation. Lets discuss features and bugs there as well!

[scala-option]: http://www.scala-lang.org/api/current/index.html#scala.Option
[github-issues]: https://github.com/nitindhar7/giftbox/issues
