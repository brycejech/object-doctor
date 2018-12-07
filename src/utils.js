'use strict';

function _pathify(path, delimiter){
    if(_type(path) === 'array') return path;

    delimiter = delimiter || '.';

    return path.split(delimiter);
}

function _isPrimitive(thing){
    return (thing !== Object(thing));
}

function _type(thing){
    return Object.prototype.toString.call(thing).match(/\[object (.*)\]/)[1].toLowerCase();
}

export { _pathify, _isPrimitive, _type }
