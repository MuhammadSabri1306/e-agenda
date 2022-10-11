import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Home1 from "./views/Home1.vue";
import Agenda from "./views/Agenda.vue";

const useBuildPath = false;
const routes = {
    home: { path: "/", component: Home },
    login: { path: "/login", component: Home },
    "home1": { path: "/home1", component: Home1 },
    agenda: { path: "/agenda", component: Agenda }
};

const defineMyRouter = routesObj => {
    const routes = Object.entries(routesObj).map(([name, item]) => {
        return { name, ...item };
    });

    const basepath = useBuildPath ? "/ColorThemeGenerator/" : "/";
    const history = createWebHistory(basepath);

    return createRouter({
        history,
        routes,
        scrollBehavior(to, from, savedPosition){
            if(savedPosition)
                return savedPosition;
            else return { top: 0 };
        }
    });
};

export default defineMyRouter(routes);