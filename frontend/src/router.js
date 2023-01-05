import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import ErrorNotFound from "./views/ErrorNotFound.vue";
import Guide from "./views/Guide.vue";

import Agenda from "./views/Agenda.vue";
import AgendaNew from "./views/AgendaNew.vue";
import AgendaEdit from "./views/AgendaEdit.vue";

import Invitation from "./views/Invitation.vue";
import InvitationDetail from "./views/InvitationDetail.vue";

import Contact from "./views/Contact.vue";
import ContactAdd from "./views/ContactAdd.vue";
import ContactEdit from "./views/ContactEdit.vue";

import Attendance from "./views/Attendance.vue";
import AttendanceDetail from "./views/AttendanceDetail.vue";

import User from "./views/User.vue";

const useBuildPath = false;
const routes = {
    home: { path: "/", component: Home },
    login: { path: "/login", component: Home },
    
    agenda: { path: "/agenda", component: Agenda, meta: { needLogin: true } },
    agendaNew: { path: "/agenda/new", component: AgendaNew, meta: { needLogin: true } },
    agendaEdit: { path: "/agenda/edit/:id", component: AgendaEdit, meta: { needLogin: true } },

    invitation: { path: "/inv", component: Invitation, meta: { needLogin: true } },
    invitationDetail: { path: "/inv/detail/:agendaId", component: InvitationDetail, meta: { needLogin: true } },

    contact: { path: "/contact", component: Contact, meta: { needLogin: true } },
    contactNew: { path: "/contact/new", component: ContactAdd, meta: { needLogin: true } },
    contactEdit: { path: "/contact/edit/:id", component: ContactEdit, meta: { needLogin: true } },

    attendance: { path: "/att", component: Attendance, meta: { needLogin: true } },
    attendanceDetail: { path: "/att/:id", component: AttendanceDetail, meta: { needLogin: true } },
    attendanceRegist: { path: "/att/room/:ukey", component: Home },

    user: { path: "/user", component: User },

    guide: { path: "/guide/:section?", component: Guide },
    e404: { path: "/:pathMatch(.*)*", component: ErrorNotFound }
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
            const post = savedPosition || { left: 0, top: 0 };
            return post;
        }
    });
};

export default defineMyRouter(routes);