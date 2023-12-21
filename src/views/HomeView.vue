<template>
    <div>
        <div class="charts-line__wrapper">
            <n-select
                class="select"
                :value="currentMonth"
                :options="monthArray"
                :clearable="true"
                :on-update:value="filterByMounth"
            />
            
            <ChartLineComponent
                height="450"
                :series="seriesDataForLine"
                :xaxisCategories="monthArray"
                title="График производсвенного календаря 2024"
                :paddingChartTop="50"
            />
        </div>

        <div class="chart-radial-bar__wrapper">
            <ChartsRadialBarComponent
                width="250"
                v-for="item in formatedSeriesDataForRadialBar" :key="item.name"
                :series="item.series"
                :name="item.name"
                :total="item.total"
                :xaxisCategories="['Рабочие дни', 'Праздничные дни', 'Предпразднечные дни']"
            />
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from "vue";

import formatDate from '@/helpers/formatDate';
import ChartLineComponent from '@/components/ChartLineComponent.vue';
import ChartsRadialBarComponent from "@/components/ChartsRadialBarComponent.vue";
import { NSelect } from 'naive-ui';

onBeforeMount(()=> {
    formatedDate = formatDate();
    fillChartOptionsForLine(formatedDate);
    fillChartOptionsForRadialBar(formatedDate);
    formatedSeriesDataForRadialBar = seriesDataForRadialBar;
});

let formatedDate = {};

const monthArray = [];
const seriesDataForLine = [];
const seriesDataForRadialBar = [];
let formatedSeriesDataForRadialBar = reactive([]);

let currentMonth = ref('год');

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
        monthArray.push({
            value: date,
            label: date
        });

        workDay.data.push(formatedDate[date].workDays.total);
        holidayDay.data.push(formatedDate[date].holidayDays.total);
        preHolidayDay.data.push(formatedDate[date].preHolidayDays.total);
    });

    seriesDataForLine.push(workDay, holidayDay, preHolidayDay);
};

const fillChartOptionsForRadialBar = function() {
    const data = {};

    Object.keys(formatedDate).forEach((key)=> {
        if (!data[key]) {
            data[key] = {};
        };

        data[key].total = formatedDate[key].totalDays;
        data[key].name = key;
        data[key].series = [(formatedDate[key].workDays.total / formatedDate[key].totalDays) * 100, (formatedDate[key].holidayDays.total / formatedDate[key].totalDays) * 100, (formatedDate[key].preHolidayDays.total / formatedDate[key].totalDays) * 100];

        seriesDataForRadialBar.push(data[key]);
    })

    return 
};

const filterByMounth = function(month) {   
    if (!month) {
        formatedSeriesDataForRadialBar = seriesDataForRadialBar;
        currentMonth.value = 'год';
        return
    }

    currentMonth.value = monthArray.find((data)=> data.value === month).value;
    formatedSeriesDataForRadialBar = [(seriesDataForRadialBar.find((data) => data.name === month))];
};

</script>

<style lang="scss" scoped>
.charts-line {
    &__wrapper {
        position: relative;
    }
}

.select {
    position: absolute;
    top: 110px;

    width: 300px;
    padding: 0 40px;
    z-index: 10;
}

.chart-radial-bar {
    &__wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
}
</style>
