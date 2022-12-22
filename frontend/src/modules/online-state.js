import { ref, onMounted, onUnmounted } from "vue";

export const useOnlineState = () => {
	const isOnline = ref(navigator.onLine);
	const updateOnlineStatus = event => isOnline.value = event.type === "online";

	onMounted(() => {
		window.addEventListener("online", updateOnlineStatus);
		window.addEventListener("offline", updateOnlineStatus);
	});

	onUnmounted(() => {
		window.removeEventListener("online", updateOnlineStatus);
		window.removeEventListener("offline", updateOnlineStatus);
	});

	return isOnline;
};