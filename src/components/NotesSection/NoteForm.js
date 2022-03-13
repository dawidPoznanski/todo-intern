import { useState, useReducer, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styles from './NoteForm.module.css';

function NoteForm() {
  const initialNotesState = {
    notes: JSON.parse(localStorage.getItem('notes')) || [],
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
          notes: [action.payload, ...prevState.notes],
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
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notesState.notes));
    console.log('zapisano');
  });

  const addNote = (event) => {
    event.preventDefault();
    if (!noteInput) {
      return;
    }
    const newNote = {
      id: uuidv4(),
      text: noteInput,
      date: formatDate(new Date()),
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
      <h1 className={styles.subtitle}> Last notes</h1>
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
            {/* <DeleteButton noteToDelete={note} /> */}
          </div>
          <Link to={'/' + note.id} className={styles.noteDate}>
            <p>{note.date}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default NoteForm;
