import logo from './logo.svg';
import './App.css';
import { ChromaClient } from 'chromadb';
import { OpenAIEmbeddingFunction } from 'chromadb'
import React, {useState, useEffect} from 'react';
import {Document, Page} from 'react-pdf';
//import Langchain from 'langchain';

function App() {
  const [collection, setCollection] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      // TODO: Per risolvere gli errori quando "carico" il file pdf, bisogna sostituire "http://your-backend-server.com/upload" con l'URL del server backend (riga 65 di questo file).
      // TODO: Togliere i commenti al codice direttamente qui sotto solo quando è stato risolto il TODO qui sopra.
      
      /*
      const client = new ChromaClient();
      const embedder = new OpenAIEmbeddingFunction({
        // TODO: Replace "....." with your actual OpenAI API key
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

      setCollection(collection);
      setResults(results);
      */
    };

    fetchData();
  }, []);

  const PDFInput = () => {
    const [file, setFile] = useState(null); // state to store the PDF file
    const [numPages, setNumPages] = useState(null); // state to store the number of pages in the PDF file
  
    // function to handle file input change
    const onFileChange = (event) => {
      const { files } = event.target;
      if (files && files.length > 0) {
        setFile(files[0]); // store the selected file in the state

        // create a new FormData instance
        let data = new FormData();

        // append the file to the FormData instance
        data.append('file', files[0]);

        // send a POST request to the backend server with the file
        // TODO: Replace "http://your-backend-server.com/upload" with your actual backend server URL
        fetch('http://your-backend-server.com/upload', {
          method: 'POST',
          body: data
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });   
      }
    };
  
    // function to handle document load success
    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages); // store the number of pages in the state
    };
  
    return (
      <div>
        <h1>PDF Input Component</h1>
        <input type="file" accept="application/pdf" onChange={onFileChange} /> {/* file input element */}
        {file && ( // if file is not null, render the document
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => ( // loop through the number of pages and render each page
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <PDFInput />
      </header>
    </div>
  );
}

export default App;