import { getNoteById, updateNote } from "@/api/notes";
import { Note } from "@/lib/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { Button, Form } from "react-bootstrap";

function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const [note, setNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const loadNote = async (id: string) => {
    const note = await getNoteById(id);
    setNote(note);
  };

  useEffect(() => {
    if (id) {
      loadNote(id as string);
    }
  }, [id]);

  const handleSave = async () => {
    try {
      setLoading(true);
      if (note) {
        await updateNote(note);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  return (
    <Layout>
      <div className="bg-body-tertiary p-5 rounded d-flex flex-column gap-5">
        <h2>Note [ {note?.id} ]</h2>
        <fieldset disabled={!isEditing}>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="email"
                placeholder="title"
                value={note?.title}
                onChange={(e: any) => {
                  if (note) {
                    setNote({
                      ...note,
                      title: e.target.value,
                    });
                  }
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={note?.body}
                onChange={(e: any) => {
                  if (note) {
                    setNote({
                      ...note,
                      body: e.target.value,
                    });
                  }
                }}
              />
            </Form.Group>
          </Form>
        </fieldset>
      </div>
      <div className="action-buttons d-flex gap-2">
        {!isEditing && (
          <Button variant="secondary" onClick={() => router.push("/")}>
            Back
          </Button>
        )}
        {isEditing && (
          <>
            <Button variant="warning" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button variant="success" onClick={() => handleSave()}>
              Save
            </Button>
          </>
        )}
        {!isEditing && (
          <Button variant="primary" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
      </div>
    </Layout>
  );
}

export default Detail;
