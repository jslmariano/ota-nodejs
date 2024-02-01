import axios from "axios";
import { Note } from "@/lib/types";

const client = axios.create({
  baseURL: "http://localhost:3000/",
});

export async function getNotes(): Promise<Note[]> {
  const response = await client.get<Note[]>("/notes");
  return response.data;
}

export async function getNoteById(id: string): Promise<Note> {
  const response = await client.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(title: string, body: string): Promise<Note> {
  const response = await client.post<Note>("/notes", { title, body });
  return response.data;
}

export async function updateNote(note: Note): Promise<Note> {
  const response = await client.put<Note>(`/notes/${note.id}`, {
    title: note?.title,
    body: note?.body,
  });
  return response.data;
}

export async function deleteNoteById(id: string): Promise<Note> {
  const response = await client.delete<Note>(`/notes/${id}`);
  return response.data;
}
