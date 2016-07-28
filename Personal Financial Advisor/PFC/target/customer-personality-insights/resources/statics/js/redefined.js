Ext.Loader.setConfig({
    enabled: true
});

Ext.Loader.setPath('Ext.ux', '../ux');

Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.panel.*',
    'Ext.layout.container.Border'
]);


var asIssampleData = [{
        "name": "Food",
        "category": "Food",
        "expense": "750",
        "average": "400",
        "children": [{
            "name": "Restaurant",
            "category": "Restaurant",
            "expense": "180",
            "average": "100"
        }, {
            "name": "Grocery",
            "category": "Grocery",
            "expense": "120",
            "average": "125"
        }, {
            "name": "Takeaway",
            "category": "Takeaway",
            "expense": "200",
            "average": "100"
        }, {
            "name": "Alcohol",
            "category": "Alcohol",
            "expense": "150",
            "average": "75"
        }]
    }, {
        "name": "Travel",
        "category": "Travel",
        "expense": "600",
        "average": "500",
        "children": [{
            "name": "Fuel",
            "category": "Fuel",
            "expense": "200",
            "average": "150"
        }, {
            "name": "Lodging",
            "category": "Lodging",
            "expense": "175",
            "average": "150"
        }, {
            "name": "Tickets",
            "category": "Tickets",
            "expense": "225",
            "average": "200"
        }]
    }, {
        "name": "Shopping",
        "category": "Shopping",
        "expense": "1000",
        "average": "800",
        "children": [{
            "name": "Gadgets",
            "category": "Gadgets",
            "expense": "400",
            "average": "300"
        }, {
            "name": "Apparels",
            "category": "Apparels",
            "expense": "300",
            "average": "250"
        }, {
            "name": "Home Appliances",
            "category": "Home Appliances",
            "expense": "300",
            "average": "250"
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
        "expense": "140",
        "average": "100",
        "children": [{
            "name": "CellPhone",
            "category": "CellPhone",
            "expense": "70",
            "average": "40"
        }, {
            "name": "Broadband",
            "category": "Broadband",
            "expense": "70",
            "average": "60"
        }]
    }, {
        "name": "Miscellaneous",
        "category": "Miscellaneous",
        "expense": "600",
        "average": "400",
        "children": [{
            "name": "Leisure",
            "category": "Leisure",
            "expense": "150",
            "average": "100"
        }, {
            "name": "Car Maintenance",
            "category": "Car Maintenance",
            "expense": "300",
            "average": "200"
        }, {
            "name": "Home Maintenance",
            "category": "Home Maintenance",
            "expense": "150",
            "average": "100"
        }]
    }


];

var idealsampleData = [{
        "name": "Food",
        "category": "Food",
        "expense": "400",
        "children": [{
            "name": "Restaurant",
            "category": "Restaurant",
            "expense": "100"
        }, {
            "name": "Grocery",
            "category": "Grocery",
            "expense": "125"
        }, {
            "name": "Takeaway",
            "category": "Takeaway",
            "expense": "100"
        }, {
            "name": "Alcohol",
            "category": "Alcohol",
            "expense": "75"
        }]
    }, {
        "name": "Travel",
        "category": "Travel",
        "expense": "500",
        "children": [{
            "name": "Fuel",
            "category": "Fuel",
            "expense": "150"
        }, {
            "name": "Lodging",
            "category": "Lodging",
            "expense": "150"
        }, {
            "name": "Tickets",
            "category": "Tickets",
            "expense": "200"
        }]
    }, {
        "name": "Shopping",
        "category": "Shopping",
        "expense": "800",
        "children": [{
            "name": "Gadgets",
            "category": "Gadgets",
            "expense": "300"
        }, {
            "name": "Apparels",
            "category": "Apparels",
            "expense": "250"
        }, {
            "name": "Home Appliances",
            "category": "Home Appliances",
            "expense": "250"
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
        "expense": "100",
        "children": [{
            "name": "CellPhone",
            "category": "CellPhone",
            "expense": "40"
        }, {
            "name": "Broadband",
            "category": "Broadband",
            "expense": "60"
        }]
    }, {
        "name": "Miscellaneous",
        "category": "Miscellaneous",
        "expense": "400",
        "children": [{
            "name": "Leisure",
            "category": "Leisure",
            "expense": "100"
        }, {
            "name": "Car Maintenance",
            "category": "Car Maintenance",
            "expense": "200"
        }, {
            "name": "Home Maintenance",
            "category": "Home Maintenance",
            "expense": "100"
        }]
    }


];

Ext.onReady(function() {

    var parentPanel = Ext.create('Ext.panel.Panel', {
        layout: {
            type: 'border',
            padding: 5
        },
        height: '100%',
        renderTo: 'wrapper',
        defaults: {
            split: true
        },
        items: [{
            region: 'north',
            id: 'northlayout',
            split: true,
            height: 100,
            minHeight: 30,
            style: '',
            items: [{
                xtype: 'image',
                src: '/resources/css/images/header.png'
            }]
        }, {
            region: 'west',
            height: 150,
            width: '100%',
            minHeight: 120,
            layout: {
                type: 'border',
                padding: 5
            },
            items: [{
                region: 'west',
				layout: 'fit',
                height: '100%',
                collapsible: true,
                floatable: true,
                title: 'Products for Investment',
                split: true,
                width: '50%',
                minWidth: 120,
                minHeight: 140,
                items: [{
                    xtype: "component",
                    width: '150%',
                    height: '100%',
                    autoEl: {
                        tag: "iframe",
                        src: "/resources/js/goals\\accordian.html"
                    }
                }]
            }, {
                region: 'east',
				layout: 'fit',
                height: '100%',
                collapsible: true,
                floatable: true,
                title: 'Your Spending',
                split: true,
                width: '50%',
                minWidth: 120,
                minHeight: 140,
                items: createSpendingsGrid(asIssampleData)
            }]
        }, {
            region: 'south',
            height: 250,
            width: '100%',
            minHeight: 120,
            layout: {
                type: 'border',
                padding: 5
            },
            items: [{
                region: 'west',
				layout: 'fit',
                height: '100%',
                collapsible: true,
                floatable: true,
                title: 'Actual Spending Pattern',
                split: true,
                width: '30%',
                minWidth: 120,
                minHeight: 140,
                items: createAsIsPieChart(asIssampleData)
            }, {
                region: 'west',
				layout: 'fit',
                height: '100%',
                collapsible: true,
                floatable: true,
                title: 'Expected Spending Pattern',
                split: true,
                width: '30%',
                minWidth: 120,
                minHeight: 140,
                items: createIdealPieChart(idealsampleData)
            }, {
                region: 'west',
				layout: 'fit',
                height: '100%',
                collapsible: true,
                floatable: true,
                title: 'Ideal Vs AsIs Spending Pattern',
                split: true,
                width: '40%',
                minWidth: 120,
                minHeight: 140,
                items: createCombineBarChart(asIssampleData)
            }]
        }]
    });
});
