const { Chroma } = require("langchain/vectorstores/chroma");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { TextLoader } =  require("langchain/document_loaders/fs/text");

async function loadDocs() {
  // Create docs with a loader
  const loader = new TextLoader("src/document_loaders/example_data/example.txt");
  const docs = await loader.load();

  // Create vector store and index the docs
  const vectorStore = await Chroma.fromDocuments(docs, new OpenAIEmbeddings(), {
    collectionName: "a-test-collection",
    url: "http://localhost:8000", // Optional, will default to this value
    collectionMetadata: {
      "hnsw:space": "cosine",
    }, // Optional, can be used to specify the distance method of the embedding space https://docs.trychroma.com/usage-guide#changing-the-distance-function
  });

  // Search for the most similar document
  const response = await vectorStore.similaritySearch("hello", 1);

  console.log(response);
}

