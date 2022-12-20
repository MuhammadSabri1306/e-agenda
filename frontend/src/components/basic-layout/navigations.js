import { computed } from "vue";
import { useRoute } from "vue-router";
import IconAgenda from "./icons/IconAgenda.vue";
import IconInvitation from "./icons/IconInvitation.vue";
import IconContact from "./icons/IconContact.vue";
import IconAttendance from "./icons/IconAttendance.vue";

const nav = [
	{ to: "/agenda", title: "Agenda", icon: IconAgenda },
	{ to: "/inv", title: "Undangan", icon: IconInvitation },
	{ to: "/contact", title: "Kontak", icon: IconContact },
	{ to: "/att", title: "Absensi", icon: IconAttendance }
];

export const getNavItems = () => {
	const route = useRoute();
	const currRoute = computed(() => route.path);

	const navItems = computed(() => {
		return nav.map(item => {
			const activeClass = { 'active': (currRoute.value.search(item.to) === 0) };
			return { activeClass, ...item };
		});
	});

	return navItems;
};