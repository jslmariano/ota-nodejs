#Objective Develop a simple backend for a note-taking application using TypeScript, Node.js, and Express (or similar framework e.g. fastify, koa, etc.).

Project Description Create a RESTful API that allows users to create, retrieve, update, and delete notes. Each note can consist of a title and a body.

Specific Requirements

1. API Endpoints:
 * POST /notes: Create a new note.
 * GET /notes: Retrieve all notes.
 * GET /notes/:id: Retrieve a specific note by ID.
 * PUT /notes/:id: Update a specific note.
 * DELETE /notes/:id: Delete a specific note.

Data Storage: Use an in-memory array or a simple file-based solution to store notes.
Data Validation: Validate input data for creating and updating notes.
Error Handling: Basic error handling for common scenarios (e.g., note not found).
