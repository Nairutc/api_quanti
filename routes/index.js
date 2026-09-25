import userRouter from './userRouter.js';
import courseRouter from './courseRouter.js';
import teacherRouter from './teacherRouter.js';
import enrollmentRouter from './enrollmentRouter.js';
import authRouter from './authRouter.js';

const routerAPI = (app) => {
    app.use('/api/users', userRouter);
    app.use('/api/courses', courseRouter);
    app.use('/api/teachers', teacherRouter);
    app.use('/api/enrollments', enrollmentRouter);
    app.use('/api/auth', authRouter);
};

export default routerAPI;
