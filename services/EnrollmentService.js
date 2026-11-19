import Course from '../models/courseModel.js';
import Enrollment from '../models/enrollmentsModel.js';
import User from '../models/userModel.js';

class EnrollmentService {
    async getAll(filter = {}) {
        return Enrollment.find(filter)
            .sort({
                createdAt: -1,
            })
            .populate('student', 'name email')
            .populate('course', 'name');
    }

    async getStudentById(id) {
        return User.findOne({
            _id: id,
            role: 'student',
            active: true,
        });
    }

    async getByStudentId(studentId) {
        return Enrollment.find({
            student: studentId,
        })
            .sort({
                createdAt: -1,
            })
            .populate('student', 'name email')
            .populate(
                'course',
                'name description duration modality price',
            );
    }

    async getById(id) {
        return Enrollment.findById(id)
            .populate('student', 'name email')
            .populate('course', 'name');
    }

    async getCourseById(id) {
        return Course.findById(id);
    }

    async findExisting(
        studentId,
        courseId,
        enrollmentId = null,
    ) {
        const filter = {
            student: studentId,
            course: courseId,
        };

        if (enrollmentId) {
            filter._id = {
                $ne: enrollmentId,
            };
        }

        return Enrollment.findOne(filter);
    }

    async create(enrollmentData) {
        const enrollment =
            await Enrollment.create(
            enrollmentData,
        );

        return enrollment.populate([
            {
                path: 'student',
                select: 'name email',
            },
            {
                path: 'course',
                select: 'name',
            },
        ]);
    }

    async update(id, enrollmentData) {
        const enrollment =
            await Enrollment.findByIdAndUpdate(
                id,
                enrollmentData,
                {
                    new: true,
                    runValidators: true,
                },
            );

        if (!enrollment) {
            return null;
        }

        return enrollment.populate([
            {
                path: 'student',
                select: 'name email',
            },
            {
                path: 'course',
                select: 'name',
            },
        ]);
    }

    async delete(id) {
        return Enrollment.findByIdAndDelete(
            id,
        );
    }
}

export default new EnrollmentService();
