jQuery(function ($) {

	// Жёсткий, мужицкий стрикт
	'use strict';

	// Таблица результатов
	var scores = [
		['26 января 2016', '27:26'],
		['27 января 2016', '28:29'],
		['28 января 2016', '28:30'],
		['29 января 2016', '28:34'],
		['1 февраля 2016, утро', '28:36'],
		['1 февраля 2016, вечер', '32:36'],
		['2 февраля 2016, утро', '32:37'],
		['2 февраля 2016, вечер', '32:41'],
		['3 февраля 2016, вечер', '37:41'],
		['8 февраля 2016', '38:45'],
		['9 февраля 2016', '40:46'],
		['11 февраля 2016', '40:50'],
		['12 февраля 2016', '41:53'],
		['15 февраля 2016', '41:55'],
		['16 февраля 2016, утро', '44:55'],
		['16 февраля 2016, вечер', '44:59'],
		['17 февраля 2016', '47:59'],
		['18 февраля 2016', '50:59'],
		['19 февраля 2016', '52:59'],
		['24 февраля 2016, утро', '56:59'],
		['24 февраля 2016, вечер', '56:60']
	];


	// Поехали!
	var elScore = $('.j-latest-score');

	var chartData = [];
	var maxDiff = 0;
	for (var i in scores) {
		if (!scores.hasOwnProperty(i)) {
			continue;
		}

		var parts = scores[i][1].split(':');
		chartData.push([
			scores[i][0],
			parseInt(parts[1]) - parseInt(parts[0])
		]);
		var abs = Math.abs(parseInt(parts[1]) - parseInt(parts[0]));
		if (abs > maxDiff) {
			maxDiff = abs;
		}
	}

	// Устанавливаем последний счёт
	elScore.text(scores[scores.length - 1][1]);

	// Рисуем искрографик
	$('#history-chart').highcharts({
		chart: {
			type: 'column',
			inverted: true,
			backgroundColor: null,
			style: {
				overflow: 'visible'
			},
			margin: [10, 10, 10, 0],
			skipClone: true
		},
		title: {
			text: ''
		},
		xAxis: {
			reversed: false,
			labels: {
				enabled: false
			},
			title: {
				enabled: true,
				text: ''
			},
			//maxPadding: 0.05,
			lineWidth: 0,
			startOnTick: false,
			endOnTick: false,
			tickPositions: []
		},
		yAxis: {
			labels: {
				enabled: false
			},
			title: {
				text: null
			},
			startOnTick: false,
			endOnTick: false,
			tickPositions: [0],
			min: -2 * maxDiff,
			max: 2 * maxDiff
		},
		legend: {
			enabled: false
		},
		credits: {
			enabled: false
		},
		tooltip: {
			borderWidth: 0,
			shadow: false,
			useHTML: true,
			hideDelay: 0,
			shared: true,
			padding: 0,
			positioner: function (w, h, point) {
				return {x: point.plotX - w / 2, y: point.plotY - h};
			},
			//pointFormat: '{point.x} km: {point.y}°C'
			pointFormatter: function (x) {
				return scores[this.index][1];
			}
		},
		plotOptions: {
			column: {
				negativeColor: '#910000',
				pointPadding: -0.2,
				borderWidth: 0
			}
		},
		series: [{
			name: 'Счёт',
			data: chartData
		}]
	});
});
