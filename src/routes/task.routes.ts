import express, { type Request, type Response, type NextFunction} from 'express';
const router = express.Router();
import authUser from '../middlewares/authUser.js';
import {
    fatchTasksController,
    createTaskController,
    updateTaskController,
    deleteTaskController,
} from '../controllers/tasks/task.controller.js';

router.get('/', authUser, fatchTasksController);
router.get('/:id', authUser, fatchTasksController);
router.post('/', authUser, createTaskController);  
router.put('/:id', authUser, updateTaskController);
router.delete('/:id', authUser, deleteTaskController);

export default router;