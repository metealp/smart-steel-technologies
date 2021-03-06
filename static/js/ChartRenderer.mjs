import Highcharts from 'https://code.highcharts.com/es-modules/masters/highcharts.src.js';
import SensorDF from './Sensor.mjs'
import { ChartOption } from './ChartOption.mjs'

document.addEventListener("DOMContentLoaded", async function() {
    let masterSerie = [];
    const response = await fetch('/data');
    const result = await response.json();
    const fetched = result.sensor_data;
    const sampleIndexes = fetched["sample index"];
    const findTurnPoint = (element, index, array) => {
        return array[index] !== array[index +1];
    }

    const pivotIndex = fetched.class_label.findIndex(findTurnPoint);
    for(let i=0; i<10; i++){
        const sensor = `sensor${i}`;
        masterSerie.push({name: sensor, data: fetched[`${sensor}`]});
        const sensorData = new SensorDF(fetched[`${sensor}`], sensor, pivotIndex)
        
        //RAW READINGS CHART
        const readingsChartOptions = ChartOption.OneSensorReading(sampleIndexes, sensorData.rawData)
        Highcharts.chart(`${sensor}-readings-chart`, readingsChartOptions, function(chart) {
            const len = sensorData.rawData.length
            chart.xAxis[0].setExtremes(len-11,len-1);
            chart.showResetZoom();
        })

        //SENSOR STATISTICS
        let element = document.getElementById(`${sensor}-statistics`)
        element.innerHTML = `
        <h5>Statistics</h5>
        <table><thead><tr><th>Argument</th><th>Total</th><th>Positive</th><th>Negative</th></tr></thead>
        <tbody>
            <tr><td>Mean</td><td>${sensorData.totalMean.toFixed(3)}</td><td>${sensorData.positiveMean.toFixed(3)}</td><td>${sensorData.negativeMean.toFixed(3)}</td></tr>
            <tr><td>Variance</td><td>${sensorData.totalVariance.toFixed(3)}</td><td>${sensorData.positiveVariance.toFixed(3)}</td><td>${sensorData.negativeVariance.toFixed(3)}</td></tr>
            <tr><td>Std</td><td>${sensorData.totalStd.toFixed(3)}</td><td>${sensorData.positiveStd.toFixed(3)}</td><td>${sensorData.negativeStd.toFixed(3)}</td></tr>
            <tr><td>Median</td><td>${sensorData.totalMedian.toFixed(3)}</td><td>${sensorData.positiveMedian.toFixed(3)}</td><td>${sensorData.negativeMedian.toFixed(3)}</td></tr>
            <tr><td>Min</td><td>${sensorData.totalMin.toFixed(3)}</td><td>${sensorData.positiveMin.toFixed(3)}</td><td>${sensorData.negativeMin.toFixed(3)}</td></tr>
            <tr><td>Max</td><td>${sensorData.totalMax.toFixed(3)}</td><td>${sensorData.positiveMax.toFixed(3)}</td><td>${sensorData.negativeMax.toFixed(3)}</td></tr>
        </tbody>
        </table>
        `
        
        //POLAR DISTRIBUTION CHART
        const polarizedData = sensorData.negativeDistribution.map(elm => elm * -1)
        const distributedPolarSeries = [
        {
            name: 'positive',
            data: sensorData.positiveDistribution
        },
        {
            name: 'negative',
            data: polarizedData
        }];
        Highcharts.chart(`${sensor}-distributed-polar-chart`, ChartOption.DistributedPolar(distributedPolarSeries))

        //DISTRIBUTION PERCENTAGE CHART
        const distributedPercSeries = [
            {
                name: 'positive',
                data: sensorData.positiveDistribution
            },
            {
                name: 'negative',
                data: sensorData.negativeDistribution
            }
        ];
        Highcharts.chart(`${sensor}-distributed-percent-chart`, ChartOption.DistributionPercentage(distributedPercSeries))

        //TOTAL DISTRIBUTION CHART
        Highcharts.chart(`${sensor}-total-distribution-chart`, ChartOption.DistributedTotal([{name: "total", data: sensorData.totalDistribution}]))
    }

    const masterReadingsChartOptions = ChartOption.AllSensorsReading(sampleIndexes, masterSerie);
    Highcharts.chart(`master`, masterReadingsChartOptions, function(chart) {
        const len = fetched.class_label.length;
        chart.xAxis[0].setExtremes(len-11,len-1);
        chart.showResetZoom();
        let loader = document.getElementById("page-loader");
        loader.classList.remove("active");
        let content = document.getElementById("content");
        content.classList.remove("hidden");
        let header = document.getElementById("main-header");
        header.classList.add("aligned-header");
        Scroll.setScrollListener()
    });
});
