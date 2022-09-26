<script setup>
import toIdDateFormat from "@/modules/toIdDateFormat";

const headingTitle = "Agenda Terbaru";
const dateId = toIdDateFormat(new Date());
// console.log(dateId);
const subHeadingDay = dateId.toStr ? dateId.toStr() : "";

</script>
<template>
	<header>
		<h2 class="text-black/90 text-2xl leading-tight">{{ headingTitle }}</h2>
		<p class="text-black/50 text-xs font-semibold">{{ subHeadingDay }}</p>
	</header>
</template>