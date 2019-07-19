function Observer(data) {
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    walk(data) {
        let self = this;
        Object.keys(data).forEach(function(key) {
            self.defineReactive(data, key, data[key]);
        });

    },
    defineReactive(data, key, val) {
        let childObj = observe(val); // 递归遍历所有属性
        let dep = new Dep();
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            set(newVal) {
                if(newVal === val) {
                    return;
                }
                val = newVal;
                dep.notify();
            },
            get() {
                if(Dep.target) {
                    dep.addSub(Dep.target);
                }
                return val;
            }
        })
    }
}

function observe(data) {
    if(!data || typeof data !== 'object') {
        return;
    }
    return new Observer(data);
}
