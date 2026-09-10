import express, 
{ type Request, type Response, type NextFunction} from 'express';
const router = express.Router();

router.get('/', (req: Request, res, Response) => {
    res.send("All task fetch route");
});
router.post('/', (req: Request, res, Response) => {
    res.send("Add task route");
});  
router.put('/:id', (req: Request, res, Response) => {
    res.send("Update task route");
});
router.delete('/:id', (req: Request, res, Response) => {
    res.send("Delete task route");
});

export default router;