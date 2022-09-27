import { createRouter, createWebHistory } from "vue-router";
import Agenda from "./views/Agenda.vue";

const useBuildPath = true;
const routes = {
    home: {
        path: "/",
        component: Agenda
    }
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