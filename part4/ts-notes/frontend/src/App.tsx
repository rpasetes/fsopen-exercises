import { useState, useEffect } from 'react'
import Note from './components/Note.tsx'
import Footer from './components/Footer.tsx'
import Notification from './components/Notification.tsx'
import noteService, { NoteProps } from './services/notes.ts'

const App = () => {
  const [notes, setNotes] = useState<NoteProps[]>([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  // (1601) interesting to have initial types set here, and not being
  // inheritable from the component that will use these types...
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => {
        setNotes(initialNotes)
      })
  }, [])

  if (!notes) {
    return null
  }
  
  const toggleImportanceOf = (id: number) => {
    // (1600) nice to use non-null here, since our ids are
    // guaranteed by our rendered components! thx claude,
    const note = notes.find(n => n.id === id)!
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
      setNotes(notes.map(note => note.id === id ? returnedNote : note))
    // (1546) u can just replace unused values with parentheses in ts
    }).catch(() => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(note => note.id !== id))
    })
  }

  // (1603) got these event types by hovering over the 
  const addNote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    
    noteService
      .create(noteObject)
      .then(addedNote => {
        setNotes(notes.concat(addedNote))
        setNewNote('')
      })
  }
  
  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
  ? notes
  : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note 
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote} 
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App