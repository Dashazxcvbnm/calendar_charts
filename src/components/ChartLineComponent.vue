<template>
    <div>
        <VueApexCharts
            :height="height"
            :width="width"
            :series="chartOptions.series"
            :options="chartOptions"
            @dataPointSelection="changeSelectedCharts"
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

    title: {
        type: String
    },

    titleAling: {
        type: String,
        default: 'center'
    },

    height: {
        type: [Number, String],
        default: '350'
    },

    width: {
        type: [Number, String],
        default: '100%'
    },

    paddingChartTop: {
        type: Number,
        default: 0
    }
});

let chartOptions = reactive({
    series: props.series,

    noData: {
        text: 'Загрузка...'
    },

    xaxis: {
        categories: props.xaxisCategories,
        type: 'category',
        tickPlacement: 'between'
    },

    title: {
        text: props.title,
        align: props.titleAling,

        style: {
            fontSize:  '16px',
            fontWeight:  'medium'
        }
    },

    yaxis: {
        min: 0,
        max: 31
    },

    tooltip: {
        enabled: true,
        intersect: true,
        shared: false
    },

    chart: {
        toolbar: {
            show: false
        }
    },

    stroke: {
        curve: 'smooth',
        width: 1
    },

    legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'left',
        width: 200,
        offsetX: 3
    },

    grid: {
        show: true,
        borderColor: '#000',

        xaxis: {
            lines: {
                show: true,
            }
        },
        yaxis: {
            lines: {
                show: true
            }
        }, 
        row: {
            colors: ['#1e2226', ''],
            opacity: 0.97
        },
        padding: {
            top: props.paddingChartTop
        }, 
    },

    markers: {
        size: 1,
        strokeOpacity: 0.1,
        strokeWidth: 4,
        strokeColor: '#fff',

        hover: {
            sizeOffset: 6,
        }
    }
});

async function changeSelectedCharts(event, chart, opt) {

    const currentSeriesIndex = opt.seriesIndex
    const currentPointIndex = opt.dataPointIndex

    const copyOfChartOptionsSeries = JSON.parse(JSON.stringify(chartOptions.series))

    copyOfChartOptionsSeries[currentSeriesIndex] = {...copyOfChartOptionsSeries[currentSeriesIndex], type: 'area' }

    await chart.updateOptions({
        series: copyOfChartOptionsSeries,

        annotations: {
            xaxis: [{
                x: props.xaxisCategories[currentPointIndex],
                fillColor: '#fff',
                strokeDashArray: 0
            }],

            points: [
                    {
                        x: props.xaxisCategories[currentPointIndex],
                        y: copyOfChartOptionsSeries[currentSeriesIndex].data[currentPointIndex],
                            marker: {
                                size: 5,
                                strokeWidth: 10,
                                strokeColor: '#ffffff53',
                            },
                            label: {
                                text: `${copyOfChartOptionsSeries[currentSeriesIndex].name}: ${copyOfChartOptionsSeries[currentSeriesIndex].data[currentPointIndex]}` 
                            }
                    }
                ]
        },

        fill: {
            type: "gradient",
            gradient: {
                opacity: 0.5,
                opacityFrom: 0.7,
                opacityTo: 0.3,
                stops: [0, 100]
            }
        },

        stroke: {
            width: 4
        },
    }, false, true)
}

</script>
