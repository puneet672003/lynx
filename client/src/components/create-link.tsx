import { FormEvent } from 'react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from '@heroui/modal';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { addToast } from '@heroui/toast';
import { DatePicker } from '@heroui/date-picker';
import dayjs from 'dayjs';

import { api } from '@/api/axios';

function CreateLinkForm({
	isOpen,
	onClose,
}: {
	isOpen: boolean,
	onClose: () => void,
}) {
	const createLink = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = Object.fromEntries(new FormData(e.currentTarget));

		if (data['expiresAt'])
			data['expiresAt'] = dayjs(data['expiresAt'].toString()).toISOString();

		api
			.post('/link/create', data)
			.then((res) => {
				if (res.shortUrl) {
					addToast({
						description: `Created short url: ${res.shortUrl}`,
						color: 'success',
					});
					onClose();
				}
			})
			.catch((err) => addToast({ description: err.message, color: 'danger' }));
	};

	return (
		<Modal isOpen={isOpen} placement="top-center" onOpenChange={onClose}>
			<ModalContent>
				<ModalHeader className="my-2">Create Short Link</ModalHeader>
				<Form onSubmit={createLink}>
					<ModalBody className="w-full gap-4">
						<Input
							label="Original URL"
							name="originalUrl"
							placeholder="Enter your original URL"
							variant="underlined"
							labelPlacement="outside"
						/>
						<Input
							label="Custom Alias"
							name="customAlias"
							placeholder="Enter custom alias for URL"
							variant="underlined"
							labelPlacement="outside"
						/>
						<DatePicker
							label="Expiry Date"
							name="expiresAt"
							labelPlacement="outside"
							variant="underlined"
						/>
					</ModalBody>
					<ModalFooter className="w-full">
						<Button color="danger" variant="flat" onPress={onClose}>
							Close
						</Button>
						<Button type="submit" color="secondary">
							Create
						</Button>
					</ModalFooter>
				</Form>
			</ModalContent>
		</Modal>
	);
}

export default CreateLinkForm;
