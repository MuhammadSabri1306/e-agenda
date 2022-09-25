import { createApp } from "vue";

import "v-calendar/dist/style.css";
import { SetupCalendar } from "v-calendar";

import FontAwesomeIcon from "./FontAwesomeIcon";

import "./style.css";
import App from "./App.vue";

const app = createApp(App);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(SetupCalendar, {});
app.mount("#app");
