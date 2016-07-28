Ext.require([
    'Ext.chart.PolarChart'
]);

Ext.onReady(function() {

    var personalityDataGlobal = personalityData;

    var panel = Ext.create('Ext.dashboard.Panel', {
        width: '100%',
        height: '100%',
        hidden: false,
        header: false,
        renderTo: Ext.getBody(),
        layout: 'border',
        items: [
                {
                    xtype: 'container',
                    region: 'west',
                    width: '50%',
                    layout: 'anchor',
                    split: true,
                    items: [{
                        xtype: 'panel',
                        title: 'Personality',
                        iconCls: 'icon_piechart',
                        anchor: '100% 100%',
                        layout: 'fit',
                        items: createPersonalityChart(personalityData.tree.children[0].children[0].children)
                    }]
                },
                {
                    xtype: 'container',
                    region: 'center',
                    width: '50%',
                    layout: 'anchor',
                    items: [{
                        xtype: 'panel',
                        title: 'Character',
                        iconCls: 'icon_barchart',
                        anchor: '100% 50%',
                        layout: 'fit',
                        items: [{
							style: 'padding: 20px 0 0 0',
							layout: 'fit',
							items: createPersonalityChildChart(personalityData.tree.children[0].children[0].children[0].children)
						}]
                    }, {
                        xtype: 'panel',
                        title: 'Needs',
                        iconCls: 'icon_barchart',
                        anchor: '100% 50%',
                        layout: 'fit',
						items: [{
							style: 'padding: 20px 0 0 0',
							layout: 'fit',
							items: createNeedsChart(personalityData.tree.children[1].children[0].children)
						}]
                    }]
                }
            ]
    });
});

var personalityJsonStore = Ext.create('Ext.data.JsonStore', {
    fields: [{
        name: 'category',
        mapping: 'category'
    }, {
        name: 'percentage',
        mapping: 'percentage'
    }]
});

var personalityChildJsonStore = Ext.create('Ext.data.JsonStore', {
    fields: [{
        name: 'category',
        mapping: 'category'
    }, {
        name: 'percentage',
        mapping: 'percentage'
    }]
});

var needsJsonStore = Ext.create('Ext.data.JsonStore', {
    fields: [{
        name: 'category',
        mapping: 'category'
    }, {
        name: 'percentage',
        mapping: 'percentage'
    }]
});

var valueStore = Ext.create('Ext.data.JsonStore', {
    fields: [{
        name: 'category',
        mapping: 'category'
    }, {
        name: 'percentage',
        mapping: 'percentage'
    }]
});


function createPersonalityChart(data) {
    personalityJsonStore.loadData(data);
    return createPieChart('personality-chart', personalityJsonStore);
}

function createPersonalityChildChart(data) {
    personalityChildJsonStore.loadData(data);
    return createBarChart('personality-child-chart', personalityChildJsonStore);
}

function createNeedsChart(data) {
    needsJsonStore.loadData(data);
    return createBarChart('needs-chart', needsJsonStore);
}

function createValuesChart(data) {
    valueStore.loadData(data);
    return createBarChart('values-chart', valueStore);
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
                personalityChildJsonStore.loadData(item.record.data.children);
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
            angleField: 'percentage', // bind angle span to visits
            lengthField: 'name', // bind pie slice length to views
            clockwise: false,
            highlight: {
                margin: 20
            },
            label: {
                field: 'name',
                display: 'rotate',
                contrast: true
            },
            style: {
                strokeStyle: 'white',
                lineWidth: 1
            },
            tooltip: {
                trackMouse: true,
                renderer: function(storeItem, item) {
                    this.setHtml(storeItem.get('name') + ': ' + (storeItem.get('percentage') * 100) + '%');
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
        axes: [{
            type: 'numeric',
            position: 'left',
            fields: ['percentage'],
            grid: true,
            minimum: 0,
			renderer: function(label, layout , lastLabel ) {
				return Math.round(label * 100) + "%";
			}
        }, {
            type: 'category',
            position: 'bottom',
            fields: ['name'],
            grid: true,
            label: {
                rotate: {
                    degrees: -45
                }
            }
        }],
        series: [{
            type: 'bar',
            axis: 'left',
            xField: 'name',
            yField: 'percentage',
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
                    this.setTitle(storeItem.get('name') + ': ' + storeItem.get('percentage') * 100 + '%');
                }
            }
        }]
    });
    return barChart;

}
