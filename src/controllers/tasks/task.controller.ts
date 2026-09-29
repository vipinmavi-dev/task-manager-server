import { type Request, type Response } from "express";
import Task from "../../models/tasks.model.js";
import { Sequelize, where } from 'sequelize';
import TaskStatus from "../../models/taskStatus.model.js";
import TaskPriority from "../../models/taskPriority.model.js";
async function fatchTasksController(req: Request, res: Response) {
    try {
        let whereCondition:any = {user_id: req.user.id};
        if(req.params.id) whereCondition={ id: req.params.id, ...whereCondition };
        
        const taskList = await Task.findAll({
            attributes: [
                'id',
                'name',
                'description',
                'status_id',
                [
                    Sequelize.fn(
                        'DATE',
                        Sequelize.col('Task.created_at')
                    ),
                    'created_at'
                ],
                [
                    Sequelize.fn(
                        'DATE',
                        Sequelize.col('Task.updated_at')
                    ),
                    'updated_at'
                ],
            ],
            include: [
                {
                    model: TaskStatus,
                    as: 'status',
                    attributes: ['name']
                },
                {
                    model: TaskPriority,
                    as: 'priority',
                    attributes: ['name']
                }
            ],
            where: whereCondition
        });
        const tasks = taskList.map(task => {
            const taskData = task.toJSON();
        
            return {
                ...taskData,
                status: taskData.status?.name,
                priority: taskData.priority?.name
            };
        });
        res.status(200).json({
            success: true,
            message: 'Tasks fetched successfully',
            data: tasks
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
async function getStatusesController(req: Request, res: Response) {
    try {
        const statuses = await TaskStatus.findAll();
        res.status(200).json({
            success: true,
            message: 'Statuses fetched successfully',
            data: statuses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching statuses',
            data: error
        });
    }
}
async function getPriorityController(req: Request, res: Response) {
    try {
        const statuses = await TaskPriority.findAll();
        res.status(200).json({
            success: true,
            message: 'Priorityes fetched successfully',
            data: statuses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching Priorityes',
            data: error
        });
    }
}
export {
    fatchTasksController,
    createTaskController,
    updateTaskController,
    deleteTaskController,
    getStatusesController,
    getPriorityController
}