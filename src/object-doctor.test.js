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


describe('objectDoctor.set should set nested values', () => {

    test('With an empty object', () => {
        expect(dr.set({}, 'a.b', 'foo')).toEqual({a:{b: 'foo'}});
    });

    test('Should add properties to existing non-primitive types (object)', () => {
        expect(dr.set({a:{b:'foo'}}, 'a.c', 'bar')).toEqual({a:{b:'foo',c:'bar'}});
    });

    test('Should add properties to existing non-primitive types (array)', () => {
        const expected = {a: [1,2,3]};
        expected.a.c = 'bar';

        expect(dr.set({a:[1, 2, 3]}, 'a.c', 'bar')).toEqual(expected);
    });

    test('Should not overwrite primitives without force opt set', () => {
        expect(dr.set({a:{b:'foo'}}, 'a.b', 'bar')).toEqual({a:{b:'foo'}});
    });

    test('Should overwrite primitives with force opt set', () => {
        expect(dr.set({a:{b:'foo'}}, 'a.b', 'bar', {force: true})).toEqual({a:{b:'bar'}});
    });
});

describe('objectDoctor.set should throw on invalid path arg', () => {

    test('With an object', () =>{
        expect(() => dr.set({a:'foo'}, {}, 'bar')).toThrow();
    });

    test('With undefined', () => {
        expect(() => dr.set({a:'foo'}, undefined, 'bar')).toThrow();
    });

    test('With a number', () => {
        expect(() => dr.set({a:'foo'}, 0, 'bar')).toThrow();
    });
});

describe('Context class should parse JSON', () => {

    test('With valid JSON', () => {
        expect(new dr.Ctx('{"a": "b"}').get('a')).toBe('b');
    });

    test('Should throw on invalid JSON', () => {
        expect(() => new dr.Ctx('foo')).toThrow();
    })
});

describe('Context class should get nested values', () => {

    test('With default delimiter', () => {
        const ctx = new dr.Ctx({a:{b:{c:'foo'}}});

        expect(ctx.get('a.b.c')).toBe('foo');
    });

    test('With delimiter set on instantiation', () => {
        const ctx = new dr.Ctx({a:{b:{c:'foo'}}}, {delimiter: '_'});

        expect(ctx.get('a_b_c')).toBe('foo');
    });

    test('When overwriting initial delimiter', () => {
        const ctx = new dr.Ctx({a:{b:{c:'foo'}}}, {delimiter:'_'});

        expect(ctx.get('a.b.c', {delimiter:'.'})).toBe('foo');
    });

    test('Should throw on invalid path', () => {
        const ctx = new dr.Ctx({a:{b:{c:'foo'}}});

        expect(() => ctx.get({a:'b'})).toThrow();
    });
});

describe('Context class should set nested values', () => {

    test('With an empty object in constructor', () => {
        const ctx = new dr.Ctx({});

        expect(ctx.set('a.b', 'foo').get()).toEqual({a:{b:'foo'}});
    });

    test('With no constructor arguments', () => {
        const ctx = new dr.Ctx();

        expect(ctx.set('a.b', 'foo').get()).toEqual({a:{b:'foo'}});
    });

    test('It should add props to existing non-primitives', () => {
        const ctx = new dr.Ctx({a:{b:'foo'}});

        expect(ctx.set('a.c', 'bar').get()).toEqual({a:{b:'foo',c:'bar'}});
    });

    test('It should not overwrite primitives', () => {
        const ctx = new dr.Ctx({a:'foo'});

        expect(ctx.set('a', 'bar').get()).toEqual({a: 'foo'});
    });

    test('It should overwrite primitives with opt.force=true', () => {
        const ctx = new dr.Ctx({a:'foo'}, {force: true});

        expect(ctx.set('a', 'bar').get()).toEqual({a: 'bar'});
    });

    test('It should allow overriding of constructor opts', () => {
        const ctx = new dr.Ctx({a:'foo'}, {force: true});

        expect(ctx.set('a', 'bar', {force: false}).get()).toEqual({a:'foo'});
    });

    test('It should merge opts arg with instance opts', () => {
        const ctx = new dr.Ctx({a: {b: 'foo'}}, {delimiter: '_'});

        expect(ctx.set('a_b_c', 'bar', {force: true}).get()).toEqual({a:{b:{c:'bar'}}});
    });
});
