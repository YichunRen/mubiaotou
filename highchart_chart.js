// Constants
const DINGUS_PRICE = 16.25;
const WIDGET_PRICE = 10.99;
const ZERO_FORMAT = '0.00';

// Global store (What else would you need here?)
let store = {
  orderHistory : [],
  dashboard: [0, 0, 0],
  dingus_daily: [],
  widget_daily: [],
  date_daily: []
};

//localStorage.clear();

function no_storage() {
	if (localStorage.getItem("order_history") == null) {
		return true;
	}
	return false;
}

function delete_empty_row() {
	document.getElementById("table1").deleteRow(2)
}

function generateEntries() {
	// Returns an orderHistory array
	// [ID#, Date, Dingus quantity, Widget quantity, Payment]
    return [
	  [1, '04/19/2020', 1, 2, 'Paypal'],
      [2, '04/20/2020', 3, 4, 'Visa']
	]
}

function initial_table() {
    //check_storage();
    
	if (no_storage()) {
		
		var initial_rows = generateEntries();
		var tableRef = document.getElementById('table1').getElementsByTagName('tbody')[0];
		var sum_sales = 0;
		var d_quantity = 0;
		var w_quantity = 0;

		for (let i = 0; i < initial_rows.length; i++) {
			var row = [];
			let new_row   = tableRef.insertRow();
			let id = new_row.insertCell(0);
			let date = new_row.insertCell(1);
			let dingus = new_row.insertCell(2);
			let widget = new_row.insertCell(3);
			let total = new_row.insertCell(4);
			let payment = new_row.insertCell(5);
			id.innerHTML = initial_rows[i][0];
			date.innerHTML = initial_rows[i][1];
			dingus.innerHTML = initial_rows[i][2];
            widget.innerHTML = initial_rows[i][3];
            
            if ((store.date_daily.length == 0) || (store.date_daily[store.date_daily.length-1] != initial_rows[i][1])){
                store.dingus_daily.push(parseInt(initial_rows[i][2]));
                store.widget_daily.push(parseInt(initial_rows[i][3]));
                store.date_daily.push(initial_rows[i][1]);
            } else {
                var current_day = store.date_daily.length-1;
                store.dingus_daily[current_day] += initial_rows[i][2];
                store.widget_daily[current_day] += initial_rows[i][3];
            } 

			row.push(initial_rows[i][0]);
			row.push(initial_rows[i][1]);
			row.push(initial_rows[i][2]);
			row.push(initial_rows[i][3]);

			w_quantity += initial_rows[i][3];
			d_quantity += initial_rows[i][2];
			var new_total = (initial_rows[i][3] * WIDGET_PRICE + initial_rows[i][2] * DINGUS_PRICE).toFixed(2);
			total.innerHTML = "$" + new_total;
			sum_sales += parseFloat(new_total);
			payment.innerHTML = initial_rows[i][4];
			row.push(new_total);
			row.push(initial_rows[i][4]);
			store["orderHistory"].push(row);
		}
		document.getElementById('d-total-quantity').innerHTML = d_quantity;
		document.getElementById('w-total-quantity').innerHTML = w_quantity;
		document.getElementById('total-sales').childNodes[1].nodeValue = sum_sales.toFixed(2);

		var new_dashboard = [];
		new_dashboard.push(document.getElementById('d-total-quantity').innerHTML);
		new_dashboard.push(document.getElementById('w-total-quantity').innerHTML);
		new_dashboard.push(document.getElementById('total-sales').childNodes[1].nodeValue);
		store["dashboard"] = new_dashboard;
		localStorage.setItem("order_history", JSON.stringify(store.orderHistory));
		localStorage.setItem("dashboard", JSON.stringify(store.dashboard));

	} else {
		var tableRef = document.getElementById('table1').getElementsByTagName('tbody')[0];
		var all_rows = JSON.parse(localStorage.getItem("order_history"));
		var dashboard = JSON.parse(localStorage.getItem("dashboard"));
		store["orderHistory"] = all_rows;
		store["dashboard"] = dashboard;
		for (let i = 0; i < all_rows.length; i++) {
			var curr_row = all_rows[i];
			let new_row   = tableRef.insertRow();
			let id = new_row.insertCell(0);
			let date = new_row.insertCell(1);
			let dingus = new_row.insertCell(2);
			let widget = new_row.insertCell(3);
			let total = new_row.insertCell(4);
			let payment = new_row.insertCell(5);
			id.innerHTML = curr_row[0];
			date.innerHTML = curr_row[1];
			dingus.innerHTML = curr_row[2];
			widget.innerHTML = curr_row[3];
			total.innerHTML = "$" + curr_row[4];
            payment.innerHTML = curr_row[5];

            if ((store.date_daily.length == 0) || (store.date_daily[store.date_daily.length-1] != curr_row[1])){
                store.dingus_daily.push(parseInt(curr_row[2]));
                store.widget_daily.push(parseInt(curr_row[3]));
                store.date_daily.push(curr_row[1]);
            } else {
                var current_day = store.date_daily.length-1;
                store.dingus_daily[current_day] += parseInt(curr_row[2]);
                store.widget_daily[current_day] += parseInt(curr_row[3]);
            }
		}
		document.getElementById('d-total-quantity').innerHTML = parseInt(dashboard[0]);
		document.getElementById('w-total-quantity').innerHTML = parseInt(dashboard[1]);
		document.getElementById('total-sales').childNodes[1].nodeValue = parseFloat(dashboard[2]).toFixed(2);
    }
	
}

