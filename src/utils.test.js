'use strict';

import { _pathify, _isPrimitive, _type, _merge } from './utils';

const primitives = [
    1,
    'string',
    true,
    undefined,
    null
];

const nonPrimitives = [
    {},
    [],
    function foo(){ },
    new Date(),
    /myRgx/g
];

describe('_pathify should return an array', () => {

    test('When given a string and delimiter', () => {
        expect(_pathify('a.b.c', '.')).toEqual(['a', 'b', 'c']);
    });

    test('When given a string and no delimiter', () => {
        expect(_pathify('a.b.c')).toEqual(['a', 'b', 'c']);
    });

    test('When given a string and some other delimiter', () => {
        expect(_pathify('a_b_c', '_')).toEqual(['a', 'b', 'c']);
    });

    test('When given an array', () => {
        expect(_pathify(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
    });
});

describe('_pathify should throw on unexpected input', () => {
    test('When given an object', () => {
        expect(() => _pathify({})).toThrow();
    });

    test('When given a boolean', () => {
        expect(() => _pathify(true)).toThrow();
    });

    test('When given undefined', () => {
        expect(() => _pathify(undefined)).toThrow();
    });
});

describe('_isPrimitive should identify primitives', () => {
    primitives.forEach(primitive => {
        test(`Primitive "${ primitive }" should be "true"`, () => {
            expect(_isPrimitive(primitive)).toBe(true);
        });
    });
});

describe('_isPrimitive should identify non-primitives', () => {
    nonPrimitives.forEach(o => {
        test(`Non-primitive "${ o }" should be "false"`, () => {
            expect(_isPrimitive(o)).toBe(false);
        });
    });
});

describe('_type should identify all types', () => {
    test('When given an array', () => {
        expect(_type([])).toBe('array');
    });

    test('When given an object', () => {
        expect(_type({})).toBe('object');
    });

    test('When given a function', () => {
        expect(_type(() => {})).toBe('function');
    });

    test('When given a date object', () => {
        expect(_type(new Date())).toBe('date');
    });

    test('When given a regular expression object', () => {
        expect(_type(/abc/)).toBe('regexp');
    });

    test('When given a string', () => {
        expect(_type('string')).toBe('string');
    });

    test('When given a number', () => {
        expect(_type(42)).toBe('number');
    });

    test('When given a float', () => {
        expect(_type(3.141)).toBe('number');
    });

    test('When given NaN', () => {
        expect(_type(NaN)).toBe('number');
    });

    test('When given Infinity', () => {
        expect(_type(Infinity)).toBe('number');
    });

    test('When given a boolean', () => {
        expect(_type(true)).toBe('boolean');
    });

    test('When given undefined', () => {
        expect(_type(undefined)).toBe('undefined');
    });

    test('When given null', () => {
        expect(_type(null)).toBe('null');
    });

});

describe('_merge should merge two objects', () => {
    test('When given two objects', () => {
        const a = {a: 'foo', b: 'bar', c: 'baz'},
              b = {d: 'spam'};

        expect(_merge(a,b)).toEqual({a:'foo',b:'bar',c:'baz',d:'spam'});
    });

    test('Should throw if args are not objects', () => {
        expect(() => _merge([], 'foo')).toThrow();
    });

    test('Should throw if any arg is not an object', () => {
        expect(() => _merge([], {a:'foo'})).toThrow();
    });
});
