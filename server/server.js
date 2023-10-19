import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import _ from "lodash";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3030;
app.set('view engine', 'ejs');

app.use(bodyParser.json())
app.use(express.static("../public"));
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true}).then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
  
  const noteSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, 'Please enter a title. No title specified.']
      },
      content: {
        type: String,
        required: [true, 'Please enter some content in the note.']
      }
    }
);

const Note = mongoose.model("Note", noteSchema);

app.get("/", (req, res) => {
  return res.status(200);
});

app.get("/items", async (req, res) => {
  try {
      const recievedNotes = await Note.find({});
      return res.json({
          data: recievedNotes
      });
  } catch (err) {
      console.log(err);
  }
});

app.post("/items", (req, res) => {
    const newNote = new Note ({
        title: req.body.title,
        content: req.body.content
    })
    newNote.save();
    return res.json(newNote);
    
    });

app.delete("/items/:id", async (req, res) => {
  try {
      //const { id } = req.params.id;
      await Note.findByIdAndDelete({_id: req.params.id});
    
  } catch (err) {
      console.log(err);
  }
  
}); 

app.listen(PORT, ()=>{
  console.log(`server is listening at ${PORT}`);
});
