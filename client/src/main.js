import { createApp } from "vue";
import "./assets/tailwind.css";
import router from "./router";
import { markRaw } from "vue";
import { createPinia } from "pinia";
import Popper from "vue3-popper";
import moment from "moment";
import App from "@/App.vue";

import axios from "axios";

const pinia = createPinia();

const app = createApp(App);

/**
 * @params {date} date to be converted to timeago
 * @returns returns timeAgo
 */

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

app.config.globalProperties.$filters = {
  timeAgo(date) {
    return moment(date).fromNow();
  },
  dateToRandom(date) {
    // return moment(date).format("dddd, MMMM Do YYYY");
    return moment(date).format("YY-MM-DD");
  },
  dateMoment(date) {
    // return moment(date).format("dddd, MMMM Do YYYY");
    return moment(date).format("DD/MM/YYYY");
  },
  reverse(items) {
    return items.slice().reverse();
  },
};

pinia.use(({ store }) => {
  store.router = markRaw(router);
});
// app.use(pinia)

app.component("Popper", Popper).use(pinia).use(router).mount("#app");
