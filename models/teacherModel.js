import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    name: {
        type: String,
        required: [true, 'El nombre del profesor es obligatorio'],
        trim: true,
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
        maxlength: [50, 'El nombre no puede exceder los 50 caracteres'],
    },
    email: {
        type: String,
        required: [true, 'El email del profesor es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    specialty: {
        type: String,
        required: [true, 'La especialidad es obligatoria'],
        trim: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
