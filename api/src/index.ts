import express from "express";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import cors from "cors";

import { Note } from "./types";
import schemas from "./schemas";
import middleware from "./middleware";

let notes: Note[] = [];

const dataPath = path.resolve(__dirname, "notes.json");
if (fs.existsSync(dataPath)) {
  const data = fs.readFileSync(dataPath, "utf-8");
  notes = JSON.parse(data);
}

const saveNotes = () => {
  fs.writeFileSync(dataPath, JSON.stringify(notes));
};

const handleGetNotes = (req: any, res: any) => {
  res.json(notes);
};

const handleGetNote = (req: any, res: any) => {
  const note = notes.find((n) => n.id === req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
};

const handleCreateNote = (req: any, res: any) => {
  const note: Note = {
    id: uuidv4(),
    title: req.body.title,
    body: req.body.body,
  };

  notes.push(note);
  saveNotes();
  res.status(201).json(note);
};

const handleUpdateNote = (req: any, res: any) => {
  const index = notes.findIndex((n) => n.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ message: "Note not found" });
  } else {
    notes[index] = { ...notes[index], ...req.body };
    saveNotes();
    res.json(notes[index]);
  }
};

const handleDeleteNote = (req: any, res: any) => {
  const index = notes.findIndex((n) => n.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ message: "Note not found" });
  } else {
    const deletedNote = notes.splice(index, 1);
    saveNotes();
    res.json(deletedNote[0]);
  }
};

const app = express();
app.use(cors());
app.use(express.json());

app.post("/notes", middleware(schemas.notePOST, "body"), handleCreateNote);
app.get("/notes", handleGetNotes);
app.get("/notes/:id", middleware(schemas.noteDETAILS, "params"), handleGetNote);
app.put(
  "/notes/:id",
  middleware(schemas.noteDETAILS, "params"),
  middleware(schemas.noteUPDATE, "body"),
  handleUpdateNote
);
app.delete(
  "/notes/:id",
  middleware(schemas.noteDETAILS, "params"),
  handleDeleteNote
);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
