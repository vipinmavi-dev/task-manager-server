import express, {type Request, type Response, type Router} from 'express';
const router: Router = express.Router();
import mysqlPool from '../configs/mysql.config.js';

router.post('/login', async (req: Request, res: Response)  => {
    res.send("Login route");
});
router.post('/logout', (req: Request, res: Response)  => {
    res.send("Logout route");
});
router.post('/signup', (req: Request, res: Response)  => {
    res.send("Create account route");
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