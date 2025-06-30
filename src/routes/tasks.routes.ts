import { Router, Request, Response } from 'express';
import { Task } from '../models/task.model';
import { mockTasks } from '../repository/tasks';
import { HttpStatusCodes } from '../utils/HttpStatusCode';
import { createTaskSchema } from '../utils/Schemas/createTaskSchema';
import { validationResult } from 'express-validator';
import { mockUsers } from '../repository/users';

const router = Router();

router.get('/', async(req: Request, res: Response): Promise <void> => {
    if (mockTasks.length === 0) {
        res.status(HttpStatusCodes.NOT_FOUND).json({errors: 'NENHUMA TAREFA CADASTRADA'});
        return ;
    }
    res.status(HttpStatusCodes.OK).json(mockTasks);
})

router.get('/:id', async(req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const parseId = parseInt(id);
    if (isNaN(parseId)) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({errors: 'ID INVÁLIDO'});
        return
    }

    const task = mockTasks.find((task) => task.id === parseId);
    if (!task) {
        res.status(HttpStatusCodes.NOT_FOUND).json({error: 'Tarefa não encontrada a partir do ID informado.'})
        return ; 
    }

    res.status(HttpStatusCodes.OK).json(task);
})

router.post('/', createTaskSchema, async (req:Request<{}, {}, Task>, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.status(HttpStatusCodes.BAD_REQUEST).json({errors: errors.array()})
        return ;
    }
    
    const {
        title,
        description = '',
        completed = false,
        userId,
        tagIds = []
      } = req.body;

    const newTask:Task = {
        id: mockTasks.length + 1,
        title,
        description,
        completed,
        userId,
        tagIds,
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    mockTasks.push(newTask);
    res.status(HttpStatusCodes.CREATED).json(newTask);
})