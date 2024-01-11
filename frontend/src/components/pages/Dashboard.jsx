import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Cookies from 'universal-cookie';
import axios from 'axios';

import './Dashboard.css';
import { useEffect, useState } from 'react';

/**
 * Dashboard Page Component
 * @returns {React.ReactHTMLElement} Returns the HTML element
 */
export default function Dashboard() {
  /* View Notes Page (Dashboard Page) */
  // Note
  const [notes, setNotes] = useState([]);
  const [noteId, setNoteId] = useState(undefined);

  // Edit Note
  const [titleEdit, setTitleEdit] = useState('');
  const [descriptionEdit, setDescriptionEdit] = useState('');

  // Add Note
  const [titleAdd, setTitleAdd] = useState('');
  const [descriptionAdd, setDescriptionAdd] = useState('');

  // Show Modals
  const [showAddNote, setShowAddNote] = useState(false);
  const [showEditNote, setShowEditNote] = useState(false);

  const handleCloseAddNote = () => {
    /* Close Add Note Modal */
    setShowAddNote(false);
    setTitleAdd('');
    setDescriptionAdd('');
  };

  const handleCloseEditNote = () => {
    /* Close Edit Note Modal */
    setShowEditNote(false);
    setTitleEdit('');
    setDescriptionEdit('');
  };

  const handleShowAddNote = () => {
    /* Show Add Note Modal */
    setShowAddNote(true);
  };

  const handleShowEditNote = (noteId) => {
    /* Show Edit Note Modal */
    // Fetch Note
    axios.get('http://localhost:8000/api/fetch-note?note_id=' + noteId,
    ).then((response) => {
      if (noteId !== undefined) {
        setTitleEdit(response.data.title);
        setDescriptionEdit(response.data.description);
      }
    }).catch((err) => {
      console.log(err);
    });

    // set note id
    setNoteId(parseInt(noteId));
    setShowEditNote(true);
  };

  /*
  Handle title and description changes
  for the edit and note forms
  */
  const handleTitleEditChange = (event) => {
    setTitleEdit(event.target.value);
  };

  const handleDescriptionEditChange = (event) => {
    setDescriptionEdit(event.target.value);
  };

  const handleTitleAddChange = (event) => {
    setTitleAdd(event.target.value);
  };

  const handleDescriptionAddChange = (event) => {
    setDescriptionAdd(event.target.value);
  };

  useEffect(() => {
    /* Fetch all the Notes for the Current User */
    const cookies = new Cookies();
    const token = cookies.get('token');
    let userId = undefined;

    if (token !== undefined) {
      axios.post('http://localhost:8000/api/get-decoded-token', {
        token: token,
      }).then((response) => {
        if (response.data.user_id !== undefined) {
          userId = response.data.user_id;
          axios.get('http://localhost:8000/api/view-notes?user_id=' + userId).then((response) => {
            setNotes(response.data.notes);
          }).catch((err) => {
            console.log(err);
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }, []);

  const handleAddSubmit = async (event) => {
    /* Add Note Submission */
    event.preventDefault();
    const cookies = new Cookies();
    const token = cookies.get('token');
    let userId = undefined;

    if (token !== undefined) {
      axios.post('http://localhost:8000/api/get-decoded-token', {
        token: token,
      }).then((response) => {
        if (response.data.user_id !== undefined) {
          userId = response.data.user_id;
          axios.post('http://localhost:8000/api/add-note', {
            title: titleAdd,
            description: descriptionAdd,
            user_id: userId,
          }).then(() => {
            window.location.href = '/dashboard';
          }).catch((err) => {
            console.log(err);
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  const handleEditSubmit = async (event) => {
    /* Edit Note Submission */
    event.preventDefault();
    axios.patch('http://localhost:8000/api/edit-note', {
      note_id: noteId,
      title: titleEdit,
      description: descriptionEdit,
    }).then(() => {
      // redirect to the dashboard page
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleDeleteNote = async (noteId) => {
    /* Delete Note Submission */
    const deleteNote = confirm('Are you sure you want to delete the note?');
    if (deleteNote === true) {
      axios.delete('http://localhost:8000/api/delete-note', {
        data: { note_id: noteId },
      }).then(() => {
        // redirect to the dashboard
        window.location.reload();
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  return (
    <>
      <h1>Notes</h1>
      <Button variant="primary" onClick={handleShowAddNote}>Add</Button>
      {notes.map((note, i) => {
        return (
          <div className="container note-entry" key={i}>
            <h2 className="note-title">{note['title']}</h2>
            <p>{note['description']}</p>
            <div className="row">
              <div className="col col-md-auto">
                <Button
                  variant="primary"
                  onClick={() => handleShowEditNote(note['id'])}>
                  Edit
                </Button>
              </div>
              <div className="col col-md-auto">
                <Button
                  variant="danger"
                  onClick={() => handleDeleteNote(note['id'])}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Add Note Modal */}
      <Modal className="modal" show={showAddNote} onHide={handleCloseAddNote}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="add_note_form" method="post" onSubmit={handleAddSubmit}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                placeholder="Title"
                value={titleAdd}
                onChange={handleTitleAddChange}
                required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control name="description" rows={3}
                as="textarea"
                placeholder="Description"
                value={descriptionAdd}
                onChange={handleDescriptionAddChange}
                required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            form="add_note_form">
            Submit
          </Button>
          <Button
            variant="secondary"
            onClick={handleCloseAddNote}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Note Modal */}
      <Modal show={showEditNote} onHide={handleCloseEditNote}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="edit_note_form" method="post" onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" placeholder="Title"
                value={titleEdit}
                onChange={handleTitleEditChange}
                required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control name="description" rows={3}
                as="textarea"
                placeholder="Description"
                value={descriptionEdit}
                onChange={handleDescriptionEditChange}
                required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            form="edit_note_form">
            Submit
          </Button>
          <Button
            variant="secondary"
            onClick={handleCloseEditNote}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
