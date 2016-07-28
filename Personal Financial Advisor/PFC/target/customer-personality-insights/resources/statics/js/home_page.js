Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.panel.*',
    'Ext.layout.container.Border'
]);


Ext.onReady(function() {

    var asIssampleData = [{
            "name": "Food",
            "category": "Food",
            "expense": "3000",
            "average": "1700",
            "children": [{
                "name": "Restaurant",
                "category": "Restaurant",
                "expense": "800",
                "average": "500"
            }, {
                "name": "Grocery",
                "category": "Grocery",
                "expense": "500",
                "average": "300"
            }, {
                "name": "Takeaway",
                "category": "Takeaway",
                "expense": "700",
                "average": "400"
            }, {
                "name": "Alcohol",
                "category": "Alcohol",
                "expense": "1000",
                "average": "500"
            }]
        }, {
            "name": "Travel",
            "category": "Travel",
            "expense": "2800",
            "average": "1900",
            "children": [{
                "name": "Fuel",
                "category": "Fuel",
                "expense": "800",
                "average": "500"
            }, {
                "name": "Lodging",
                "category": "Lodging",
                "expense": "1000",
                "average": "800"
            }, {
                "name": "Tickets",
                "category": "Tickets",
                "expense": "1000",
                "average": "600"
            }]
        }, {
            "name": "Shopping",
            "category": "Shopping",
            "expense": "5000",
            "average": "3000",
            "children": [{
                "name": "Gadgets",
                "category": "Gadgets",
                "expense": "2000",
                "average": "1000"
            }, {
                "name": "Apparels",
                "category": "Apparels",
                "expense": "500",
                "average": "500"
            }, {
                "name": "Home Appliances",
                "category": "Home Appliances",
                "expense": "2500",
                "average": "1500"
            }]
        }, {
            "name": "Savings",
            "category": "Savings",
            "expense": "500",
            "children": []
        },

        {
            "name": "Communication",
            "category": "Communication",
            "expense": "1200",
            "average": "300",
            "children": [{
                "name": "CellPhone",
                "category": "CellPhone",
                "expense": "700",
                "average": "100"
            }, {
                "name": "Broadband",
                "category": "Broadband",
                "expense": "500",
                "average": "200"
            }]
        }, {
            "name": "Miscellaneous",
            "category": "Miscellaneous",
            "expense": "3700",
            "average": "1600",
            "children": [{
                "name": "Leisure",
                "category": "Leisure",
                "expense": "1000",
                "average": "600"
            }, {
                "name": "Car Maintenance",
                "category": "Car Maintenance",
                "expense": "700",
                "average": "300"
            }, {
                "name": "Home Maintenance",
                "category": "Home Maintenance",
                "expense": "2000",
                "average": "700"
            }]
        }


    ];

    var idealsampleData = [{
            "name": "Food",
            "category": "Food",
            "expense": "1700",
            "children": [{
                "name": "Restaurant",
                "category": "Restaurant",
                "expense": "500"
            }, {
                "name": "Grocery",
                "category": "Grocery",
                "expense": "300"
            }, {
                "name": "Takeaway",
                "category": "Takeaway",
                "expense": "400"
            }, {
                "name": "Alcohol",
                "category": "Alcohol",
                "expense": "500"
            }]
        }, {
            "name": "Travel",
            "category": "Travel",
            "expense": "1900",
            "children": [{
                "name": "Fuel",
                "category": "Fuel",
                "expense": "500"
            }, {
                "name": "Lodging",
                "category": "Lodging",
                "expense": "800"
            }, {
                "name": "Tickets",
                "category": "Tickets",
                "expense": "600"
            }]
        }, {
            "name": "Shopping",
            "category": "Shopping",
            "expense": "3000",
            "children": [{
                "name": "Gadgets",
                "category": "Gadgets",
                "expense": "1000"
            }, {
                "name": "Apparels",
                "category": "Apparels",
                "expense": "500"
            }, {
                "name": "Home Appliances",
                "category": "Home Appliances",
                "expense": "1500"
            }]
        }, {
            "name": "Savings",
            "category": "Savings",
            "expense": "2000",
            "children": []
        },

        {
            "name": "Communication",
            "category": "Communication",
            "expense": "300",
            "children": [{
                "name": "CellPhone",
                "category": "CellPhone",
                "expense": "100"
            }, {
                "name": "Broadband",
                "category": "Broadband",
                "expense": "200"
            }]
        }, {
            "name": "Miscellaneous",
            "category": "Miscellaneous",
            "expense": "1600",
            "children": [{
                "name": "Leisure",
                "category": "Leisure",
                "expense": "600"
            }, {
                "name": "Car Maintenance",
                "category": "Car Maintenance",
                "expense": "300"
            }, {
                "name": "Home Maintenance",
                "category": "Home Maintenance",
                "expense": "700"
            }]
        }


    ];


    var panel = Ext.create('Ext.form.Panel', {
        width: '100%',
        height: '100%',
        header: false,
        scrollable: true,
        renderTo: Ext.getBody(),
        layout: 'border',
        items: [
            // column 1
            {
                xtype: 'container',
                region: 'west',
                width: '50%',
                layout: 'anchor',
                split: true,
                items: [{
                    xtype: 'panel',
                    title: 'Goals',
                    //headerPosition: 'left',
                    iconCls: 'icon_piechart',
                    anchor: '100% 40%',
                    layout: 'center',
                    items: [ { xtype: "component",
						width: '150%',
						height: '100%',
						autoEl: {
							tag: "iframe",
							src: "/resources/js/goals\\accordian.html"
						}
                        /* items: [{
                            xtype: 'displayfield',
                            border: 10,
                            labelWidth: 140,
                            style: 'padding: 10px 0px 0px 50px',
                            fieldLabel: 'Product you can go for',
                            value: '<b>Rabo ToekomstSparen</b>'
                        }] */
                    }]
                }, {
                    xtype: 'panel',
                    //headerPosition: 'left',
                    title: 'Actual',
                    iconCls: 'icon_piechart',
                    anchor: '100% 50%',
                    layout: 'fit',
                    items: createAsIsPieChart(asIssampleData)
                }, {
                    xtype: 'panel',
                    //headerPosition: 'left',
                    //region: 'south',
                    title: 'Bar Chart',
                    anchor: '200% 50%',
                    iconCls: 'icon_piechart',
                    layout: 'fit',
                    items: createCombineBarChart(asIssampleData)
                }]
            },
            // column 2
            {
                xtype: 'container',
                region: 'center',
                width: '100%',
                layout: 'anchor',
                split: true,
                items: [{
                    xtype: 'panel',
                    //headerPosition: 'left',
                    title: 'Spending',
                    iconCls: 'icon_piechart',
                    anchor: '100% 40%',
                    layout: 'fit',
                    items: createSpendingsGrid(asIssampleData)
                }, {
                    xtype: 'panel',
                    //headerPosition: 'left',
                    title: 'Expected',
                    iconCls: 'icon_piechart',
                    anchor: '100% 50%',
                    layout: 'fit',
                    items: createIdealPieChart(idealsampleData)
                }]
            }
        ]
    });

});

var myForm = new Ext.form.Panel({
    width: 900,
    height: 400,
    title: 'Goals',
    floating: true,
    closable: true,
    items: [{
        xtype: "component",
        width: '150%',
        height: '100%',
        autoEl: {
            tag: "iframe",
            src: "/resources/js/goals\\accordian.html"
        }
    }]
});

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
            highlight: {
                margin: 20
            },
            label: {
                field: 'category',
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
            position: 'bottom'
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
                rotate: {
                    //degrees: -45
                }
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
