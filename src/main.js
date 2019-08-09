import './assets/css/common.scss';

import Vue from 'vue';
import App from './App.vue';

const fun = () => {
    console.log('aaaa');
};
fun();

new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
});
