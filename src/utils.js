'use strict';

function _pathify(path, delimiter="."){
    if(_type(path) === 'array') return path;
    if(_type(path) !== 'string'){
        throw new Error('Invalid "path" argument, expected string or array');
    }

    return path.split(delimiter);
}

function _isPrimitive(thing){
    return (thing !== Object(thing));
}

function _type(thing){
    return Object.prototype.toString.call(thing).match(/\[object (.*)\]/)[1].toLowerCase();
}

function _merge(a,b){
    if(_type(a) !== 'object' || _type(b) !== 'object'){
        throw new Error('Arguments must be objects');
    }

    for(const key in a){
        b[key] = a[key];
    }
    return b;
}

export { _pathify, _isPrimitive, _type, _merge }
