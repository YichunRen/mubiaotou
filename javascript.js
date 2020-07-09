var sum_total_uv = [60171,57123,58748,58253,59115,60535,54828,54179,57172,57464];
var sum_success_uv = [1748,1731,1709,1761,1790,1762,1663,1608,1729,1692];
var sum_transfer_rate = ['2.91%','3.03%','2.91%','3.02%','3.03%','2.91%','3.03%','2.97%','3.02%','2.94%'];
var sum_transfer_rate2 = [2.91,3.03,2.91,3.02,3.03,2.91,3.03,2.97,3.02,2.94];
var daily_date = ['2019-1-1','2019-1-2','2019-1-3','2019-1-4','2019-1-5','2019-1-6','2019-1-7','2019-1-8','2019-1-9','2019-1-10']

function check_date() {
	var selection = document.getElementById("date_sum").value;
	if (selection == '2019-1-1') {
		document.getElementById("total-uv").innerHTML = sum_total_uv[0];
		document.getElementById("success-uv").innerHTML = sum_success_uv[0];
		document.getElementById("transfer-rate").innerHTML = sum_transfer_rate[0];
	}
	if (selection == '2019-1-2') {
		document.getElementById("total-uv").innerHTML = sum_total_uv[1];
		document.getElementById("success-uv").innerHTML = sum_success_uv[1];
		document.getElementById("transfer-rate").innerHTML = sum_transfer_rate[1];
	}
	if (selection == '2019-1-3') {
		document.getElementById("total-uv").innerHTML = sum_total_uv[2];
		document.getElementById("success-uv").innerHTML = sum_success_uv[2];
		document.getElementById("transfer-rate").innerHTML = sum_transfer_rate[2];
	}
	if (selection == '2019-1-4') {
		document.getElementById("total-uv").innerHTML = sum_total_uv[3];
		document.getElementById("success-uv").innerHTML = sum_success_uv[3];
		document.getElementById("transfer-rate").innerHTML = sum_transfer_rate[3];
	}
	if (selection == '2019-1-5') {
		document.getElementById("total-uv").innerHTML = sum_total_uv[4];
		document.getElementById("success-uv").innerHTML = sum_success_uv[4];
		document.getElementById("transfer-rate").innerHTML = sum_transfer_rate[4];
	}
	if (selection == '2019-1-6') {
		document.getElementById("total-uv").innerHTML = sum_total_uv[5];
		document.getElementById("success-uv").innerHTML = sum_success_uv[5];
		document.getElementById("transfer-rate").innerHTML = sum_transfer_rate[5];
	}
	if (selection == '2019-1-7') {
		document.getElementById("total-uv").innerHTML = sum_total_uv[6];
		document.getElementById("success-uv").innerHTML = sum_success_uv[6];
		document.getElementById("transfer-rate").innerHTML = sum_transfer_rate[6];
	}
	if (selection == '2019-1-8') {
		document.getElementById("total-uv").innerHTML = sum_total_uv[7];
		document.getElementById("success-uv").innerHTML = sum_success_uv[7];
		document.getElementById("transfer-rate").innerHTML = sum_transfer_rate[7];
	}
	if (selection == '2019-1-9') {
		document.getElementById("total-uv").innerHTML = sum_total_uv[8];
		document.getElementById("success-uv").innerHTML = sum_success_uv[8];
		document.getElementById("transfer-rate").innerHTML = sum_transfer_rate[8];
	}
	if (selection == '2019-1-10') {
		document.getElementById("total-uv").innerHTML = sum_total_uv[9];
		document.getElementById("success-uv").innerHTML = sum_success_uv[9];
		document.getElementById("transfer-rate").innerHTML = sum_transfer_rate[9];
	}
}


function plot_sum_bar() {
	Highcharts.chart('sum_bar', {
		chart: {
			type: 'column',
			height: 400
		},
		title: {
			text: '整体流量日趋势图'
		},
		xAxis: {
			categories: daily_date,
			title: {
				text: '日期'
			}
		},
		yAxis: {
			min: 50000,
			title: {
				text: '设置页UV'
			}
		},
		tooltip: {
			showAll: true,
			shared: true,
			positioner: function(labelWidth, labelHeight, point) {
				var tooltipX = point.plotX + 20;
				var tooltipY = point.plotY;
				return {x: tooltipX, y: tooltipY};
			}
		},
		plotOptions: {
			column: {
				dataLabels: {
					enabled: true
				}
			}
		},
		credits: {
			enabled: false
		},
		series: [{
			name: 'UV',
			data: sum_total_uv,
			showInLegend: false,
		}]
	});
}

function plot_sum_line() {
	Highcharts.chart('sum_line', {
		chart: {
			height: 150,
			type: 'line'
		},
		credits: {
			enabled: false
		},
		title: {
			text: '整体转化率日趋势图'
		},
	
		yAxis: {
			
			title: {
				text: '转化率'
			}
		},
	
		xAxis: {
			categories: daily_date
		},
	
		plotOptions: {
			series: {
				label: {
					connectorAllowed: false
				},
				color: '#FF0000'
			},
			line: {
				dataLabels: {
					enabled: true
				}
			}
		},
		series: [{
			name: 'transfer_rate',
			data: sum_transfer_rate2,
			showInLegend: false
		}]
	
	});
}

var channel_10 = [3.0, 3.15, 2.85, 3.15, 2.85, 3.0, 3.15, 3.15, 3.0, 3.0];
var channel_2 = [2.85, 3.0, 2.85, 3.15, 3.15, 2.85, 3.15, 3.0, 2.85, 3.15];
var channel_5 = [2.85, 3.0, 2.85, 2.85, 3.15, 2.85, 3.0, 2.85, 3.0, 2.85];
var channel_6 = [3.0, 3.0, 2.85, 2.85, 3.0, 3.0, 3.0, 2.85, 3.15, 2.85];
var channel_9 = [2.85, 3.0, 3.15, 3.15, 3.0, 2.85, 2.85, 3.0, 3.15, 2.85];

function plot_channel_line() {
	Highcharts.chart('channel_line', {
		chart: {
			type: 'line'
		},
		credits: {
			enabled: false
		},
		title: {
			text: '分渠道转化率分布图'
		},
	
		yAxis: {
			
			title: {
				text: '转化率'
			}
		},
	
		xAxis: {
			categories: daily_date
		},
	
		plotOptions: {
			series: {
				label: {
					connectorAllowed: false
				}
			}
		},
		series: [{
			name: '渠道2',
			data: channel_2
		}, {
			name: '渠道5',
			data: channel_5
		}, {
			name: '渠道6',
			data: channel_6
		}, {
			name: '渠道9',
			data: channel_9
		}, {
			name: '渠道10',
			data: channel_10
		}]
	
	});
}



function initial_page() {
	plot_sum_bar();
	plot_sum_line();
	plot_channel_line();
}
