import { Chroma } from '@langchain/community/vectorstores/chroma'
import { ChromaClient } from 'chromadb'
import { OpenAIEmbeddings } from '@langchain/openai'


var vectorstore: Chroma | null = null;

export async function getVectorStore(collectionName: string = 'defaultCollection',embedding_model: string = 'text-embedding-3-small') {

    // If the vectorstore is already initialized, return it
    if (vectorstore) {
        return vectorstore
    }

    // Import the OpenAIEmbeddings
    const embeddings = new OpenAIEmbeddings({
        model: embedding_model,
        openAIApiKey: process.env.openAiKey,
    })

    // Initialize the Chroma vector store with the embeddings and configuration
    const chromaClient = new ChromaClient({
        host: process.env.chromaDbHost,
    })

    vectorstore = new Chroma(embeddings, {
        clientParams: chromaClient,
        collectionName: collectionName,
        
    })
    return vectorstore
}