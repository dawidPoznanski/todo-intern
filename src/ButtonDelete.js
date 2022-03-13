import { useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './components/NotesSection/NoteForm.module.css';

function DeleteButton(props) {
  const initialNotesState = {
    notes: JSON.parse(localStorage.getItem('notes')) || [],
  };
  const navigate = useNavigate();
  const notesReducer = (prevState, action) => {
    switch (action.type) {
      case 'DELETE_NOTE': {
        const newState = {
          ...prevState,
          notes: prevState.notes.filter(
            (note) => note.id !== action.payload.id
          ),
        };
        console.log('after delete', newState);

        localStorage.setItem('notes', JSON.stringify(newState.notes));
        return newState;
      }
      default:
        console.log('');
    }
  };
  const [notesState, dispatch] = useReducer(notesReducer, initialNotesState);
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notesState.notes));
  });

  return (
    <button
      className={styles.btnDelete}
      onClick={() => {
        dispatch({ type: 'DELETE_NOTE', payload: props.noteToDelete });
        navigate('/');
      }}
    >
      Delete note
    </button>
  );
}

export default DeleteButton;
