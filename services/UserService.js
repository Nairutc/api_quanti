import Teacher from '../models/teacherModel.js';
import User from '../models/userModel.js';

class UserService {
    async getAll() {
        return User.find().select('-password');
    }

    async getById(id) {
        return User.findById(id).select(
            '-password',
        );
    }

    async findByEmail(email) {
        return User.findOne({
            email,
        });
    }

    async emailExists(
        email,
        excludedUserId,
    ) {
        return User.findOne({
            email,
            _id: {
                $ne: excludedUserId,
            },
        });
    }

    async create(userData) {
        return User.create(userData);
    }

    async update(id, userData) {
        return User.findByIdAndUpdate(
            id,
            userData,
            {
                new: true,
                runValidators: true,
            },
        ).select('-password');
    }

    async delete(id) {
        const user = await User.findById(
        id,
    ).select('-password');

    if (!user) {
        return null;
    }

        await Teacher.findOneAndUpdate(
            {
                user: user._id,
            },
            {
                user: null,
                active: false,
            },
    );

        await User.findByIdAndDelete(id);

        return user;
    }

    async updateProfileImage(
        id,
        imagePath,
    ) {
        return User.findByIdAndUpdate(
            id,
            {
                profileImage: imagePath,
            },
            {
                new: true,
                runValidators: true,
            },
        ).select('-password');
    }

    async synchronizeTeacher(user) {
        if (user.role !== 'teacher') {
            await Teacher.findOneAndUpdate(
                {
                    user: user._id,
                },
                {
                    user: null,
                    active: false,
                },
            );

            return;
        }

        const teacher = await Teacher.findOne({
            $or: [
                {
                    user: user._id,
                },
                {
                    email: user.email,
                },
            ],
        });

        if (teacher) {
            teacher.user = user._id;
            teacher.name = user.name;
            teacher.email = user.email;
            teacher.active = true;

            await teacher.save();

            return;
        }

        await Teacher.create({
            user: user._id,
            name: user.name,
            email: user.email,
            specialty: 'Por definir',
            active: true,
        });
    }
}

export default new UserService();
