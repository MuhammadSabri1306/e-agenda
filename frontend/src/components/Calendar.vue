<script setup>
import { computed } from "vue"; 
import { useAgendaStore } from "@/stores/agenda";
import { Calendar } from "v-calendar";

const storeAgenda = useAgendaStore();

const calendarAttrs = computed(() => {
    const agendaAttrs = storeAgenda.model.map(item => {
        const highlight = item.color;
        const dates = {
            start: new Date(item.startDate),
            end: new Date(item.endDate)
        };

        return { highlight, dates };
    });

    const nowAttr = {
        key: "today",
        highlight: { color: "green", fillMode: "outline" },
        dates: new Date()
    };

    return [...agendaAttrs, nowAttr];
});

const test = (val) => console.log(val);
</script>
<template>
    <div class="bg-white px-4 lg:px-6 py-6 lg:py-4">
        <Calendar :attributes="calendarAttrs" @dayclick="test" class="rounded-none border-0" />
    </div>
</template>
<style>
    .vc-days {
        @apply w-[40px] h-[40px];
    }
</style>