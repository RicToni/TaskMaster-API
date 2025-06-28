import { Router, Request, Response } from 'express';
import { HttpStatusCodes } from '../utils/HttpStatusCode';
import { User } from '../models/user';
import { mockUsers } from '../repository/users';
import { createUserSchema } from '../utils/Schemas/createUserSchema';
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

router.put('/:id', (req: Request, res: Response) => {

    res.sendStatus(HttpStatusCodes.OK);
})

router.delete('/:id', (req: Request, res: Response) => {

    res.sendStatus(HttpStatusCodes.OK);
})



export default router;