function insert_row() {
	var row = [];
	var new_dash = [];
	var id = store["orderHistory"].length + 1
	row.push(id);

	var today = new Date();
	var dd = String(today.getDate()).padStart(2,'0');
	var mm = String(today.getMonth() + 1).padStart(2,'0');
	var yyyy = today.getFullYear();
	today = mm + '/' + dd + '/' + yyyy;
    row.push(today);
    

	d_quantity = parseInt(document.getElementById("d-quantity").value);
	w_quantity = parseInt(document.getElementById("w-quantity").value);
	row.push(d_quantity);
    row.push(w_quantity);

    if ((store.date_daily.length == 0) || (store.date_daily[store.date_daily.length-1] != today)){
        store.dingus_daily.push(d_quantity);
        store.widget_daily.push(w_quantity);
        store.date_daily.push(today);
    } else {
        var current_day = store.date_daily.length-1;
        store.dingus_daily[current_day] += d_quantity;
        store.widget_daily[current_day] += w_quantity;
    }

	var int_d_total = parseInt(document.getElementById('d-total-quantity').innerHTML);
	var int_m_total = parseInt(document.getElementById('w-total-quantity').innerHTML);
	document.getElementById('d-total-quantity').innerHTML = d_quantity + int_d_total;
	document.getElementById('w-total-quantity').innerHTML = w_quantity + int_m_total;

	dw_total = parseFloat(document.getElementById("dw-total").value);
	var float_dw_total = parseFloat(document.getElementById('total-sales').childNodes[1].nodeValue);
	document.getElementById('total-sales').childNodes[1].nodeValue = (dw_total + float_dw_total).toFixed(2);
	row.push(dw_total.toFixed(2));

	payment = document.getElementById("paymentselect").value;
	row.push(payment);

	new_dash.push(document.getElementById('d-total-quantity').innerHTML);
	new_dash.push(document.getElementById('w-total-quantity').innerHTML);
	new_dash.push(document.getElementById('total-sales').childNodes[1].nodeValue);

	store["orderHistory"].push(row);
	store["dashboard"] = new_dash;
	localStorage.setItem("order_history", JSON.stringify(store.orderHistory));
	localStorage.setItem("dashboard", JSON.stringify(store.dashboard));

	update_table(row);
}


