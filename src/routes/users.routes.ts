import { Router, Request, Response } from 'express';
import { HttpStatusCodes } from '../utils/HttpStatusCode';
import { User } from '../models/user';
import { mockUsers } from '../repository/users';
import { createUserSchema } from '../utils/Schemas/createUserSchema';
import { updateUserSchema } from '../utils/Schemas/updateUserSchema';
import { validationResult } from 'express-validator';

const router = Router();

///////////// CONVERTER TODOS OS .send PARA .json ////////////////
router.get('/',async (req: Request, res: Response): Promise<void> => {
    if (mockUsers.length === 0){
        res.status(HttpStatusCodes.NOT_FOUND).json({errors: 'NÃO HÁ USUÁRIOS CADASTRADOS'})
        return;
    }
    res.status(HttpStatusCodes.OK).json(mockUsers);    
})

router.get('/:id', async (req: Request<{ id: string }, {}, {}>, res: Response): Promise<void> => {
    const { id } = req.params;
    const parseId = parseInt(id);
    if (isNaN(parseId)) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({errors: 'ID INVÁLIDO'})
        return;
    }

    const user = mockUsers.find(user => user.id === parseId);
    if (!user){
        res.status(HttpStatusCodes.NOT_FOUND).json({error: 'Usuário não encontrado!'})
        return;
    }

    res.status(HttpStatusCodes.OK).json(user);
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

router.delete('/:id', async(req: Request<{ id: string }>, res: Response): Promise<void> => {
    const { id } = req.params;
    const parseId = parseInt(id);
    if (isNaN(parseId)) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({errors: "ID INVÁLIDO"});
        return
    }

    const index = mockUsers.findIndex((user) => user.id === parseId);
    if (index === -1){
        res.status(HttpStatusCodes.NOT_FOUND).json({errors: "Usuário não encontrado!"});
        return;
    }

    mockUsers.splice(index, 1);
    res.status(HttpStatusCodes.OK).json({msg: 'Usuário excluido com sucesso'});
})



export default router;