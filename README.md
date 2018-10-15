# object-doctor

Safe, Nested Property Access and Object Manipulation in JS.

object-doctor allows you to safely access and create nested properties and values.

## Installation

```bash
npm install object-doctor
```

## Usage

```js
'use strict';

const dr = require('object-doctor');
```

### dr.get(obj, path [, options])

Gets the value of a property at `path`, returns the value if found, otherwise `undefined`. Use `options.default` to specify a default return value. `options.delimiter` to specify a custom delimiter.

```js
const obj = {
    a: {
        b: {
            c: 'foo'
        }
    }
}

// Access nested property
let value = dr.get(obj, 'a.b.c');
console.log(value); // foo

// Access undefined property
value = dr.get(obj, 'a.b.c.d');
console.log(value); // undefined

// Access property on undefined
value = dr.get(obj, 'a.b.c.d.e');
console.log(value); // undefined

// Return some default value
value = dr.get(obj, 'a.b.z', { default: '' });
console.log(value); // ''

// Using a custom delimiter
value = dr.get(obj, 'a_b_c', { delimiter: '_' });
console.log(value); // foo
```

### dr.set(obj, path, value [, options])

Traverse a `path` on an object and set a `value`.

```js
const obj = {};

dr.set(obj, 'a.b.c', 'foo');
console.log(obj); // { a: { b: { c: 'foo' } } }
```

By default, `dr.set()` will not override existing property values. However, it will set new properties on non-primitive types such as objects, arrays, functions, etc. To override this behavior, use `options.force = true`.

 ```js
dr.set(obj, 'a.b.c', 'bar');
console.log(obj); // { a: { b: { c: 'foo' } } }

dr.set(obj, 'a.b.c.', 'bar', { force: true });
console.log(obj); // { a: { b: { c: 'bar' } } }
```

### dr.Context(obj [, options]) Class

Create a new dr object with persistent settings and method chaining.

```js
const context = new dr.Context({}, { force: true });
```

Constructor optionally accepts a JSON string as it's first argument.

```js
const context = new dr.Context('{"a": {"b": "foo"}}');
```

### dr.Context.prototype.get(path [, options]);

```js
const obj = {
    a: {
        b: {
            c: 'foo'
        }
    }
}

const context = new dr.Context(obj);

const foo = context.get('a.b.c');
console.log(foo); // foo

const bar = context.get('a.b.d', { default: '' });
console.log(bar); // ''
```

### dr.Context.prototype.set(path, value[, options]);

`set()` method can be chained when using a context object.

```js
const context = new dr.Context({}, { force: true });

context.set('a.b.c', 'bar').set('a.b.d', 'baz');

// Use context.get() to get the manipulated object back out
let transformed = context.get();

console.log(transformed); // { a: { b: { c: 'bar', d: 'baz' } } }
```
