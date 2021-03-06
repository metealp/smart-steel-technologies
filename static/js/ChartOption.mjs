export const ChartOption = {
    DistributedPolar: (series) => {
        return {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Polar Distribution Chart'
            },
            xAxis: [{
                categories: ["0.0-0.1", "0.1-0.2", "0.2-0.3", "0.3-0.4", "0.4-0.5", "0.5-0.6", "0.6-0.7", "0.7-0.8", "0.8-0.9", "0.9-1.0"],
                reversed: false,
                labels: {
                    step: 1
                },
                accessibility: {
                    description: 'Age (male)'
                }
            }, { // mirror axis on right side
                opposite: true,
                reversed: false,
                categories: ["0.0-0.1", "0.1-0.2", "0.2-0.3", "0.3-0.4", "0.4-0.5", "0.5-0.6", "0.6-0.7", "0.7-0.8", "0.8-0.9", "0.9-1.0"],
                linkedTo: 0,
                labels: {
                    step: 1
                },
            }],
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Math.abs(this.value);
                    }
                },
            },
        
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: series,
            legend: {
                enabled: true,
                labelFormatter: function () {
                    return this.name.charAt(0).toUpperCase() + this.name.slice(1);
                }
            },
    
        }
    },
    DistributedTotal: (series) => {
        return {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Heterogenous Distribution'
            },
            xAxis: {
                categories: ["0.0-0.1", "0.1-0.2", "0.2-0.3", "0.3-0.4", "0.4-0.5", "0.5-0.6", "0.6-0.7", "0.7-0.8", "0.8-0.9", "0.9-1.0"],
                crosshair: true
            },
            yAxis: {
                min: 0,
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: series,
            legend: {
                enabled: true,
                labelFormatter: function () {
                    return this.name.charAt(0).toUpperCase() + this.name.slice(1);
                }
            },
        }
    },
    OneSensorReading: (sampleCodes, readings) => {
        const readingLength = sampleCodes.length;
        const midPoint = readingLength / 2;
        return {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Sensor Readings'
            },
            subtitle: {
                text: 'Click and drag in the plot area to zoom in'
            },
            xAxis: {
                categories: sampleCodes,
                labels: {
                    formatter: function () {
                        let sampleName = this.value.split("e");
                        return sampleName[1];
                    }
                },
                plotLines: [{
                    color: '#FF0000',
                    width: 2,
                    value: midPoint,          
                    label: {
                        align:"left",
                        text:"Change Point",
                        verticalAlign:top,
                        x:5,
                        y:1,
                    }
                }],
                plotBands: [{
                    from: 0,
                    to: midPoint,
                    color: '#F0FFF0',
                    label: {
                        text: '<em>Class: 1</em>',
                        style: {
                            color: '#000000'
                        },
                        y: 15
                    }
                },{
                    from: midPoint,
                    to: readingLength,
                    color: '#FFFAFA',
                    label: {
                        text: '<em>Class: -1</em>',
                        style: {
                            color: '#000000'
                        },
                        y: 15
                    }
                },
                ]
            },
            legend: {
                enabled: false
            },  
            series: [{
                data: readings
            }],
            tooltip: {
                formatter: function () {
                    return '<b>' + this.x.charAt(0).toUpperCase() + this.x.slice(1) + '</b>' +
                        '<br/>' + this.y.toFixed(4) ;
                },
            },
        }
    },
    AllSensorsReading: (sampleCodes, series) => {
        const readingLength = sampleCodes.length;
        const midPoint = readingLength / 2;
        return {
            rangeSelector: {
                selected: 1
            },
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Sensor Readings'
            },
            subtitle: {
                text: 'Click and drag in the plot area to zoom in'
            },
            xAxis: {
                categories: sampleCodes,
                labels: {
                    formatter: function () {
                        let sampleName = this.value.split("e");
                        return sampleName[1];
                    }
                },
                plotLines: [{
                    color: '#FF0000',
                    width: 2,
                    value: midPoint,           
                    label: {
                        align:"left",
                        text:"Change Point",
                        verticalAlign:"top",
                        x:5,
                        y:1,
                    }
                }],
                plotBands: [{
                    from: 0,
                    to: midPoint,
                    color: '#F0FFF0',
                    label: {
                        text: '<em>Class: 1</em>',
                        style: {
                            color: '#000000'
                        },
                        y: 15
                    }
                },{
                    from: midPoint,           
                    to: readingLength,           
                    color: '#FFFAFA',
                    label: {
                        text: '<em>Class: -1</em>',
                        style: {
                            color: '#000000'
                        },
                        y: 15
                    }
                },
                ]
            },
            legend: {
                enabled: false
            },
            tooltip: {
                shared: true,
                crosshairs: true,
                formatter: function () {
                    return this.points.reduce(function (s, point) {
                        return s + '<br/>' + '<div>' + point.series.name.charAt(0).toUpperCase() + point.series.name.slice(1) + ': ' +
                            point.y.toFixed(4) + '</div>';
                    }, '<b>' + this.x.charAt(0).toUpperCase() + this.x.slice(1) + '</b>');
                },
            },
            series: series
        }
    },
    DistributionPercentage: (series) => {
        return {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Distribution Percentages'
            },
            xAxis: {
                categories: ["0.0-0.1", "0.1-0.2", "0.2-0.3", "0.3-0.4", "0.4-0.5", "0.5-0.6", "0.6-0.7", "0.7-0.8", "0.8-0.9", "0.9-1.0"]
            },
            yAxis: {
                min: 0,
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                shared: true
            },
            plotOptions: {
                column: {
                    stacking: 'percent'
                }
            },
            series: series,
            legend: {
                enabled: true,
                labelFormatter: function () {
                    return this.name.charAt(0).toUpperCase() + this.name.slice(1);
                }
            },
        }
    }
}