// import { Route, Routes } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Nav/Navbar.js';
import NoteForm from './components/NotesSection/NoteForm.js';
import NoteCard from './components/NotesSection/NoteCard/NoteCard.js';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<NoteForm />} />
        <Route path='/:id' element={<NoteCard />} />
      </Routes>
    </div>
  );
}

export default App;
