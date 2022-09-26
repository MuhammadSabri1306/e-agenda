import { createApp } from "vue";

import "v-calendar/dist/style.css";
import { SetupCalendar } from "v-calendar";

import FontAwesomeIcon from "./FontAwesomeIcon";

import "./style.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(router);
app.use(SetupCalendar, {});

app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
