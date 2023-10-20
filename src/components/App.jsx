import React, {useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3030/items",
  withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',   
      }

})
function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
   
    const fetchNotes = async () => {
      try {
        // Make a GET request to the server
        const res = await axios.get("http://localhost:3030/items");
        console.log(res);
        setItems(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchNotes();
  }, []);

  function addNote(newNote) {
    try {
      client.post('', newNote)
    } catch(e) {
      console.log(e)
    }
    setItems(prevItems => {
      return [...prevItems, newNote];
    });
  }

 function deleteNote(id) {
    client.delete(`/${id}`)
    .then((res) => alert(res.data.message))
    setItems(prevNotes => {
      return prevNotes.filter((noteItem) => {
        return noteItem._id !== id;
      });
    });
  } 
 

  return (
    <div>
      <Header />
      <CreateArea 
        onAdd={addNote}  
      />
      {items.map((noteItem) => (
      <Note key={noteItem._id} id = {noteItem._id} title={noteItem.title} content={noteItem.content}  onDelete={deleteNote}/> ))}
      <Footer />
    </div>
  );
}

export default App;
