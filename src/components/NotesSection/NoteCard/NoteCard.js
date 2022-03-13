import { useParams, Link } from 'react-router-dom';
import DeleteButton from '../../../ButtonDelete';
// import { useReducer } from 'react';
import styles from './NoteCard.module.css';

function NoteCard() {
  const { id } = useParams();
  // const [notesState, dispatch] = useReducer(notesReducer, initialNotesState);
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const Note = notes.find((element) => element.id === id);
  return Note === undefined ? (
    `This page doesn't exist`
  ) : (
    <div className={styles.cardNote}>
      <div className={styles.btnDiv}>
        <Link to={'/'} className={styles.link}>
          <button className={styles.btnBack}>Go back</button>
        </Link>
        {/* <button
          className={styles.btnDelete}
          // onClick={() => dispatch({ type: 'DELETE_NOTE', payload: Note })}
        >
          Delete note
        </button> */}
        <DeleteButton noteToDelete={Note} />
      </div>

      <div className={styles.cardText}>
        <p>{Note.text}</p>
        <div className={styles.noteDate}>
          <p>{Note.date}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
