let Vue;

// 封装forEach
const forEach = (obj, fn) => {
    Object.keys(obj).forEach(objName => {
        fn(objName, obj[objName]);
    });
};

// 定义store
class Store {
    constructor(options) {
        this._s = new Vue({
            data: {
                state: options.state
            }
        });
        // 定义getters
        let getters = options.getters || {};
        this.getters = {};
        forEach(getters, (getterName, fn) => {
            Object.defineProperty(this.getters, getterName, {
                get: () => {
                    return fn(this.state);
                }
            });
        });
        // 定义mutations
        let mutations = options.mutations || {};
        this.mutations = {};
        forEach(mutations, (mutationName, fn) => {
            this.mutations[mutationName] = (payload) => {
                fn(this.state, payload);
            };
        });
        // 定义actions
        let actions = options.actions || {};
        this.actions = {};
        forEach(actions, (actionName, fn) => {
            this.actions[actionName] = (payload) => {
                fn(this, payload);
            };
        });
    }
    commit = (mutationName, payload) => {
        this.mutations[mutationName](payload);
    }
    dispatch = (actionName, payload) => {
        this.actions[actionName](payload);
    }
    get state() {
        return this._s.state;
    }
}

// 混入全局store
const install = (_Vue) =>{
    Vue = _Vue;
    Vue.mixin({
        beforeCreate() {
            if (this.$options && this.$options.store) {
                this.$store = this.$options.store;
            } else {
                this.$store = this.$parent && this.$parent.$store;
            }
        }
    });
}

export default {
    install,
    Store
}