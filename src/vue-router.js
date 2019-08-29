let Vue;
class Router {
    constructor({ mode = 'hash', routes=[] }) {
        this.mode = mode;
        this.routeMap = routes.reduce((memo, current) => {
            memo[current.path] = current.component;
            return memo;
        }, {});
        Vue.util.defineReactive(this, 'route', this.route);
        this.route = { current: '/'};
        this.init();
    }
    init() {
        if (this.mode == 'hash') {
            // 先判断用户打开时有没有hash，没有就跳转到#/
            location.hash ? '' : location.hash = '/';
            window.addEventListener('load', () => {
                this.route.current = location.hash.slice(1);
            });
            window.addEventListener('hashchange', () => {
                this.route.current = location.hash.slice(1);
            })
        } else {
            location.pathname ? '' : location.pathname = '/';
            window.addEventListener('load', () => {
                this.route.current = location.pathname;
            });
            window.addEventListener('popstate', () => {
                this.route.current = location.pathname;
            })


        }
    }
}

Router.install = (_Vue) => {
    Vue = _Vue;
    // 扩展属性 或组件 或指令
    Vue.mixin({ // 内部会把 这个对象给每个组件的属性混在一起
        beforeCreate() {
            // 判断谁是根组件
            if(this.$options && this.$options.router) {
                // this._root = this;
                this._router = this.$options.router;
            } else {
                // 让所有的子组件 都有这个_router属性指向当前router
                this._router = this.$parent && this.$parent._router;
                // this._root = this.$parent._root;
            }
            // 每个组件都有 $route $router
            Object.defineProperty(this, '$route', {
                get() {
                    return this._router.route;
                }
            });
            Object.defineProperty(this, '$router', {
                get() {
                    return this._router;
                }
            });
        }
    });

    // router-link router-view
    Vue.component('router-link', {
        props: {
            to: {
                type: String
            },
            tag: {
                type: String
            },
        },
        methods:{
            handleClick(){ // 跳转方法

            }
        },
        render() {
            console.log('a', this);
            let mode = this._router.mode;
            let tag = this.tag || 'a';
            return <tag on-click={this.handleClick} href={mode === 'hash'?`#${this.to}`: this.to}>{this.$slots.default}</tag>
        }
    })

    // router-link router-view
    Vue.component('router-view', {
        render(h) {
            return h(this._router.routeMap[this._router.route.current]);
        }
    })
};


export  default Router;
