import { useParams } from 'react-router-dom';

function NoteCard() {
  const { id } = useParams();
  return (
    <div>
      <h1> ID: {id}</h1>
    </div>
  );
}

export default NoteCard;
