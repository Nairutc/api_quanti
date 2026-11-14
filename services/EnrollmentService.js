import Course from '../models/courseModel.js';
import Enrollment from '../models/enrollmentsModel.js';
import User from '../models/userModel.js';

class EnrollmentService {
    async getAll(filter = {}) {
        return Enrollment.find(filter)
            .sort({
                createdAt: -1,
            })
            .populate('course', 'name');
    }

    async getStudentById(id) {
        return User.findById(id);
    }

    async getByStudentEmail(email) {
        return Enrollment.find({
            studentEmail: email,
        })
            .sort({
                createdAt: -1,
            })
            .populate(
                'course',
                'name description duration modality price',
            );
    }

    async getById(id) {
        return Enrollment.findById(id).populate(
            'course',
            'name',
        );
    }

    async getCourseById(id) {
        return Course.findById(id);
    }

    async findExisting(
        studentEmail,
        courseId,
    ) {
        return Enrollment.findOne({
            studentEmail,
            course: courseId,
        });
    }

    async create(enrollmentData) {
        return Enrollment.create(
            enrollmentData,
        );
    }

    async update(id, enrollmentData) {
        return Enrollment.findByIdAndUpdate(
            id,
            enrollmentData,
            {
                new: true,
                runValidators: true,
            },
        );
    }

    async delete(id) {
        return Enrollment.findByIdAndDelete(
            id,
        );
    }
}

export default new EnrollmentService();