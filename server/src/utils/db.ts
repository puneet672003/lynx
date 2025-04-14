import mongoose, { Schema, Document } from 'mongoose';
import { UserInDB } from '../models/auth.models';
import { Link } from '../models/link.model';

export const connectDB = async () => {
	const MONGODB_URL =
		process.env['MONGODB_URL'] || 'mongodb://localhost:27017/';

	try {
		await mongoose.connect(MONGODB_URL);
		console.log('MongoDB connected successfully');
	} catch (error) {
		console.error('MongoDB connection error:', error);
		process.exit(1);
	}
};

interface UserDocument extends UserInDB, Document {}

const UserSchema = new Schema<UserDocument>({
	userId: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

const ClickSchema = new Schema({
	device: {
		type: { type: String },
	},
	clickedAt: { type: Date, default: Date.now },
});

interface LinkDocument extends Link, Document {}

const LinkSchema = new Schema<LinkDocument>({
	userId: { type: String, required: true },
	originalUrl: { type: String, required: true },
	urlAlias: { type: String, required: true, unique: true },
	totalClicks: { type: Number, default: 0 },
	clicks: [ClickSchema],
	createdAt: { type: Date, default: Date.now },
	expiresAt: { type: Date, default: Date.now },
});

const User = mongoose.model<UserDocument>('user', UserSchema);
const LinkModel = mongoose.model<LinkDocument>('link', LinkSchema);

export const appendUser = async (user: UserInDB): Promise<void> => {
	try {
		await User.create(user);
	} catch (error) {
		console.error('Error creating user:', error);
		throw error;
	}
};

export const findUserByEmail = async (
	email: string
): Promise<UserInDB | null> => {
	try {
		return await User.findOne({ email }).lean();
	} catch (error) {
		console.error('Error finding user by email:', error);
		return null;
	}
};

export const findUserById = async (
	userId: string
): Promise<UserInDB | null> => {
	try {
		return await User.findOne({ userId }).lean();
	} catch (error) {
		console.error('Error finding user by ID:', error);
		return null;
	}
};

// Link operations
export const findLinks = async (query: any): Promise<Link[]> => {
	try {
		return await LinkModel.find(query).lean();
	} catch (error) {
		console.error('Error finding links:', error);
		return [];
	}
};

export const appendLink = async (link: Link): Promise<void> => {
	try {
		await LinkModel.create(link);
	} catch (error) {
		console.error('Error creating link:', error);
		throw error;
	}
};

export const updateStats = async (
	device: string,
	urlAlias: string
): Promise<void> => {
	try {
		await LinkModel.findOneAndUpdate(
			{ urlAlias },
			{
				$inc: { totalClicks: 1 },
				$push: {
					clicks: {
						device: { type: device },
						clickedAt: new Date(),
					},
				},
			}
		);
	} catch (error) {
		console.error('Error updating link stats:', error);
		throw error;
	}
};
