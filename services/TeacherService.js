import Course from '../models/courseModel.js';
import Teacher from '../models/teacherModel.js';
import User from '../models/userModel.js';

class TeacherService {
    async getAll() {
        return Teacher.find({
            active: {
                $ne: false,
            },
        });
    }

    async getById(id) {
        return Teacher.findById(id);
    }

    async getUserByEmail(email) {
        return User.findOne({
            email,
            role: 'teacher',
        });
    }

    async getUserById(id) {
        return User.findById(id);
    }

    async getByUserId(userId) {
        return Teacher.findOne({
            user: userId,
        });
    }

    async getByEmail(email) {
        return Teacher.findOne({
            email,
        });
    }

    async create(teacherData) {
        return Teacher.create(teacherData);
    }

    async update(id, teacherData) {
        return Teacher.findByIdAndUpdate(
            id,
            teacherData,
            {
                new: true,
                runValidators: true,
            },
        );
    }

    async linkUser(teacher, userId) {
        teacher.user = userId;

        return teacher.save();
    }

    async getCourses(teacherId) {
        return Course.find({
            teacher: teacherId,
        }).populate('teacher');
    }

    async getAssignedCourses(teacherId) {
        return Course.find({
            teacher: teacherId,
        });
    }

    async delete(id) {
        return Teacher.findByIdAndDelete(id);
    }
}

export default new TeacherService();
