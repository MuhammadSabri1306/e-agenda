<script setup>
import { Calendar } from "v-calendar";

const date = new Date();
const month = date.getMonth(),
    year = date.getFullYear();

const calendarAttrs = [
    {
        key: "today",
        dot: "green",
        dates: new Date()
    }, {
        highlight: "red",
        dates: new Date(year, month, 23)
    },
    {
        highlight: "purple",
        dates: new Date(year, month, 26)
    }
];

const test = (day) => {
    console.log(day);
};
</script>
<template>
    <div class="bg-white rounded-lg border border-gray-400 px-4 lg:px-6 py-6 lg:py-4">
        <Calendar :attributes="calendarAttrs" @dayclick="test" class="rounded-none border-0" />
    </div>
</template>