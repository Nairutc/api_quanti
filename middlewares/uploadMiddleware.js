import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDirectory = 'uploads/profiles';

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, {
        recursive: true,
    });
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, uploadDirectory);
    },

    filename: (req, file, callback) => {
        const extension = path.extname(file.originalname);
        const user = req.user;

        const fileName = `user-${user._id}${extension}`;

        callback(null, fileName);
    },
});

const fileFilter = (req, file, callback) => {
    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
    ];

    if (allowedTypes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(
            new Error('Formato de archivo no permitido'),
        );
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
});

export default upload;