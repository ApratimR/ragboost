import { mongo } from "mongoose";
import Collection from "../model/collection.model";
import { collectionValidationSchema } from "../model/collection.model";
import { getVectorStore } from "../provider/langchain.provider";
import { BaseError } from "../errors/base.error";
import Document from "../model/document.model";


export async function getCollections (limit: number = 10, offset: number = 0, id: string | null = null) {
    if(!id){
        var payload = {}
        const collectionData = await Collection.find({is_deleted:false}).limit(limit).skip(offset).exec();
        const totalCollectionsCount = await Collection.countDocuments({is_deleted:false}).exec();
   
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

export async function createCollection(data:typeof collectionValidationSchema._type) {
    try {
        const collection = new Collection(data);
        await collection.save();
        
        const vectorStore = await getVectorStore(data.name,data.embedding_model);
        console.log('Vector store initialized for collection:',vectorStore.collectionName);

        return collection;
    } catch (error) {

        if (error instanceof mongo.MongoServerError && error?.code===11000){
            throw new BaseError("Duplicate Collection Name Found",409);
        }
        
        throw error
    }

}

export async function deleteCollection(id: string) {
    // maybe soft delete in future
    // maybe hard delete would be much better
    const collection = await Collection.findByIdAndUpdate(id,{is_deleted:true}).exec();
    const document = await Document.updateMany({collection_id:id,is_deleted:false},{is_deleted:true}).exec();
    if (!collection) {
        return null
    }
    return collection;
}
