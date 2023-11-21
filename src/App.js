import logo from './logo.svg';
import './App.css';
import { ChromaClient } from 'chromadb';
import { OpenAIEmbeddingFunction } from 'chromadb'

async function App() {
  const client = new ChromaClient();
  const embedder = new OpenAIEmbeddingFunction({
    openai_api_key: ".....",
  });
  const collection = await client.createCollection({
    name: "my_collection",
    embeddingFunction: embedder,
  });
  await collection.add({
  ids: ["id1", "id2"],
  metadatas: [{ source: "my_source" }, { source: "my_source" }],
  documents: ["This is a document", "This is another document"],
  });
  const results = await collection.query({
  nResults: 2,
  queryTexts: ["This is a query document"],
  });
  /*return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p>{`Hello ${process.env.REACT_APP_NAME}`}</p>
          <p>{`Hello ${process.env.REACT_APP_PROVA}`}</p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
  );*/
}

export default App;
