const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    res.send("Login route");
});
router.post('/logout', (req, res) => {
    res.send("Logout route");
});
router.post('/signup', (req, res) => {
    res.send("Create account route");
});
router.post('/forgot-password', (req, res) => {
    res.send("Send mail/OTP. Forgot password route");
});
router.post('/reset-password', (req, res) => {
    res.send("reset password route");
});
router.get('/me', (req, res) => {
    res.send("Get Current User Profile route");
});

module.exports = router;