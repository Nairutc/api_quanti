import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del curso es obligatorio'],
        trim: true,
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
        maxlength: [50, 'El nombre no puede exceder los 50 caracteres'],
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
    },
    duration: {
        type: String,
        required: [true, 'La duración es obligatoria'],
    },
    modality: {
        type: String,
        enum: ['Presencial', 'Virtual'],
        default: 'Virtual',
    },
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo'],
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: [true, 'El profesor es obligatorio'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
