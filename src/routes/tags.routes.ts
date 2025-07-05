import { Router, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createTagSchema } from '../utils/Schemas/createTagSchema';
import { Tag } from '../models/tags.model';
import { mockTags } from '../repository/tags';
import {HttpStatusCodes} from '../utils/HttpStatusCode';

const router = Router();

router.post('./', createTagSchema,  async (req: Request<{}, {}, Tag>, res: Response): Promise<void>  => {
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

