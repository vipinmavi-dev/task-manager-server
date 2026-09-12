import express, {type Request, type Response, type Router} from 'express';
const router: Router = express.Router();
import User from '../models/Users.model.js';
import bcrypt from 'bcrypt';

router.post('/login', async (req: Request, res: Response)  => {
    res.send("Login route");
});
router.post('/logout', (req: Request, res: Response)  => {
    res.send("Logout route");
});
router.post('/signup', async (req: Request, res: Response)  => {
    const userData = req.body;

    const hashPassword = await bcrypt.hash(userData.password, 13);

    const customizeUserData: Readonly<typeof userData> = {
        ...userData,
        password: hashPassword,
        auth_type_id: 1
    }
    try {
        const createdUser = await User.create(customizeUserData);
        const {
            password,
            auth_type_id,
            updated_at,
            ...userResponse
        } = createdUser.toJSON();
        res.status(200).json({
            success: true,
            message: 'User created successfully',
            data : userResponse
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Failed to create user', 
            data: error });
    }
});
router.post('/forgot-password', (req: Request, res: Response)  => {
    res.send("Send mail/OTP. Forgot password route");
});
router.post('/reset-password', (req: Request, res: Response)  => {
    res.send("reset password route");
});
router.get('/me', (req: Request, res: Response)  => {
    res.send("Get Current User Profile route");
});

export default router;