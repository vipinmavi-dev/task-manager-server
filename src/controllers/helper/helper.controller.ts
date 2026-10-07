import type { Request, Response } from "express";
import TaskStatus from "../../models/taskStatus.model.js";
import TaskPriority from "../../models/taskPriority.model.js";
import User from "../../models/Users.model.js";
import bcrypt from 'bcrypt';

export async function getStatuses(req: Request, res: Response) {
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
export async function getPriorities(req: Request, res: Response) {
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
export async function changePassword(req: Request, res: Response) {
    try {
        const user_id = req.user?.id;
        const { oldPassword, newPassword } = req.body;
        const UserFromDb = await User.findByPk(user_id);
        const oldHashedPassword = UserFromDb?.password;
        const newHashedPassword = await bcrypt.hash(newPassword, 13);
        const isPasswordCorrect = await bcrypt.compare(oldPassword, oldHashedPassword);
        if(!isPasswordCorrect){
            res.status(400).json({
                success: false,
                message: 'Error changing password',
                data: null
            });
        }
        await User.update({ password: newHashedPassword }, { where: { id: user_id } });
        res.status(200).json({
            success: true,
            message: 'Password changed successfully',
            data: null
        });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({
            success: false,
            message: 'Error changing password',
            data: error
        });
    }
}
export async function updateProfile(req: Request, res: Response) {
    try {
        const user_id = req.user?.id;
            const { name, email, phone } = req.body;
            await User.update({ name, email, phone }, { where: { id: user_id } });
            res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                data: null
            });                
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating profile',
            data: error
        });
    }
}
// Get all the data at Endpoint