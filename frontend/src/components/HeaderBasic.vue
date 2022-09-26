<script setup>
import toIdDateFormat from "@/modules/toIdDateFormat";

const headingTitle = "Agenda Terbaru";
const dateId = toIdDateFormat(new Date());
// console.log(dateId);
const subHeadingDay = dateId.toStr ? dateId.toStr() : "";

</script>
<template>
	<header>
		<h1 class="text-black/90 text-[2rem] font-normal leading-tight">{{ headingTitle }}</h1>
		<p class="text-black/50 text-sm font-semibold">{{ subHeadingDay }}</p>
	</header>
</template>