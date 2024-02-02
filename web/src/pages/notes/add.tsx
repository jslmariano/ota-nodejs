import { Note } from "@/lib/types";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Layout from "@/components/layout";
import { Button, Form as BForm } from "react-bootstrap";
import { useRouter } from "next/router";
import { createNote } from "@/api/notes";

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(30, "Title must be less than 30 characters")
    .required("Title is required"),
  body: Yup.string().required("Body is required"),
});

function Detail() {
  const router = useRouter();
  const initialValues = {
    title: "",
    body: "",
  };
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (note: Partial<Note>) => {
    toast.dismiss();
    try {
      setLoading(true);
      await createNote(note?.title, note?.body);
      toast.success("Note created successfully!", {
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
    }
  };

  return (
    <Layout>
      <Formik
        initialValues={initialValues}
        validationSchema={NoteFormSchema}
        onSubmit={handleSubmit}
      >
        {formik => (
          <>
            <div className="bg-body-tertiary p-5 rounded d-flex flex-column gap-5">
              <h2>New Note</h2>
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
                type="submit"
                disabled={loading}
                onClick={() => formik.handleSubmit()}
              >
                Save
              </Button>
            </div>
          </>
        )}
      </Formik>
    </Layout>
  );
}

export default Detail;
