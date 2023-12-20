<template>
    <div>
        <VueApexCharts
            :height="height"
            :width="width"
            :series="chartOptions.series"
            :options="chartOptions"
        />
    </div>
</template>

<script setup>
import { reactive } from "vue";

import VueApexCharts from "vue3-apexcharts";

const props = defineProps({
    series: {
        type: Array,
        default: [],
        required: true
    },

    xaxisCategories: {
        type: Array,
        default: [],
        required: true
    },

    total: {
        type: Number,
        default: 0
    },
    
    name: {
        type: String,
        default: ''
    },

    height: {
        type: [Number, String]
    },

    width: {
        type: [Number, String]
    }
});

let chartOptions = reactive({
    series: props.series,

    chart: {
        type: 'radialBar',
    },

    plotOptions: {
        radialBar: {
            dataLabels: {
                enabledOnSeries: 'radialBar',

                style: {
                    fontSize: '8px',
                    fontWeight: 'medium',
                },

                value: {
                    show: true,

                    formatter: function (val) {
                        const countDays = Math.round(val/100 * props.total);

                        return countDays;
                    }
                },
                
                total: {
                    show: true,
                    label: props.name[0].toUpperCase() + props.name.slice(1),
                    fontSize: '12px',

                    formatter: function () {
                        return props.total;
                    }
                }
            }
        }
    },

    labels: props.xaxisCategories,

    noData: {
        text: 'Загрузка...'
    }
});

</script>
