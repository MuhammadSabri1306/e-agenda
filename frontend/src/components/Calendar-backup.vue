<script setup>
import { ref, computed } from "vue";
import getDaysInMonth from "@/modules/getDaysInMonth";
import toIdDateFormat from "@/modules/toIdDateFormat";

const test = {
	value: Date.now(),
	hlColor: "red"
};

const props = defineProps({
	initMonth: { type: Number, default: new Date().getMonth() },
	initYear: { type: Number, default: new Date().getYear() }
});

const hlColor = {
	red: "bg-red-500",
	blue: "bg-sky-500"
};

const month = ref(props.initMonth);
const year = ref(props.initYear);

const days = computed(() => {
	const result = [];
	const dates = getDaysInMonth(month.value, year.value);
	return result;	
});
</script>
<template>
	<div></div>
</template>