import React, { useState } from 'react';
import './side_scroll.css';
import NotesParent from './NotesParent';

function SideScroll() {
    const [showMenu, setShowMenu] = useState(false);
    const [notes, setNotes] = useState([
        {
            noteTitle: "Trigonometry, Logarithms, and Sets",
            noteDate: "1:00 PM",
            noteContent: "Prof Rajni Singh."
        },
    ]);
    const [modalType, setModalType] = useState(null); // State to track which modal to show
    const [selectedNoteIndex, setSelectedNoteIndex] = useState(null); // State to track the selected note index
    const [newNote, setNewNote] = useState({
        noteTitle: "",
        noteDate: "",
        noteContent: ""
    }); // State to store new note details
    const [editedNote, setEditedNote] = useState({
        noteTitle: "",
        noteDate: "",
        noteContent: ""
    }); // State to store edited note details

    const handleMenuToggle = () => {
        setShowMenu(!showMenu);
    };

    const handleEditModal = () => {
        setModalType('edit');
    };

    const handleAddModal = () => {
        setModalType('add');
    };

    const handleDeleteModal = () => {
        setModalType('delete');
    };

    const handleAddNote = () => {
        setNotes([...notes, newNote]);
        setModalType(null);
        setNewNote({
            noteTitle: "",
            noteDate: "",
            noteContent: ""
        });
    };

    const handleDeleteNote = () => {
        if (selectedNoteIndex !== null) {
            const updatedNotes = [...notes];
            updatedNotes.splice(selectedNoteIndex, 1);
            setNotes(updatedNotes);
            setSelectedNoteIndex(null);
        }
        setModalType(null);
    };

    const handleEditNote = () => {
        if (selectedNoteIndex !== null) {
            const updatedNotes = [...notes];
            updatedNotes[selectedNoteIndex] = editedNote;
            setNotes(updatedNotes);
            setSelectedNoteIndex(null);
            setEditedNote({
                noteTitle: "",
                noteDate: "",
                noteContent: ""
            });
        }
        setModalType(null);
    };

    return (
        <div className="scroll-bar" style={{ display: 'flex', flexWrap: 'wrap', position: 'relative' }}>
            <div className="menu-button" onClick={handleMenuToggle}>
                <i className="fa fa-ellipsis-v"></i>
            </div>
            {showMenu && (
                <div className="dropdown-menu">
                    <div className="menu-item" onClick={handleEditModal}>Edit Note</div>
                    <div className="menu-item" onClick={handleAddModal}>Add New Note</div>
                    <div className="menu-item" onClick={handleDeleteModal}>Delete Note</div>
                </div>
            )}
            <NotesParent notes={notes} />

            {/* Modals */}
            {modalType === 'add' && (
                <div className="modal">
                    <input type="text" placeholder="Title" value={newNote.noteTitle} onChange={(e) => setNewNote({ ...newNote, noteTitle: e.target.value })} />
                    <input type="text" placeholder="Date" value={newNote.noteDate} onChange={(e) => setNewNote({ ...newNote, noteDate: e.target.value })} />
                    <textarea placeholder="Content" value={newNote.noteContent} onChange={(e) => setNewNote({ ...newNote, noteContent: e.target.value })} />
                    <button onClick={handleAddNote}>Add</button>
                </div>
            )}

            {modalType === 'delete' && (
                <div className="modal">
                    <p className="selection">Select a note to delete:</p>
                    <ul >
                        {notes.map((note, index) => (
                            <li className="choose" key={index} onClick={() => setSelectedNoteIndex(index)}>{note.noteTitle}</li>
                        ))}
                    </ul>
                    <button onClick={handleDeleteNote}>Delete</button>
                </div>
            )}

            {modalType === 'edit' && (
                <div className="modal">
                    <p className="selection">Select a note to edit:</p>
                    <ul >
                        {notes.map((note, index) => (
                            <li className="choose" key={index} onClick={() => setSelectedNoteIndex(index)}>{note.noteTitle}</li>
                        ))}
                    </ul>
                    {selectedNoteIndex !== null && (
                        <div>
                            <input type="text" placeholder="Title" value={editedNote.noteTitle} onChange={(e) => setEditedNote({ ...editedNote, noteTitle: e.target.value })} />
                            <input type="text" placeholder="Date" value={editedNote.noteDate} onChange={(e) => setEditedNote({ ...editedNote, noteDate: e.target.value })} />
                            <textarea placeholder="Content" value={editedNote.noteContent} onChange={(e) => setEditedNote({ ...editedNote, noteContent: e.target.value })} />
                            <button onClick={handleEditNote}>Update</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default SideScroll;
