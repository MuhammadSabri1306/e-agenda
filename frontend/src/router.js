import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Agenda from "./views/Agenda.vue";
import Invitation from "./views/Invitation.vue";
import Contact from "./views/Contact.vue";
import Attendance from "./views/Attendance.vue";

const useBuildPath = false;
const routes = {
    home: { path: "/", component: Home },
    login: { path: "/login", component: Home },
    
    agenda: { path: "/agenda", component: Agenda, meta: { needLogin: true } },
    agendaNew: { path: "/agenda/new", component: Agenda, meta: { needLogin: true } },

    invitation: { path: "/inv", component: Invitation, meta: { needLogin: true } },

    contact: { path: "/contact", component: Contact, meta: { needLogin: true } },
    contactNew: { path: "/contact/new", component: Contact, meta: { needLogin: true } },
    contactEdit: { path: "/contact/:status/:id", component: Contact, meta: { needLogin: true } },

    attendance: { path: "/att", component: Attendance, meta: { needLogin: true } }
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