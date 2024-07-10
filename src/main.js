import "./assets/main.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMapMarkerAlt,
  faExclamationTriangle,
  faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

library.add(faMapMarkerAlt, faExclamationTriangle, faArrowCircleLeft);
const app = createApp(App);
app.use(router);
app.use(Toast);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
