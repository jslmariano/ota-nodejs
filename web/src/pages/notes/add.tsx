import { Note } from "@/lib/types";
import { useState } from "react";
import Layout from "@/components/layout";
import { Button, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import { createNote } from "@/api/notes";

function Detail() {
  const router = useRouter();
  const [note, setNote] = useState<Note>({
    id: "",
    title: "",
    body: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      await createNote(note.title, note.body);
      router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-body-tertiary p-5 rounded d-flex flex-column gap-5">
        <h2>New Note</h2>
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
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
      </div>
      <div className="action-buttons d-flex gap-2">
        <Button
          variant="secondary"
          onClick={() => router.push("/")}
          disabled={loading}
        >
          Back
        </Button>
        <Button
          variant="success"
          onClick={() => handleSave()}
          disabled={loading}
        >
          Save
        </Button>
      </div>
    </Layout>
  );
}

export default Detail;
