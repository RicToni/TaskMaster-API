import { Router, Request, Response } from 'express';
import { Task } from '../models/task.model';
import { mockTasks } from '../repository/tasks';
import { HttpStatusCodes } from '../utils/HttpStatusCode';
import { createTaskSchema } from '../utils/Schemas/createTaskSchema';
import { validationResult } from 'express-validator';
import { mockUsers } from '../repository/users';
import { updateTaskSchema } from '../utils/Schemas/updateTaskSchema';

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

router.put('/:id', updateTaskSchema, async (req: Request<{ id: string}, {}, Partial<Task>>, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({errors: errors.array()})
        return
    }

    const { id } = req.params;
    const {
        title,
        description,
        completed,
        userId,
        tagIds
    } = req.body;

    const parseId = parseInt(id, 10);
    if (isNaN(parseId)){
        res.status(HttpStatusCodes.BAD_REQUEST).json({errors: 'ID INVÁVLIDO'})
        return;
    }

    const taskIndex = mockTasks.findIndex(task => task.id === parseId);
    if (taskIndex === -1){
        res.status(HttpStatusCodes.NOT_FOUND).json({errors: 'Tarefa não encontrada com base no ID informado'})
        return;
    }

    if (title) mockTasks[taskIndex].title = title;
    if (typeof description === 'boolean') mockTasks[taskIndex].description = description;
    if (completed) mockTasks[taskIndex].completed = completed;
    if (userId) mockTasks[taskIndex].userId = userId;
    if (tagIds) mockTasks[taskIndex].tagIds = tagIds;
    mockTasks[taskIndex].updatedAt = new Date();

    res.status(HttpStatusCodes.OK).json(mockTasks[taskIndex]);

})