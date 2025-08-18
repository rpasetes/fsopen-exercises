import { useState } from 'react'

const Contacts = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => <div key={person.name}>{person.name}</div>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('type new name...')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  // check for existing names here
  const onSubmit = (event) => {
    event.preventDefault()

    // kinda wanna try to filter 'persons'
    // to call includes() on...
    // (10 mins later) nvm: let's not jump ahead. 
    // let's try removing id set from prev exercise
    // and call includes() by matching objects...
    // remember to change keys on ContactList.
    // (12:33) hmm includes() doesn't seem to pass check
    // (12:37) okay since we're working with objects,
    // gemini search seems to recommend some(), since
    // it's able to test each arr element w/ a function
    // (12:40) hell yea it works! which means i can also
    // add ids back to the initial 'persons' data struct,
    if (persons.some((person) => person.name === newName)) {
      // remember: template strings insert with ${}
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = {
      id: String(persons.length + 1),
      name: newName,
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmit}>
        <div>
          name: <input 
          value={newName} 
          onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Contacts persons={persons} />
    </div>
  )
}

export default App