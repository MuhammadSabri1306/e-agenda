import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Agenda from "./views/Agenda.vue";
// import Home1 from "./views/Home1.vue";
// import Home2 from "./views/Home2.vue";

const useBuildPath = false;
const routes = {
    home: { path: "/", component: Home },
    login: { path: "/login", component: Home },
    agenda: { path: "/agenda", component: Agenda, meta: { needLogin: true } }
    // home1: { path: "/home1", component: Home1 },
    // home2: { path: "/home2", component: Home2 },
};

const defineMyRouter = routesObj => {
    const routes = Object.entries(routesObj).map(([name, item]) => {
        return { name, ...item };
    });

    const basepath = useBuildPath ? "/" : "/";
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