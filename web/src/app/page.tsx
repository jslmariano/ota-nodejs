import React from "react";

import Table from "@/parts/notes-table";
import Layout from "@/components/layout";
import { Button } from "react-bootstrap";

function Home() {
  return (
    <>
      <Layout>
        <div className="bg-body-tertiary p-5 rounded">
          <h1>NOTES</h1>
          <p className="lead">
            A simple node application to present CRUD of notes
          </p>
        </div>
        <div className="bg-body-tertiary p-5 rounded d-flex flex-column gap-3">
          <h2>Notes</h2>
          <Button variant="primary" size="lg" href="/notes/add">
            Add Note
          </Button>
          <Table />
        </div>
      </Layout>
    </>
  );
}

export default Home;
