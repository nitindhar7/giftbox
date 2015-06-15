giftbox [![Build Status](https://travis-ci.org/nitindhar7/giftbox.png)](https://travis-ci.org/nitindhar7/giftbox)
=======

A lightweight Javascript library for the Option monad. Maybe there's something in it, maybe there isn't ;)

```bash
$ npm install giftbox
```

```js
var Option = require('giftbox').Option;

Option('hello world');					// Some
Option(undefined);						// None
Option('hello world').get();			// 'hello world'
Option(null).getOrElse('pied piper');	// 'pier piper'
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

// A more functional form:
Option(userDetails).map(render);

// Wrap a method return value in Option:
var userFetcher = function(email) {
	return Option(userClient.findByEmail(email));
};

userFetcher('bob@example.com').map(render).getOrElse(renderNotFound);
```

### Advanced Examples

Building a user subscription UI
```js
// lets fetch a user
userFetcher('bob@example.com');

// then lets fetch their subscription record
userFetcher('bob@example.com').map(function(user) {
	return subscriptionFetcher(user.id); // returns Option(subscription)
});

// but what if they have no subscription?
userFetcher('bob@example.com').map(function(user) {
	// returns either subscription or message
	subscriptionFetcher(user.id).getOrElse('No Subscriptions Found');
});

// ok lets render what we got
userFetcher('bob@example.com').map(function(user) {
	renderUI(subscriptionFetcher(user.id).getOrElse('No Subscriptions Found'));
});

// but what if there was no user?
userFetcher('bob@example.com').map(function(user) {
	renderUI(subscriptionFetcher(user.id).getOrElse('No Subscriptions Found'));
}).getOrElse(
	redirectToLoginPage();
);
```

Finding Player Score
```js
var lookupPlayer = function(id) {
	return userFetcher(id); // returns Option(user)
};

var lookupScore = function(player) {
	return scoreFetcher(player); // returns Option(number)
};

var scoreFilter = function(score) {
	return score > 105
};

showScore(lookupPlayer(1).map(lookupScore));
=> Some(Some(103))

// we don't want to render 'Some(103)'
showScore(lookupPlayer(1).flatMap(lookupScore));
=> Some(103)

// great, but we only want to show the score if it is above 105
showScore(lookupPlayer(1).flatMap(lookupScore).filter(scoreFilter));
=> None

// but lets show a default value if player not found or 
// score not found or score not above 105
showScore(
	lookupPlayer(1)
		.flatMap(lookupScore)
		.filter(scoreFilter)
		.getOrElse('Lets start a new game here!')
);
=> 'Lets start a new game here!'
```

## API

Giftbox considers the following "absent" or "empty": `null`, `undefined` and `NaN`.

##### isDefined

Returns `true` if the `val` is not empty.

```js
Option(val).isDefined();
```

##### get

Returns `val` (whether or not it's empty).

```js
Option(val).get();
```

##### getOrElse

Returns `val` if it `isDefined` otherwise returns `elseval`.

```js
Option(val).getOrElse(elseVal);
```

##### orElse

Returns `val` if it `isDefined` otherwise uses `alternative` as an `Option` provider.

```js
Option(val).orElse(alternative);
```

##### orNull

Returns `val` if it `isDefined` otherwise returns `null`.

```js
Option(val).orNull(alternative);
```

##### map

Maps `val` if it `isDefined` using the `callback` function and returns `Some(callback(val))` else returns `None`;

```js
Option(val).map(callback);
```

##### flatMap

Flattens nested mapping calls over `val` if it `isDefined` using the `callback` function and returns `Some` else returns `None`;

```js
Option(val).flatMap(function(v1) {
	return Option(modify1(v)).flatMap(function(v2) {
		return Option(modify2(v2));
	}
});
```

##### filter

Applies `predicate` to `val` if it `isDefined` and returns `Some(val)` if it passes and `None` if it fails.

```js
Option(val).filter(predicate);
```

##### filterNot

Opposite of `filter`.

```js
Option(val).filterNot(predicate);
```

##### foreach

Applies the `callback` function to `val` if it `isDefined` and doesn't return anything.

```js
Option(val).foreach(callback);
```

## Contribution

Please contribute to Giftbox via [GitHub issues][github-issues]. Would be great if all new code is submitted with tests and documentation. Lets discuss features and bugs there as well!

[scala-option]: http://www.scala-lang.org/api/current/index.html#scala.Option
[github-issues]: https://github.com/nitindhar7/giftbox/issues
