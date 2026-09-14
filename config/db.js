import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;

        await mongoose.connect(MONGODB_URI);

        console.log('Conectado a la base de datos');
    } catch (error) {
        console.error('Error al conectar a la base de datos', error);
        process.exit(1);
    }
};

export default connectDB;
