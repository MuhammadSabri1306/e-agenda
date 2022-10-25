import { createApp } from "vue";
import router from "./router";
import { createPinia } from "pinia";

import { SetupCalendar } from "v-calendar";
import FontAwesomeIcon from "./FontAwesomeIcon";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import "v-calendar/dist/style.css";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(PrimeVue);
app.use(SetupCalendar, {});

app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
