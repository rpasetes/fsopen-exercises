import { NoteProps } from '../services/notes.js'

interface NoteComponentProps {
  note: NoteProps
  toggleImportance: () => void
}

const Note = ({ note, toggleImportance }: NoteComponentProps) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li className='note'>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note