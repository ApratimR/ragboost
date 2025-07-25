import { Router } from "express";
import { createCollection, getCollections } from "../controller/collection.controller";
import { collectionValidationSchema } from "../model/collection.model";


const collectionRouter = Router();

// Route to get collections
collectionRouter.get('/', async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
    const id = req.query.id ? req.query.id as string : null;

    const data = await getCollections(limit, offset, id);

    res.json(data);
});

// Route to create a new collection
collectionRouter.post('/', async (req, res) => {
    let request = collectionValidationSchema.parse(req.body);
    console.log('Request to create collection:', request);
    const data = await createCollection(request);
    return res.status(201).json(data);
})


export default collectionRouter