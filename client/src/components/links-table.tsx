import { useEffect, useState } from 'react';
import { addToast } from '@heroui/toast';
import {
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
} from '@heroui/table';
import { Button } from '@heroui/button';
import { ImStatsDots } from 'react-icons/im';
import { Tooltip } from '@heroui/tooltip';
import { Chip } from '@heroui/chip';
import { FaCopy } from 'react-icons/fa';

import { api } from '@/api/axios';
import LinkStats from '@/components/link-stats';
import { SERVER_BASE_URL } from '@/config';

export default function LinksTable({ refreshData }: { refreshData: number }) {
	const [linksData, setLinksData] = useState([]);
	const [selectedRow, setSelectedRow] = useState([]);
	const [isStatsOpen, setIsStatsOpen] = useState(false);

	const getActionButtons = (row: any) => {
		return (
			<div className="flex gap-2 justify-center">
				<Tooltip content="Details">
					<Button
						isIconOnly
						variant="flat"
						onPress={() => {
							setSelectedRow(row['clicks']);
							setIsStatsOpen(true);
						}}
					>
						<ImStatsDots className="text-secondary" />
					</Button>
				</Tooltip>
				<Tooltip content="Copy Short URL">
					<Button
						isIconOnly
						variant="flat"
						onPress={() => {
							const textToCopy = `${SERVER_BASE_URL}/${row['urlAlias']}`;

							if (navigator.clipboard) {
								navigator.clipboard.writeText(textToCopy).then(() =>
									addToast({
										description: 'URL Copied!',
										color: 'secondary',
									})
								);
							}
						}}
					>
						<FaCopy className="text-secondary" />
					</Button>
				</Tooltip>
			</div>
		);
	};

	const ActiveChip = (
		<Chip color="success" variant="flat">
			Active
		</Chip>
	);
	const InactiveChip = (
		<Chip color="danger" variant="flat">
			Inactive
		</Chip>
	);

	const fetchData = () => {
		api
			.get('/link/list')
			.then((res) => {
				if (res.links) {
					const data = res.links;
					const formattedData = data.map((r: any) => {
						const currentDate = new Date();
						const createdAt = new Date(r['createdAt']);

						if (r['expiresAt']) {
							const expiresAt = new Date(r['expiresAt']);

							if (expiresAt < currentDate) r['status'] = InactiveChip;
							else r['status'] = ActiveChip;

							r['expiresAt'] = expiresAt.toDateString();
						} else {
							r['expiresAt'] = 'Never';
							r['status'] = ActiveChip;
						}

						r['actions'] = getActionButtons({ ...r });
						r['createdAt'] = createdAt.toDateString();

						return r;
					});

					setLinksData(formattedData);
				}
			})
			.catch((err) => {
				addToast({ description: err.message, color: 'warning' });
			});
	};

	useEffect(() => {
		fetchData();
	}, [refreshData]);

	const columns = [
		{
			key: 'originalUrl',
			label: 'URL',
		},
		{
			key: 'urlAlias',
			label: 'URL Alias.',
		},
		{
			key: 'createdAt',
			label: 'Date created',
		},
		{
			key: 'expiresAt',
			label: 'Expiry Date',
		},
		{
			key: 'totalClicks',
			label: 'Clicks',
		},
		{
			key: 'status',
			label: 'Status',
		},
		{
			key: 'actions',
			label: 'Actions',
		},
	];

	return (
		<>
			<Table aria-label="Example empty table">
				<TableHeader columns={columns}>
					{columns.map((column) => (
						<TableColumn
							align={column.key === 'originalUrl' ? 'start' : 'center'}
							key={column.key}
						>
							{column.label}
						</TableColumn>
					))}
				</TableHeader>
				<TableBody>
					<>
						{linksData.map((row, index) => (
							<TableRow key={index}>
								{columns.map((column) => (
									<TableCell key={column.key}>{row[column.key]}</TableCell>
								))}
							</TableRow>
						))}
					</>
				</TableBody>
			</Table>

			<LinkStats
				clicks={selectedRow}
				isOpen={isStatsOpen}
				setIsOpen={setIsStatsOpen}
			/>
		</>
	);
}
