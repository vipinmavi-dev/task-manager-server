const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("All task fetch route");
});
router.post('/', (req, res) => {
    res.send("Add task route");
});  
router.put('/:id', (req, res) => {
    res.send("Update task route");
});
router.delete('/:id', (req, res) => {
    res.send("Delete task route");
});

module.exports = router;