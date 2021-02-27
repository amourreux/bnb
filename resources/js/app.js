require('./bootstrap');

import router from "./routes"
import VueRouter from "vue-router";
import index from "./index.vue";
import moment from "moment";

window.Vue = require('vue');
Vue.use(VueRouter);


Vue.filter("fromNow", value => moment(value).fromNow());

const app = new Vue({
    el: '#app',
    router,
    components: {
        "index": index
    }
});
