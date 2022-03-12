import { useState, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './NoteForm.module.css';

function NoteForm() {
  const initialNotesState = {
    lastNoteCreated: null,
    notes: [],
  };
  // DATE
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  // DATE
  const notesReducer = (prevState, action) => {
    switch (action.type) {
      case 'ADD_NOTE': {
        const newState = {
          lastNoteCreated: formatDate(new Date()),
          notes: [...prevState.notes, action.payload],
        };
        console.log(newState, 'adding note');
        return newState;
      }
      case 'DELETE_NOTE': {
        const newState = {
          ...prevState,
          notes: prevState.notes.filter(
            (note) => note.id !== action.payload.id
          ),
        };
        console.log('after delete', newState);
        return newState;
      }
      default:
        console.log('');
    }
  };

  const [noteInput, setNoteInput] = useState('');
  const [notesState, dispatch] = useReducer(notesReducer, initialNotesState);

  const addNote = (event) => {
    event.preventDefault();
    if (!noteInput) {
      return;
    }
    const newNote = {
      id: uuidv4(),
      text: noteInput,
    };
    dispatch({ type: 'ADD_NOTE', payload: newNote });
    setNoteInput('');
  };
  return (
    <div className={styles.notes}>
      <form onSubmit={addNote} className={styles.notesForm}>
        <h1 className={styles.title}>Note</h1>
        <textarea
          className={styles.text}
          value={noteInput}
          onChange={(event) => setNoteInput(event.target.value)}
          placeholder='Note text'
        ></textarea>
        <button className={styles.btnSubmit}>Add note</button>
      </form>

      {notesState.notes.map((note) => (
        <div className={styles.card} key={note.id}>
          <p className={styles.noteText}>{note.text}</p>
          <div className={styles.btnPos}>
            <button
              className={styles.btnDelete}
              onClick={() => dispatch({ type: 'DELETE_NOTE', payload: note })}
            >
              Delete note
            </button>
          </div>
          <p className={styles.noteDate}>{notesState.lastNoteCreated}</p>
        </div>
      ))}
    </div>
  );
}

export default NoteForm;
