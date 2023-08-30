/* Dashboard Page */
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Cookies from 'universal-cookie';
import axios from 'axios'

import './Dashboard.css'
import { useEffect, useState } from 'react';

export default function Dashboard() {
    /* View Notes Page (Dashboard Page) */
    // Note
    const [notes, setNotes] = useState([])
    const [note_id, setNoteId] = useState(undefined)

    // Edit Note
    const [title_edit, setTitleEdit] = useState('')
    const [description_edit, setDescriptionEdit] = useState('')

    // Add Note
    const [title_add, setTitleAdd] = useState('')
    const [description_add, setDescriptionAdd] = useState('')

    // Show Modals
    const [show_add_note, setShowAddNote] = useState(false)
    const [show_edit_note, setShowEditNote] = useState(false)
    const [show_delete_note_confirm, setShowDeleteNoteConfirm] = useState(false)

    const handleCloseAddNote = () => {
        setShowAddNote(false)
        setTitleAdd('')
        setDescriptionAdd('')
    }

    const handleCloseEditNote = () => {
        setShowEditNote(false)
        setTitleEdit('')
        setDescriptionEdit('')
    }

    const handleCloseDeleteNoteConfirm = () => {
        setShowDeleteNoteConfirm(false)
    }

    const handleShowAddNote = () => setShowAddNote(true)

    function handleShowEditNote(note_id) {
        /* Open Edit Note Form Popup Window */
        // Fetch Note
        axios.get('http://localhost:8000/api/fetch-note?id=' + note_id)
            .then((response) => {
                if (note_id !== undefined) {
                    setTitleEdit(response.data.title)
                    setDescriptionEdit(response.data.description)
                }
            }).catch(err => {
                console.log(err)
            })

        // set note id
        setNoteId(parseInt(note_id))
        setShowEditNote(true)
    }

    /*
    Handle title and description changes
    for the edit and note forms
    */
    const handleTitleEditChange = err => {
        setTitleEdit(err.target.value)
    }

    const handleDescriptionEditChange = err => {
        setDescriptionEdit(err.target.value)
    }

    const handleTitleAddChange = err => {
        setTitleAdd(err.target.value)
    }

    const handleDescriptionAddChange = err => {
        setDescriptionAdd(err.target.value)
    }

    useEffect(() => {
        /* Fetch all the Notes for the Current User */
        const cookies = new Cookies()
        const token = cookies.get('token')
        let user_id = undefined

        if (token !== undefined) {
            axios.post('http://localhost:8000/api/get-decoded-token', {
                token: token
            }).then((response) => {
                if (response.data.user_id !== undefined) {
                    user_id = response.data.user_id
                    axios.get('http://localhost:8000/api/view-notes?user_id=' + user_id)
                        .then((response) => {
                            setNotes(response.data.rows)
                            console.log(response.data.rows)
                            console.log(user_id)
                            console.log(notes)
                        }).catch(err => {
                            console.log(err)
                        })
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }, [notes])

    /* Add Note */
    const handleAddSubmit = async (err) => {
        /* Add New Note Submission */
        err.preventDefault()
        const cookies = new Cookies()
        const token = cookies.get('token')
        let user_id = undefined

        if (token !== undefined) {
            axios.post('http://localhost:8000/api/get-decoded-token', {
                token: token
            }).then((response) => {
                if (response.data.user_id !== undefined) {
                    user_id = response.data.user_id
                    axios.post('http://localhost:8000/api/add-note', {
                        title: title_add,
                        description: description_add,
                        user_id: user_id
                    }).then(() => {
                        window.location.href = '/dashboard'
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }

    /* Edit Note */
    const handleEditSubmit = async (err) => {
        err.preventDefault()
        axios.patch('http://localhost:8000/api/edit-note', {
            note_id: note_id,
            title: title_edit,
            description: description_edit,
        }).then(() => {
            // redirect to the dashboard page
            window.location.reload()
        }).catch(err => {
            console.log(err)
        })
    }

    /* Delete Note */
    const handleDeleteNote = async (note_id) => {
        const delete_note = confirm('Are you sure you want to delete the note?')
        console.log(delete_note)
        if (delete_note === true) {
            axios.delete('http://localhost:8000/api/delete-note', {
                data: { note_id: note_id },
            }).then(() => {
                // redirect to the dashboard
                window.location.reload()
            }).catch(err => {
                console.log(err)
            })
        }
    }

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
                                <Button variant="primary" onClick={() => handleShowEditNote(note['id'])}>Edit</Button>
                            </div>
                            <div className="col col-md-auto">
                                <Button variant="danger" onClick={() => handleDeleteNote(note['id'])}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            })}

            {/* Add Note */}
            <Modal className="modal" show={show_add_note} onHide={handleCloseAddNote}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="add_note_form" method="post" onSubmit={handleAddSubmit}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control name="title" placeholder="Title" value={title_add} onChange={handleTitleAddChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="description" rows={3}
                                as="textarea"
                                placeholder="Description"
                                value={description_add}
                                onChange={handleDescriptionAddChange}
                                required />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" form="add_note_form">Submit</Button>
                    <Button variant="secondary" onClick={handleCloseAddNote}>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Note */}
            <Modal show={show_edit_note} onHide={handleCloseEditNote}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="edit_note_form" method="post" onSubmit={handleEditSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control name="title" placeholder="Title"
                                value={title_edit}
                                onChange={handleTitleEditChange}
                                required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="description" rows={3}
                                as="textarea"
                                placeholder="Description"
                                value={description_edit}
                                onChange={handleDescriptionEditChange}
                                required />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" form="edit_note_form">Submit</Button>
                    <Button variant="secondary" onClick={handleCloseEditNote}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}