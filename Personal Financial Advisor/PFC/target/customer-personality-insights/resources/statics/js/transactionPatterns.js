var spendingsGridJsonStore = Ext.create('Ext.data.JsonStore', {
    fields: [{
        name: 'category',
        mapping: 'category'
    }, {
        name: 'expense',
        mapping: 'expense'
    }]
});

var asIsJsonStore = Ext.create('Ext.data.JsonStore', {
    fields: [{
        name: 'category',
        mapping: 'category'
    }, {
        name: 'expense',
        mapping: 'expense'
    }]
});

var idealJsonStore = Ext.create('Ext.data.JsonStore', {
    fields: [{
        name: 'category',
        mapping: 'category'
    }, {
        name: 'expense',
        mapping: 'expense'
    }]
});

var asIdIdealJsonStore = Ext.create('Ext.data.JsonStore', {
    fields: [{
        name: 'category',
        mapping: 'category'
    }, {
        name: 'expense',
        mapping: 'expense'
    }]
});

function createSpendingsGrid(data) {
    spendingsGridJsonStore.loadData(data);
    var grid = Ext.create('Ext.grid.Panel', {
        bufferedRenderer: false,
        store: spendingsGridJsonStore,
		scrollable: true,
        columns: [{
            text: "Category",
            width: 120,
            dataIndex: 'category',
            sortable: true
        }, {
            text: "Expense",
            width: 125,
            dataIndex: 'expense',
            sortable: true
        }, {
            text: "Average",
            width: 125,
            dataIndex: 'average',
            sortable: true
        }],
        forceFit: true,
        height: 210
    });
    return grid;
}

function createAsIsPieChart(data) {
    asIsJsonStore.loadData(data);
    return createPieChart('as-is-chart', asIsJsonStore);
}

function createIdealPieChart(data) {
    idealJsonStore.loadData(data);
    return createPieChart('ideal-chart', idealJsonStore);
}

function createCombineBarChart(data) {
    asIdIdealJsonStore.loadData(data);
    return createBarChart('combine-chart', asIdIdealJsonStore);
}

function createPieChart(chartId, store) {
    chart = null;
    chart = Ext.create('Ext.chart.PolarChart', {
        store: store,
        id: chartId,
        animation: true,
        //title: 'Personality',
        interactions: ['itemhighlight'],
        listeners: {
            itemmouseover: function(chart, item) {
                asIdIdealJsonStore.loadData(item.record.data.children);
                console.log(chart, item);
            }
        },
        plugins: {
            ptype: 'chartitemevents',
            moveEvents: true
        },
        series: [{
            type: 'pie',
            animation: {
                easing: 'easeOut',
                duration: 500
            },
			angleField: 'expense', // bind angle span to visits
            lengthField: 'category', // bind pie slice length to views
            clockwise: false,
            label: {
                field: 'category',
                display: 'rotate',
                contrast: true,
				fontSize: '10px'
            },
            style: {
                strokeStyle: 'white',
                lineWidth: 1
            },
            tooltip: {
                trackMouse: true,
                renderer: function(storeItem, item) {
                    this.setHtml(storeItem.get('category') + ': Euro ' + (storeItem.get('expense')));
                }
            }
        }]
    });
    return chart;
}

function createBarChart(chartId, store) {
    var barChart = Ext.create('Ext.chart.Chart', {
        id: chartId,
        style: 'background: #fff',
        animate: true,
        shadow: false,
        store: store,
        legend: {
            docked: 'bottom'
        },
        //title: 'Characters',
        axes: [{
            type: 'numeric',
            position: 'left',
            fields: ['average', 'expense'],
            grid: true,
            minimum: 0,
            renderer: function(label, layout, lastLabel) {
                return label;
            }
        }, {
            type: 'category',
            position: 'bottom',
            fields: ['category'],
            grid: true,
            label: {
                fontSize: '10px'
            }
        }],
        series: [{
            type: 'bar',
            axis: 'left',
            stacked: true,
            title: ['Average', 'Expense'],
            xField: 'category',
            yField: ['average', 'expense'],
            style: {
                opacity: 0.80
            },
            highlight: {
                fill: '#000',
                'stroke-width': 20,
                stroke: '#fff'
            },
            tips: {
                trackMouse: true,
                style: 'background: #FFF',
                height: 20,
                renderer: function(storeItem, item) {
                    var parent = item.series.getTitle()[Ext.Array.indexOf(item.series.getYField(), item.field)];
                    this.setTitle(parent + ':Euro' + storeItem.get(item.field));
                }
            }
        }]
    });
    return barChart;

}