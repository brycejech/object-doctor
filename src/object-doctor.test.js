'use strict';

import * as dr from './object-doctor';

describe('objectDoctor.get should get property values', () => {

    const o = {
        a: {
            b: {
                c: 'foo'
            }
        },
        d: 'bar'
    }

    test('With a "." delimiter', () => {
        expect(dr.get(o, 'a.b.c', { delimiter: '.' })).toBe('foo');
    });

    test('With the defualt delimiter', () => {
        expect(dr.get(o, 'a.b.c')).toBe('foo');
    });

    test('With custom delimiter', () => {
        expect(dr.get(o, 'a_b_c', { delimiter: '_' })).toBe('foo');
    });

    test('When value is an object', () => {
        expect(dr.get(o, 'a.b')).toEqual({ c: 'foo' });
    });

    test('Without a nested property', () => {
        expect(dr.get(o, 'd')).toBe('bar');
    });

    test('Should return undefined if path not resolved', () => {
        expect(dr.get(o, 'a.b.c.d')).toBeUndefined();
    });
});
