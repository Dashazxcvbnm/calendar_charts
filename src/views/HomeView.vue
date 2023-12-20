<template>
    <div>
        <ChartLineComponent
            height="450"
            :series="seriesData"
            :xaxisCategories="monthArray"
            title="График производсвенного календаря 2024"
        />
    </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";

import ChartLineComponent from '@/components/ChartLineComponent.vue';
import formatDate from '@/helpers/formatDate';

onMounted(()=> {
    formatedDate = formatDate();
    fillChartOptions(formatedDate);
});

let formatedDate = reactive({});

const monthArray = [];
const seriesData = [];

const fillChartOptions = function(formatedDate) {
    const workDay = {
        name: "рабочие дни",
        type: 'line',
        data: [],
    };

    const holidayDay =   {
        name: "выходные дни",
        type: 'line',
        data: [],
    };

    const preHolidayDay = {
        name: "предпраздничные дни",
        type: 'line',
        data: [],
    };

    Object.keys(formatedDate).forEach((date)=> {
        monthArray.push(date);

        workDay.data.push(formatedDate[date].workDays.total);
        holidayDay.data.push(formatedDate[date].holidayDays.total);
        preHolidayDay.data.push(formatedDate[date].preHolidayDays.total);
    });

    seriesData.push(workDay, holidayDay, preHolidayDay);
};
</script>
