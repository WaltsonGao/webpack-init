import Vue from 'vue';
import About from './components/About.vue';
import Home from './components/Home.vue';
import Router from './vue-router';

// use 方法 会调用install方法
Vue.use(Router);
export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },

    ]
})
