import express from 'express';
import { getDb } from './provider/db.provider';
import collectionRouter from './router/collection.route';
import basicAuthCheck from './middleware/auth.middleware';
import catchError from './middleware/error.middleware';

const app = express();

app.use(express.json());
app.use(basicAuthCheck)

// All Controllers go here
app.use('/collections',collectionRouter)


app.use(catchError)

app.get('/', async (req, res) => {
  // const vectordb = await getVectorStore()

  // const document1: Document = {
  //   pageContent: "The powerhouse of the cell is the mitochondria",
  //   metadata: { source: "https://example.com" },
  // };

  // const document2: Document = {
  //   pageContent: "Buildings are made out of brick",
  //   metadata: { source: "https://example.com" },
  // };

  // const document3: Document = {
  //   pageContent: "Mitochondria are made out of lipids",
  //   metadata: { source: "https://example.com" },
  // };

  // const document4: Document = {
  //   pageContent: "The 2024 Olympics are in Paris",
  //   metadata: { source: "https://example.com" },
  // };

  // const documents = [document1,document2, document3, document4];
  // var result = await vectordb.addDocuments(documents, { ids: ["1","2","3","4"] });
  // console.log('Adding documents to vector store...',result);


  // var test = await Collection.insertOne({
  //   name: 'Test Collection',
  //   description: 'This is a test collection',
  //   embedding_model: 'text-embedding-3-small',
  //   chunk_size: 1000,
  //   chunk_overlap: 100
  // })

  
  res.send('Hello, World!');
});


async function startServer() {

  // Initialize the database connection
  const db = await getDb();
  if (!db) {
    throw new Error('Failed to connect to the database');
  }

  // start the Express server
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}




startServer();