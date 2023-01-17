<script setup>
import { ref, computed } from "vue"; 
import { useAgendaStore } from "@/stores/agenda";
import { Calendar } from "v-calendar";

const emit = defineEmits(["select"]);
const agendaStore = useAgendaStore();
const agenda = computed(() => agendaStore.list);

const calendarAttrs = computed(() => {
    const agendaAttrs = agenda.value.map(item => {
        const highlight = item.color;
        const dates = {
            start: item.date.start.dateObj,
            end: item.date.end.dateObj
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

const isAgendaLoaded = ref(false);
agendaStore.fetchAgenda(false, success => {
    isAgendaLoaded.value = success;
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
    <div class="bg-white px-4 lg:px-6 py-6 lg:py-4 flex justify-center items-center">
        <Calendar v-if="isAgendaLoaded" :attributes="calendarAttrs" @dayclick="onDayClick" class="rounded-none border-0" />
        <div v-else class="min-w-[250px]">
            <div class="skeleton-loader skeleton-text mb-4"></div>
            <div class="skeleton-loader skeleton-img"></div>
        </div>
    </div>
</template>
<style>
    .vc-days {
        @apply w-[40px] h-[40px];
    }
</style>