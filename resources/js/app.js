require('./bootstrap');

import router from "./routes"
import VueRouter from "vue-router";
import index from "./index.vue";
import Vuex from 'vuex';
import moment from "moment";
import StarRating from "./shared/components/StarRating";
import FatalError from "./shared/components/FatalError";
import Success from "./shared/components/Success";
import ValidationErrors from "./shared/components/ValidationErrors";
import Vue from "vue";
import storeDefination from "./store";
import CheckButton from "./shared/components/CheckButton";

window.Vue = require('vue');
Vue.use(VueRouter);
Vue.use(Vuex);

Vue.filter("fromNow", value => moment(value).fromNow());
Vue.component("star-rating", StarRating);
Vue.component("fatal-error", FatalError);
Vue.component("success", Success);
Vue.component("v-errors", ValidationErrors);
Vue.component("check-button", CheckButton);

const store = new Vuex.Store(storeDefination);

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        "index": index
    },
    beforeCreate(){
        this.$store.dispatch("loadStoredState");
    },
});
