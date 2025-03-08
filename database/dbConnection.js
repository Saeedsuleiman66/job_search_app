import mongoose from 'mongoose';

export const DB_connection = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/JobSearchApp');
        console.log('MongoDB Connection Succeeded.');
    } catch (error) {
        console.error('Error in DB connection:', error);
    }
}
