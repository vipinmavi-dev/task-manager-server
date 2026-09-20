import { type Request, type Response } from "express";
import Task from "../../models/tasks.model.js";

async function fatchTasksController(req: Request, res: Response) {
    try {
        const taskList = await Task.findAll();
        res.status(200).json({
            success: true,
            message: 'Tasks fetched successfully',
            data: taskList
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching tasks',
            data: error
        });
    }
}
async function createTaskController(req: Request, res: Response) {
    try {
        const reqBody = req.body;
        const payload = {...reqBody, user_id: req.user?.id};
        const apiRes = await Task.create(payload);
        res.status(200).json({
            success: true,
            message: 'Task created successfully',
            data: apiRes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching tasks',
            data: error
        });
    }
}

async function updateTaskController(req: Request, res: Response) {
    try {
        const taskId = req.params.id;
        const reqBody = req.body;
        const apiRes = await Task.update(reqBody, { where: { id: taskId } });
        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: apiRes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating task',
            data: error
        });
    }
}

async function deleteTaskController(req: Request, res: Response) {
    try {
        const taskId = req.params.id;
        const apiRes = await Task.destroy({ where: { id: taskId } });
        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            data: apiRes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting task',
            data: error
        });
    }
}
export {
    fatchTasksController,
    createTaskController,
    updateTaskController,
    deleteTaskController
}