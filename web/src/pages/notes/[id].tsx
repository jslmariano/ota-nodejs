import { getNoteById, updateNote } from "@/api/notes";
import { Note } from "@/lib/types";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { Button, Form as BForm } from "react-bootstrap";

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(30, "Title must be less than 30 characters")
    .required("Title is required"),
  body: Yup.string().required("Body is required"),
});

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

  const handleSave = async (note: Note) => {
    try {
      setLoading(true);
      await updateNote(note);
      toast.success("Note updated successfully!", {
        autoClose: 2000,
        onClose: () => {
          router.push("/");
        },
      });
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data?.error);
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  return (
    <Layout>
      <Formik
        enableReinitialize
        initialValues={note || { title: "", body: "", id: "" }}
        validationSchema={NoteFormSchema}
        onSubmit={handleSave}
      >
        {formik => (
          <>
            <div className="bg-body-tertiary p-5 rounded d-flex flex-column gap-5">
              <h2>Note [ {note?.id} ]</h2>
              <fieldset disabled={!isEditing}>
                <Form>
                  <BForm.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <BForm.Label>Title</BForm.Label>
                    <Field
                      required
                      className={`form-control ${
                        formik.errors.title ? "is-invalid" : ""
                      }`}
                      type="text"
                      name="title"
                      placeholder="title"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-danger"
                    />
                  </BForm.Group>
                  <BForm.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <BForm.Label>Body</BForm.Label>
                    <Field
                      required
                      className={`form-control ${
                        formik.errors.body ? "is-invalid" : ""
                      }`}
                      as="textarea"
                      name="body"
                      placeholder="body"
                    />
                    <ErrorMessage
                      name="body"
                      component="div"
                      className="text-danger"
                    />
                  </BForm.Group>
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
                  <Button
                    variant="warning"
                    onClick={() => {
                      setIsEditing(false);
                      formik.resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="success"
                    type="reset"
                    onClick={() => formik.handleSubmit()}
                  >
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
          </>
        )}
      </Formik>
    </Layout>
  );
}

export default Detail;
