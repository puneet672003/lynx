export interface Device {
	type: string;
}

export interface Click {
	device: Device;
	clickedAt: Date;
}

export interface Link {
	userId: string;
	originalUrl: string;
	urlAlias: string;

	totalClicks: number;
	clicks: Click[];

	createdAt: Date;
	expiresAt: Date | null;
}
