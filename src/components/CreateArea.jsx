import React, {useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
 
  const [isExpanded, expand] = useState(false);
  const [noteInfo, setNoteInfo] = useState({
    title: "",
    content: ""
  });
  
   
  function handleChange(event) {
    const { name, value } = event.target;
  setNoteInfo(prevValue => {
    return {
      ...prevValue,
      [name]: value
    };
  });
  }
  
  function onSubmit(event){
      props.onAdd(noteInfo);
      setNoteInfo({
        title: "",
        content: ""
      })
      event.preventDefault();
    
  }
  function handleClick(){
    expand(true);
  }
  return (
    <div>
      <form className="create-note" method="post">
          {isExpanded  && (
            <input onChange={handleChange} name="title" placeholder="Title" value = {noteInfo.title}/>
         )} 
        <textarea onClick={handleClick} onChange={handleChange} name="content" placeholder="Take a note..." value = {noteInfo.content} rows={isExpanded ? "3" : "1"} />
        
        <Zoom in={isExpanded}><Fab onClick={onSubmit}><AddIcon /></Fab></Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
