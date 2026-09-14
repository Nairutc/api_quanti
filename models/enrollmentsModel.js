import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: [true, 'El nombre del estudiante es obligatorio'],
        trim: true,
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
        maxlength: [50, 'El nombre no puede exceder los 50 caracteres'],
    },
    studentEmail: {
        type: String,
        required: [true, 'El email del estudiante es obligatorio'],
        trim: true,
        lowercase: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'El curso es obligatorio'],
    },
    status: {
        type: String,
        enum: ['pendiente', 'confirmada', 'cancelada'],
        default: 'pendiente',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

export default Enrollment;
