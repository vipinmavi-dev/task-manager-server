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
            where: whereCondition,
            order: [
                ['created_at', 'DESC']
            ]
        });
        const taskCounts = await Task.findOne({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('Task.id')), 'total'],
        
                [
                    Sequelize.fn(
                        'SUM',
                        Sequelize.literal(
                            "CASE WHEN status.name = 'todo' THEN 1 ELSE 0 END"
                        )
                    ),
                    'todo'
                ],
        
                [
                    Sequelize.fn(
                        'SUM',
                        Sequelize.literal(
                            "CASE WHEN status.name = 'in_progress' THEN 1 ELSE 0 END"
                        )
                    ),
                    'in_progress'
                ],
        
                [
                    Sequelize.fn(
                        'SUM',
                        Sequelize.literal(
                            "CASE WHEN status.name = 'completed' THEN 1 ELSE 0 END"
                        )
                    ),
                    'completed'
                ],
        
                [
                    Sequelize.fn(
                        'SUM',
                        Sequelize.literal(
                            "CASE WHEN status.name = 'delayed' THEN 1 ELSE 0 END"
                        )
                    ),
                    'delayed'
                ],
        
                [
                    Sequelize.fn(
                        'SUM',
                        Sequelize.literal(
                            "CASE WHEN status.name = 'cancelled' THEN 1 ELSE 0 END"
                        )
                    ),
                    'cancelled'
                ]
            ],
        
            include: [
                {
                    model: TaskStatus,
                    as: 'status',
                    attributes: []
                }
            ],
        
            where: whereCondition,
        
            raw: true
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
            data: { tasks:tasks, counts: taskCounts }
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
    deleteTaskController,
}