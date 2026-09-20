import express, { type Request, type Response, type Router } from 'express';
const router: Router = express.Router();
import User from '../models/Users.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authUser from '../middlewares/authUser.js';

router.post('/login', async (req: Request, res: Response) => {
    const userCredential: Readonly<{ email: string, password: string }> = req.body;
    // Check if user exists
    const resFindOne = await User.findOne({ where: { email: userCredential.email } });
    if (!resFindOne) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password',
            data: null
        });
    }

    const {created_at, updated_at, password, auth_type_id, id, last_active_at, ...user} = resFindOne.toJSON();
    // Check if password matches
    const userCheck: boolean = await bcrypt.compare(userCredential.password, password);
    
    if (!userCheck) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password',
            data: null
        });
    }

    // Create JWT token and send it in response
    // TODO: This should be moved to a separate function and should be used in other routes as well
    const token = jwt.sign({ id: id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
    
    // Send the token in cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    });

    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        data: user
    });
});
router.post('/logout', (req: Request, res: Response) => {
    const token = req.cookies.token;
    console.log(token);
    if(!token){
        res.status(401).json({
            success: false,
            message: 'No token found',
            data: null
        });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET as string);
        res.clearCookie('token');
        res.status(200).json({
            success: true,
            message: 'User logged out successfully',
            data: null
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid token',
            data: null
        });
    }
    
    res.send("Logout route");
});
router.post('/signup', async (req: Request, res: Response) => {
    const userData: Readonly<{ name: string, email: string, password: string }> = req.body;

    const hashPassword: string = await bcrypt.hash(userData.password, 13);

    const customUserData: Readonly<{ name: string, email: string, password: string, auth_type_id: number }> = {
        ...userData,
        password: hashPassword,
        auth_type_id: 1
    }
    try {
        const isExist = await User.findOne({ where: { email: userData.email } });
        if(!isExist){
            const createdUser = await User.create(customUserData);
            const {
                password,
                auth_type_id,
                updated_at,
                ...userResponse
            } = createdUser.toJSON();
            res.status(200).json({
                success: true,
                message: 'User created successfully',
                data: userResponse
            });
        }else{
            res.status(409).json({
                success: false,
                message: 'User already exists',
                data: null
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create user',
            data: error
        });
    }
});
router.post('/forgot-password', (req: Request, res: Response) => {
    res.send("Send mail/OTP. Forgot password route");
});
router.post('/reset-password', (req: Request, res: Response) => {
    res.send("reset password route");
});
router.get('/me', authUser, async (req: Request, res: Response) => {
    try {
        const apiRes = await User.findOne({ where: { id: req.user?.id } });
        const { password, auth_type_id, updated_at, ...userResponse } = apiRes?.toJSON() || {};
        res.status(200).json({
            success: true,
            message: 'User fetched successfully',
            data: userResponse
        });  
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user',
            data: error
        })
    }
});

export default router;