function update_table(row) {
	var tableRef = document.getElementById('table1').getElementsByTagName('tbody')[0];
	let new_row   = tableRef.insertRow();
	let id = new_row.insertCell(0);
	let date = new_row.insertCell(1);
	let dingus = new_row.insertCell(2);
	let widget = new_row.insertCell(3);
	let total = new_row.insertCell(4);
	let payment = new_row.insertCell(5);
	id.innerHTML = row[0];
	date.innerHTML = row[1];
	dingus.innerHTML = row[2];
	widget.innerHTML = row[3];
	total.innerHTML = "$"+row[4];
	payment.innerHTML = row[5];	
}


function start_form() {
	document.getElementById("dingus_price").value = DINGUS_PRICE;
	document.getElementById("widget_price").value = WIDGET_PRICE;
	document.getElementById("d-quantity").value = 0;
	document.getElementById("w-quantity").value = 0;
	document.getElementById("d-total").value = ZERO_FORMAT;
	document.getElementById("w-total").value = ZERO_FORMAT;
	document.getElementById("dw-total").value = ZERO_FORMAT;
	document.getElementById('order-button').disabled = true;
	if (document.getElementById("paymentselect").value != ""){
		remove_selected();
	}	
}

function remove_selected(){
	let selection = document.getElementById("paymentselect");
    selection.options[selection.selectedIndex].selected = false;   
  }


function dingus_total() {
	let d_quantity = document.getElementById("d-quantity").value;
	let d_total = DINGUS_PRICE * d_quantity
	document.getElementById("d-total").value = (d_total).toFixed(2);
	let w_total = parseFloat(document.getElementById("w-total").value)
	document.getElementById("dw-total").value = (d_total + w_total).toFixed(2);
}

function widget_total() {
	let w_quantity = document.getElementById("w-quantity").value;
	let w_total = WIDGET_PRICE * w_quantity
	document.getElementById("w-total").value = (w_total).toFixed(2);
	let d_total = parseFloat(document.getElementById("d-total").value)
	document.getElementById("dw-total").value = (d_total + w_total).toFixed(2);
}


function check_order() {
	let option = document.getElementById("paymentselect").value;
	let d_quantity = document.getElementById("d-quantity").value;
	let w_quantity = document.getElementById("w-quantity").value;
	if (typeof parseFloat(d_quantity) == "number" && typeof parseFloat(w_quantity) == "number" ) {
		if (Number.isInteger(parseFloat(d_quantity)) && Number.isInteger(parseFloat(w_quantity))) {
			if (d_quantity > 0 && w_quantity >= 0 && option != "") {
				document.getElementById("order-button").removeAttribute("disabled");
			}
			else if (d_quantity >= 0 && w_quantity > 0 && option != ""){
				document.getElementById("order-button").removeAttribute("disabled");
			} else {
				document.getElementById("order-button").disabled = true;
			}
		} else {
			document.getElementById("order-button").disabled = true;
		}	
	} else {
		document.getElementById("order-button").disabled = true;
	}
	
}

function plot_line() {
    Highcharts.chart('line_chart', {
        title: {
          text: 'Sales Amount for Dingus and Widget Daily'
        },
        xAxis: {
            categories: store.date_daily,
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Daily Amount'
            }
        },
        series: [{
          name: 'Dingus',
          data: store.dingus_daily
        }, {
            name: 'Widget',
            data: store.widget_daily
          }]
      });
}

function plot_pie() {
    Highcharts.chart('pie_chart', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Sales Ratio for Dingus and Widget Overall'
        }, 
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
              }
            }
          },
        series: [{
          name: 'total-quantity',
          colorByPoint: true,
          data: [{
            name: 'Dingus',
            y: parseInt(store.dashboard[0])/(parseInt(store.dashboard[0]) + parseInt(store.dashboard[1])),
            sliced: true,
            selected: true
          }, {
            name: 'Widget',
            y: parseInt(store.dashboard[1])/(parseInt(store.dashboard[0]) + parseInt(store.dashboard[1]))
          }]
        }]
      });
}


