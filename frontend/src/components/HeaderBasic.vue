<script setup>
import toIdDateFormat from "@/modules/toIdDateFormat";

const headingTitle = "Agenda Hari Ini";
const dateId = toIdDateFormat(new Date());
const subHeadingDay = dateId.toStr ? dateId.toStr() : "";

</script>
<template>
	<header>
		<h2 class="text-black/90 text-2xl leading-tight">{{ headingTitle }}</h2>
		<p class="text-black/50 text-xs font-semibold">{{ subHeadingDay }}</p>
	</header>
</template>