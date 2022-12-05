<script setup>
import { computed } from "vue"; 
import { useAgendaStore } from "@/stores/agenda";
import { Calendar } from "v-calendar";

const emit = defineEmits(["select"]);
const storeAgenda = useAgendaStore();

const calendarAttrs = computed(() => {
    const agendaAttrs = storeAgenda.agenda.map(item => {
        const highlight = item.color;
        const dates = {
            start: new Date(item.startDate),
            end: new Date(item.endDate)
        };
        const customData = { agendaId: item.id };

        return { highlight, dates, customData };
    });

    const nowAttr = {
        key: "today",
        highlight: { color: "green", fillMode: "outline" },
        dates: new Date()
    };

    return [...agendaAttrs, nowAttr];
});

const onDayClick = val => {
    const customData = val.attributes[0].customData;
    if(!customData || customData === undefined)
        return;

    if(customData.agendaId)
        emit("select", customData.agendaId);
};
</script>
<template>
    <div class="bg-white px-4 lg:px-6 py-6 lg:py-4">
        <Calendar :attributes="calendarAttrs" @dayclick="onDayClick" class="rounded-none border-0" />
    </div>
</template>
<style>
    .vc-days {
        @apply w-[40px] h-[40px];
    }
</style>