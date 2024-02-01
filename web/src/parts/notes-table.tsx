"use client";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Note } from "@/lib/types";
import { useEffect, useState } from "react";
import { deleteNoteById, getNotes } from "@/api/notes";
import { useRouter } from "next/navigation";

function NotesTable() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNotes = async () => {
    const notes = await getNotes();
    setNotes(notes ?? []);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleUpdate = (note: Note) => {
    router.push(`/notes/${note.id}`);
  };

  const handleDelete = async (note: Note) => {
    try {
      setLoading(true);
      await deleteNoteById(note.id);
      await fetchNotes();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th className="shrink-column">Action</th>
        </tr>
      </thead>
      <tbody>
        {notes.map(note => (
          <tr key={note.id}>
            <td>{note.id}</td>
            <td>{note.title}</td>
            <td>
              <div className="d-flex flex-row gap-2">
                <Button
                  variant="primary"
                  size="lg"
                  disabled={loading}
                  onClick={() => {
                    handleUpdate(note);
                  }}
                >
                  <FontAwesomeIcon size="lg" icon={faPencil} />
                </Button>
                <Button
                  variant="danger"
                  size="lg"
                  disabled={loading}
                  onClick={() => {
                    handleDelete(note);
                  }}
                >
                  <FontAwesomeIcon size="lg" icon={faTrash} />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default NotesTable;
