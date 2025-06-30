import { Router, Request, Response } from 'express';
import { Task } from '../models/task.model';
import { mockTasks } from '../repository/tasks';
import { HttpStatusCodes } from '../utils/HttpStatusCode';

const router = Router();

router.get('/', async(req: Request, res: Response): Promise <void> => {
    if (mockTasks.length === 0) {
        res.status(HttpStatusCodes.NOT_FOUND).json({errors: 'NENHUMA TAREFA CADASTRADA'});
        return ;
    }
    res.status(HttpStatusCodes.OK).json(mockTasks);
})

router.get('/:id', async(req: Request, res: Response): Promise<void> => {
    
})