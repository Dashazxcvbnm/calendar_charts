<template>
    <div>
        <ChartLineComponent
            height="450"
            :series="seriesDataForLine"
            :xaxisCategories="monthArray"
            title="График производсвенного календаря 2024"
        />

        <div class="chart-radial-bar__wrapper">
            <ChartsRadialBarComponent
                width="250"
                v-for="(item, index) in formatedSeriesDataForRadialBar" :key="index"
                :series="item.series"
                :name="item.name"
                :total="item.total"
                :xaxisCategories="['Рабочие дни', 'Праздничные дни', 'Предпразднечные дни']"
            />
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, reactive } from "vue";

import formatDate from '@/helpers/formatDate';
import ChartLineComponent from '@/components/ChartLineComponent.vue';
import ChartsRadialBarComponent from "@/components/ChartsRadialBarComponent.vue";

onBeforeMount(()=> {
    formatedDate = formatDate();
    fillChartOptionsForLine(formatedDate);
    fillChartOptionsForRadialBar(formatedDate);
    formatedSeriesDataForRadialBar = seriesDataForRadialBar;
});

let formatedDate = reactive({});

const monthArray = [];
const seriesDataForLine = [];
const seriesDataForRadialBar = reactive([]);
let formatedSeriesDataForRadialBar = reactive([]);

const fillChartOptionsForLine = function(formatedDate) {
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

    seriesDataForLine.push(workDay, holidayDay, preHolidayDay);
};

const fillChartOptionsForRadialBar = function() {
    const test = {};

    Object.keys(formatedDate).forEach((key)=> {
        if (!test[key]) {
            test[key] = {};
        };

        test[key].total = formatedDate[key].totalDays;
        test[key].name = key;
        test[key].series = [(formatedDate[key].workDays.total / formatedDate[key].totalDays) * 100, (formatedDate[key].holidayDays.total / formatedDate[key].totalDays) * 100, (formatedDate[key].preHolidayDays.total / formatedDate[key].totalDays) * 100];

        seriesDataForRadialBar.push(test[key]);
    })

    return 
};

</script>

<style lang="scss" scoped>
.chart-radial-bar {
    &__wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
}
</style>
