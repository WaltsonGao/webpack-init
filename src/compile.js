function Compile(el, vm) {
    this.el = document.querySelector(el);
    this.vm = vm;
    this.fragment = null;
    this.init();
}
Compile.prototype = {
    init() {
        if(this.el) {
            this.fragment = this.nodeToFragment(this.el);
            this.compileElement(this.fragment);
            this.el.appendChild(this.fragment);

        } else {
            console.log("Dom 元素不存在！")
        }
    },
    nodeToFragment(el) {
        let fragment = document.createDocumentFragment();
        let child = el.firstChild;
        while (child) {
            fragment.appendChild(child);
            child = el.firstChild;
        }
        return fragment;
    },
    compileElement(el) {
        let childNodes = el.childNodes;
        let self = this;
        [].slice.call(childNodes).forEach((node) => {
            let reg = /\{\{(.*)\}\}/;
            let text = node.textContent;

            if(self.isElementNode(node)) {
                self.compile(node);
            } else if(self.isTextNode(node) && reg.test(text)) {
                self.compileText(node, reg.exec(text)[1]);
            }

            if(node.childNodes && node.childNodes.length) {
                self.compileElement(node);
            }
        })
    },
    compile(node) {
        let nodeAttrs = node.attributes;
        let self = this;
        Array.prototype.forEach.call(nodeAttrs,(attr) => {
            let attrName = attr.name;
            if(self.isDrective(attrName)) {
                let exp = attr.value;
                let dir = attrName.substring(2);
                if(self.isEventDirective(dir)) {
                    self.compileEvent(node, self.vm, exp, dir)

                } else {
                    self.compileModel(node, self.vm, exp)
                }

            }
        })
    },
    compileEvent(node, vm, exp, dir) {
        let eventType = dir.split(':')[1];
        let cb = vm.methods && vm.methods[exp];

        if(eventType && cb) {
            node.addEventListener(eventType, cb.bind(vm), false);
        }

    },
    compileModel(node, vm, exp, dir) {
        let self = this;
        let val = this.vm[exp];
        this.modelUpdater(node, val);
        new Watcher(this.vm, exp, (value, oldValue) => {
            self.modelUpdater(node, value, oldValue || val)
        });

        node.addEventListener('input', (e) => {
            let newVal = e.target.value;

            if(val === newVal) {
                return;
            }
            self.vm[exp] = newVal;
        })

    },
    compileText(node, exp) {
        let self = this;
        let initText = this.vm[exp];
        this.updateText(node, initText);
        new Watcher(this.vm, exp, (value) => {
            self.updateText(node, value);
        });
    },
    isDrective(attrName) {
        return attrName.includes('v-');
    },
    isEventDirective(dir) {
        return dir.indexOf('on') === 0;
    },
    isElementNode(node) {
        return node.nodeType === 1;
    },
    isTextNode(node) {
        return node.nodeType === 3;
    },
    modelUpdater(node, val, oldVal) {
        node.value = typeof val !== 'undefined' ? val: '';
    },
    updateText(node, value) {
        node.textContent = typeof value === 'undefined' ? '' : value;
    }
}