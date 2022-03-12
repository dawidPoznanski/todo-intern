import { useParams, Link } from 'react-router-dom';

function NoteCard() {
  const { id } = useParams();
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  const Note = notes.find((element) => element.id === id);
  return Note === undefined ? (
    `This page doesn't exist`
  ) : (
    <div>
      <Link to={'/'}>
        <button>Go back</button>
      </Link>
      <h1> ID: {id}</h1>
      <p>{localStorage.getItem('notes')}</p>
      {Note.text}
    </div>
  );
}

export default NoteCard;
