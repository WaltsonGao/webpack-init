class Watcher {
    constructor(vm, exp, cb) {
        this.vm = vm;
        this.exp = exp;
        this.cb = cb;
        this.value = this.get();
    }
    get() {
        Dep.target = this;
        let value = this.vm.data[this.exp];
        Dep.target = null;
        return value;
    }
    update() {
        this.run();
    }
    run() {
        let oldValue = this.value;
        let value = this.vm.data[this.exp];
        if(oldValue !== value) {
            this.value = value;
            this.cb.call(this.vm, value, oldValue);
        }
    }
}