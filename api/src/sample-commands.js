// Create a new note
fetch('http://localhost:3000/notes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Test Note',
    body: 'This is a test note.',
  }),
})
.then(response => response.json())
.then(data => console.log(data))
.catch((error) => console.error('Error:', error));

// Lists all notes
fetch('http://localhost:3000/notes')
.then(response => response.json())
.then(data => console.log(data))
.catch((error) => console.error('Error:', error));

// Lists a single note
fetch('http://localhost:3000/notes/note-id')
.then(response => response.json())
.then(data => console.log(data))
.catch((error) => console.error('Error:', error));

// Updates a note
fetch('http://localhost:3000/notes/note-id', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Updated Note',
    body: 'This is an updated note.',
  }),
})
.then(response => response.json())
.then(data => console.log(data))
.catch((error) => console.error('Error:', error));

// Deletes a note
fetch('http://localhost:3000/notes/note-id', {
  method: 'DELETE',
})
.then(response => response.json())
.then(data => console.log(data))
.catch((error) => console.error('Error:', error));

