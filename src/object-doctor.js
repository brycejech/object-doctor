'use strict';

import { _pathify, _isPrimitive, _type } from './utils'


function get(ctx, path, opt){

    opt  = opt || {};
    path = _pathify(path, opt.delimiter);

    if(path.length > 1){

        const next = path.shift();

        if(ctx.hasOwnProperty(next)){
            return get(ctx[next], path, opt);
        }

        return opt.default;
    }
    else{
        if(ctx.hasOwnProperty(path[0])) return ctx[path[0]];

        return opt.default;
    }
}

function set(ctx, path, val, opt){
    // TODO: Return full ctx object instead of last piece touched
    // This will be a breaking change
    ctx  = ctx || {};
    opt  = opt || {};
    path = _pathify(path, opt.delimiter);

    if(path.length > 1){

        const next = path.shift();

        if(ctx.hasOwnProperty(next)){

            if(_isPrimitive(ctx[next])){
                if(opt.force){
                    ctx[next] = {};
                    return set(ctx[next], path, val, opt);
                    // set(ctx[next], path, val, opt);
                }
                else{
                    return ctx;
                }
            }
            else{
                return set(ctx[next], path, val, opt);
                // set(ctx[next], path, val, opt);
            }

        }
        else{
            ctx[next] = {};
            return set(ctx[next], path, val, opt);
            // set(ctx[next], path, val, opt);
        }
    }
    else{
        if(ctx.hasOwnProperty(path[0])){
            if(opt.force){
                ctx[path[0]] = val;
                return ctx;
            }
            return ctx;
        }
        else{
            ctx[path[0]] = val;

            return ctx;
        }
    }

    // return ctx;
}


/*
    =============
    Context Class
    =============
*/

const Ctx = Context; // Alias

function Context(ctx, opt){

    if(_type(ctx) === 'string'){
        try{
            ctx = JSON.parse(ctx);
        }
        catch(e){
            throw new Error('Context string must be valid JSON')
        }
    }
    this.ctx = ctx || {};
    this.opt = opt;

    return this;
}

Context.prototype.get = function get(path, opt){
    if(!path) return this.ctx;

    return objectDoctor.get.apply(this, [this.ctx, path, opt]);
}

Context.prototype.set = function set(path, val, opt){
    opt = opt || this.opt || {};

    objectDoctor.set.apply(this, [this.ctx, path, val, opt]);

    return this;
}

// EXPORTS
export { get, set, Context, Ctx }
