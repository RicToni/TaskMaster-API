import { Router, Request, Response } from 'express';
import { HttpStatusCodes } from '../utils/HttpStatusCode';
import { User } from '../models/user';
import { mockUsers } from '../repository/users';
import { createUserSchema } from '../utils/Schemas/createUserSchema';
import { updateUserSchema } from '../utils/Schemas/updateUserSchema';
import { validationResult } from 'express-validator';

const router = Router();


router.get('/', (req: Request, res: Response) => {

    res.sendStatus(HttpStatusCodes.OK);
})

router.post('/', createUserSchema, async (req: Request<{}, {}, User>, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({errors: errors.array() })
        return;
    }

    const { name , email, passwordHash } = req.body;
    const newUser:User = {
        id: mockUsers.length + 1,
        name, 
        email, 
        passwordHash, 
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    mockUsers.push(newUser);
    res.status(HttpStatusCodes.CREATED).json(newUser);
})

router.put('/:id', updateUserSchema, async (req: Request<{ id: string}, {}, Partial<User>>, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({errors: errors.array() })
        return;
    }

    const { name, email, passwordHash } = req.body;
    const { id } = req.params;

    const parseId = parseInt(id, 10);
    if (isNaN(parseId)){
        res.status(HttpStatusCodes.BAD_REQUEST).json({error: 'ID INVÁLIDO'})
        return;
    }

    const userIndex = mockUsers.findIndex(user => user.id === parseId);
    if (userIndex === -1){
        res.send(HttpStatusCodes.NOT_FOUND).json({error: 'Usuário não encontrado.'})
        return;
    }
    
    if (name) mockUsers[userIndex].name = name;
    if (email) mockUsers[userIndex].email = email;
    if (passwordHash) mockUsers[userIndex].passwordHash = passwordHash;
    mockUsers[userIndex].updatedAt = new Date();

    res.status(HttpStatusCodes.OK).json(mockUsers[userIndex]);
})

router.delete('/:id', (req: Request, res: Response) => {

    res.sendStatus(HttpStatusCodes.OK);
})



export default router;