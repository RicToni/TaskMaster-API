import { Router, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createTagSchema } from '../utils/Schemas/createTagSchema';
import { updateTagSchema } from '../utils/Schemas/updateTagSchema';
import { Tag } from '../models/tags.model';
import { mockTags } from '../repository/tags';
import { HttpStatusCodes } from '../utils/HttpStatusCode';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> =>{
    if (mockTags.length === 0){
        res.status(HttpStatusCodes.NOT_FOUND).json({errors: 'Nenhuma Tag cadastrada'});
        return;
    }

    res.status(HttpStatusCodes.OK).json(mockTags);
})

router.get('/:id', async (req: Request< { id: string }, {}, {}>, res: Response): Promise<void> => {

})


router.post('/', createTagSchema,  async (req: Request<{}, {}, Tag>, res: Response): Promise<void>  => {
    const errors = validationResult(req);
    if (!errors.isEmpty){
        res.status(HttpStatusCodes.BAD_REQUEST).json({errors: errors.array()});
        return;
    }
    const {name, priority} = req.body;

    const newTag: Tag = {
        id: mockTags.length + 1,
        name, 
        priority, 
        createdAt : new Date(),
        updatedAt : new Date(),
    };

    mockTags.push(newTag);

    res.status(HttpStatusCodes.CREATED).json(newTag);
})

router.put('/:id', updateTagSchema, async (req: Request< {id: string}, {}, Partial<Tag>>, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty){
        res.status(HttpStatusCodes.BAD_REQUEST).json({errors: errors.array()});
        return;
    }

    const {id} = req.params;
    const { name, priority } = req.body;

    const parseId = parseInt(id);
    if (isNaN(parseId)) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({errors: 'ID INVÁLIDO'});
        return;
    }

    const tagIndex = mockTags.findIndex(tag => tag.id === parseId);
    if (tagIndex === -1){
        res.status(HttpStatusCodes.NOT_FOUND).json({errors: 'ID NÃO ENCONTRADO'});
        return;
    }

    if (name) mockTags[tagIndex].name = name;
    if (priority) mockTags[tagIndex].priority = priority;
    mockTags[tagIndex].updatedAt = new Date();

    res.status(HttpStatusCodes.OK).json(mockTags[tagIndex]);
})

export default router;
