import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
} from '@heroui/drawer';
import { useState, useEffect } from 'react';
import { Chart, registerables, ChartOptions } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { Divider } from '@heroui/divider';
import { useTheme } from '@heroui/use-theme';

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
	const { theme } = useTheme();
	const onClose = () => {
		setIsOpen(false);
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

	const chartColors = {
		borderColor: theme === 'dark' ? '#60a5fa' : '#007bff',
		backgroundColor:
			theme === 'dark' ? 'rgba(96, 165, 250, 0.2)' : 'rgba(0, 123, 255, 0.2)',
		pointColor: theme === 'dark' ? '#60a5fa' : '#007bff',
		textColor: theme === 'dark' ? '#e5e7eb' : '#333333',
		gridColor:
			theme === 'dark' ? 'rgba(156, 163, 175, 0.15)' : 'rgba(75, 85, 99, 0.1)',
		deviceColors: {
			desktop: theme === 'dark' ? '#a78bfa' : '#FF6384',
			phone: theme === 'dark' ? '#4ade80' : '#36A2EB',
			tablet: theme === 'dark' ? '#fbbf24' : '#FFCE56',
		},
	};

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
				color: chartColors.textColor,
			},
		},
		elements: {
			line: { tension: 0.4 },
			point: {
				radius: 4,
				hoverRadius: 6,
				backgroundColor: chartColors.pointColor,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				title: {
					display: false,
					text: 'Clicks',
					font: { size: 14 },
					color: chartColors.textColor,
				},
				grid: {
					color: chartColors.gridColor,
				},
				ticks: {
					color: chartColors.textColor,
				},
			},
			x: {
				title: {
					display: false,
					text: 'Date',
					font: { size: 14 },
					color: chartColors.textColor,
				},
				grid: {
					color: chartColors.gridColor,
				},
				ticks: {
					color: chartColors.textColor,
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
				color: chartColors.textColor,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				grid: {
					color: chartColors.gridColor,
				},
				ticks: {
					color: chartColors.textColor,
				},
			},
			x: {
				ticks: {
					color: chartColors.textColor,
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
				borderColor: chartColors.borderColor,
				backgroundColor: chartColors.backgroundColor,
				fill: true,
			},
		],
	};

	const getDeviceColors = () => {
		return deviceData.labels.map((label) => {
			if (label === 'desktop') return chartColors.deviceColors.desktop;
			if (label === 'phone') return chartColors.deviceColors.phone;
			if (label === 'tablet') return chartColors.deviceColors.tablet;

			return theme === 'dark' ? '#94a3b8' : '#9CA3AF'; // Default color
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
