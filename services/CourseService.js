import Course from '../models/courseModel.js';
import Enrollment from '../models/enrollmentsModel.js';
import Teacher from '../models/teacherModel.js';

class CourseService {
    async getAll(filter = {}) {
        return Course.find(filter).populate(
            'teacher',
            'name specialty',
        );
    }

    async getEnrollmentsByCourse(filter) {
        return Enrollment.find(filter)
            .sort({ createdAt: 1 })
            .populate('course');
    }

    async getById(id) {
        return Course.findById(id).populate(
            'teacher',
            'name specialty',
        );
    }

    async getTeacherById(id) {
        return Teacher.findById(id);
    }

    async create(courseData) {
        return Course.create(courseData);
    }

    async update(id, courseData) {
        return Course.findByIdAndUpdate(
            id,
            courseData,
            {
                new: true,
                runValidators: true,
            },
        );
    }

    async getCourseEnrollments(courseId) {
        return Enrollment.find({
            course: courseId,
        });
    }

    async delete(id) {
        return Course.findByIdAndDelete(id);
    }
}

export default new CourseService();