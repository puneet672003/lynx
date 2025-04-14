import { useState, useEffect } from 'react';
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
} from '@heroui/drawer';
import { Chart, registerables, ChartOptions } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { Divider } from '@heroui/divider';

import { cssVar } from '@/utils/color';

Chart.register(...registerables);

interface ClickData {
	device: {
		type: string,
	};
	clickedAt: Date;
}

function LinkStats({
	isOpen,
	setIsOpen,
	clicks,
}: {
	isOpen: boolean,
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
	clicks: ClickData[],
}) {
	const onClose = () => {
		setIsOpen(false);
	};

	const getChartColors = () => {
		return {
			borderColor: cssVar('--chart-border-color'),
			backgroundColor: cssVar('--chart-bg-color'),
			pointColor: cssVar('--chart-point-color'),
			textColor: cssVar('--chart-text-color'),
			gridColor: cssVar('--chart-grid-color'),
			deviceColors: {
				desktop: cssVar('--chart-device-desktop'),
				phone: cssVar('--chart-device-phone'),
				tablet: cssVar('--chart-device-tablet'),
			},
		};
	};

	const [timeData, setTimeData] = useState<{
		labels: string[],
		data: number[],
	}>({ labels: [], data: [] });
	const [deviceData, setDeviceData] = useState<{
		labels: string[],
		data: number[],
	}>({ labels: [], data: [] });

	useEffect(() => {
		const timeMap = new Map<string, number>();
		const deviceMap = new Map<string, number>();

		clicks.forEach((click) => {
			const date = new Date(click.clickedAt).toISOString().split('T')[0];
			const deviceType = click.device.type || 'unknown';

			timeMap.set(date, (timeMap.get(date) || 0) + 1);
			deviceMap.set(deviceType, (deviceMap.get(deviceType) || 0) + 1);
		});

		const sortedDates = Array.from(timeMap.keys()).sort();

		setTimeData({
			labels: sortedDates,
			data: sortedDates.map((date) => timeMap.get(date) || 0),
		});

		setDeviceData({
			labels: Array.from(deviceMap.keys()),
			data: Array.from(deviceMap.values()),
		});
	}, [clicks]);

	const timeChartOptions: ChartOptions<'line'> = {
		responsive: true,
		plugins: {
			legend: { display: false },
			title: {
				display: true,
				text: 'Clicks Over Time',
				font: {
					size: 16,
					weight: 'bold',
				},
				color: getChartColors().textColor,
			},
		},
		elements: {
			line: { tension: 0.4 },
			point: {
				radius: 4,
				hoverRadius: 6,
				backgroundColor: getChartColors().pointColor,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				title: {
					display: false,
					text: 'Clicks',
					font: { size: 14 },
					color: getChartColors().textColor,
				},
				grid: {
					color: getChartColors().gridColor,
				},
				ticks: {
					color: getChartColors().textColor,
				},
			},
			x: {
				title: {
					display: false,
					text: 'Date',
					font: { size: 14 },
					color: getChartColors().textColor,
				},
				grid: {
					color: getChartColors().gridColor,
				},
				ticks: {
					color: getChartColors().textColor,
				},
			},
		},
	};

	const deviceChartOptions: ChartOptions<'bar'> = {
		responsive: true,
		plugins: {
			legend: { display: false },
			title: {
				display: true,
				text: 'Device Breakdown',
				font: {
					size: 16,
					weight: 'bold',
				},
				color: getChartColors().textColor,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				grid: {
					color: getChartColors().gridColor,
				},
				ticks: {
					color: getChartColors().textColor,
				},
			},
			x: {
				ticks: {
					color: getChartColors().textColor,
				},
			},
		},
	};

	const timeChartData = {
		labels: timeData.labels,
		datasets: [
			{
				label: 'Clicks',
				data: timeData.data,
				borderColor: getChartColors().borderColor,
				backgroundColor: getChartColors().backgroundColor,
				fill: true,
			},
		],
	};

	const getDeviceColors = () => {
		return deviceData.labels.map((label) => {
			if (label === 'desktop') return getChartColors().deviceColors.desktop;
			if (label === 'phone') return getChartColors().deviceColors.phone;
			if (label === 'tablet') return getChartColors().deviceColors.tablet;
		});
	};

	const deviceChartData = {
		labels: deviceData.labels,
		datasets: [
			{
				label: 'Clicks by Device',
				data: deviceData.data,
				backgroundColor: getDeviceColors(),
				borderRadius: 6,
				barThickness: 40,
			},
		],
	};

	return (
		<Drawer isOpen={isOpen} size="3xl" onClose={onClose}>
			<DrawerContent>
				<DrawerHeader className="text-xl font-bold text-center">
					Link Statistics
				</DrawerHeader>
				<Divider className="w-full opacity-60" />
				<DrawerBody>
					<div className="flex flex-col items-center gap-8 p-4">
						<div className="w-full max-w-xl rounded-lg">
							<Line options={timeChartOptions} data={timeChartData} />
						</div>
						<Divider className="max-w-[60%] opacity-60" />
						<div className="w-full max-w-xl rounded-lg">
							<Bar options={deviceChartOptions} data={deviceChartData} />
						</div>
					</div>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
}

export default LinkStats;
