import express, { type Request, type Response, type NextFunction} from 'express';
const router = express.Router();
import authUser from '../middlewares/authUser.js';
import {
    fatchTasksController,
    createTaskController,
    updateTaskController,
    deleteTaskController,
    getStatusesController,
    getPriorityController
} from '../controllers/tasks/task.controller.js';

router.get('/tasks', authUser, fatchTasksController);
router.get('/tasks/:id', authUser, fatchTasksController);
router.post('/tasks', authUser, createTaskController);  
router.put('/tasks/:id', authUser, updateTaskController);
router.delete('/tasks/:id', authUser, deleteTaskController);

router.get('/status', authUser, getStatusesController);
router.get('/priority', authUser, getPriorityController);

export default router;