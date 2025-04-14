import { useState } from 'react';
import { Button } from '@heroui/button';
import { FaPlus } from 'react-icons/fa6';

import DashboardLayout from '@/layouts/dashboard';
import LinksTable from '@/components/links-table';
import CreateLinkForm from '@/components/create-link';

function Dashboard() {
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
	const [toggleRefresh, setToggleRefresh] = useState<number>(0);

	const closeForm = () => {
		setIsFormOpen(false);
		setToggleRefresh((prev) => Number(!prev));
	};

	return (
		<DashboardLayout>
			<div className="w-full flex justify-center mb-2">
				<Button
					fullWidth
					variant="flat"
					className="text-md"
					color="secondary"
					onPress={() => setIsFormOpen(true)}
				>
					<FaPlus />
					Create Short URL
				</Button>
			</div>
			<LinksTable refreshData={toggleRefresh} />
			<CreateLinkForm isOpen={isFormOpen} onClose={closeForm} />
		</DashboardLayout>
	);
}

export default Dashboard;
