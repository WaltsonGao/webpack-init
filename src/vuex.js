let Vue;
class Store {
    constructor(options) {
        this.vm  = new Vue({ // new Vue 会创建vue的实例 将状态变成响应式的 如果数据更新，则视图刷新
            data: {
                state: options.state
            }
        });
        this.state = this.vm.state;
        this.mutations = options.mutations;
        this.actions = options.actions;
    }
    commit = (eventName) => {
        this.mutations[eventName](this.state);
    }
    dispatch = (eventName) => {
        this.actions[eventName](this);
    }
}

const install = (_Vue) => {
    Vue = _Vue;
    // 扩展属性 或组件 或指令
    Vue.mixin({ // 内部会把 这个对象给每个组件的属性混在一起
        beforeCreate() {
            // 判断谁是根组件
            if(this.$options && this.$options.store) {
                this._store = this.$options.store;
            } else {
                // 让所有的子组件 都有这个_store属性指向当前_store
                this._store = this.$parent && this.$parent._store;
            }
        }
    });
};


export  default {
    Store,
    install
};
