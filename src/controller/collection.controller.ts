import Collection from "../model/collection.model";
import { collectionValidationSchema } from "../model/collection.model";
import { getVectorStore } from "../provider/langchain.provider";


async function getCollections (limit: number = 10, offset: number = 0, id: string | null = null) {
    if(!id){
        var payload = {}
        const collectionData = await Collection.find({}).limit(limit).skip(offset).exec();
        const totalCollectionsCount = await Collection.countDocuments({}).exec();
   
        payload = { collections: collectionData, total: totalCollectionsCount }
        return payload;
    }else{
        const collection = await Collection.findById(id).exec();
        if (!collection) {
            return null;
        }
        return collection;
    }
}

async function createCollection(data:typeof collectionValidationSchema._type) {
    const collection = new Collection(data);
    await collection.save();
    
    const vectorStore = await getVectorStore(data.name,data.embedding_model);
    console.log('Vector store initialized for collection:',vectorStore.collectionName);

    return collection;
}



export {getCollections,createCollection};