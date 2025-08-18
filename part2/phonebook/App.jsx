import { useState } from 'react'

// (12:50) aight new contact component,
// let's see if the changes propagate.
const Contact = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  )
}

const Contacts = ({ persons }) => {
  // (12:52) remember: set 'key' prop in the map()
  return (
    <div>
      {persons.map((person) => <Contact key={person.id} person={person} />)}
    </div>
  )
}

const App = () => {
  // (12:47) okay now we adding numbers,
  // gotta update Contacts display
  const [persons, setPersons] = useState([{
    id: 1, 
    name: 'Arto Hellas', 
    number: '040-1234567',
  }])
  const [newName, setNewName] = useState('type new name...')
  // (12:44) yea we adding numbers now bb
  const [newNumber, setNewNumber] = useState('type new number...')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // check for existing names here
  const onSubmit = (event) => {
    event.preventDefault()

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    // (12:53) aight, new object formed with
    // the field change, now saving to check...
    // (12:55) phew 1-800-smackeditup,
    const newPerson = {
      id: String(persons.length + 1),
      name: newName,
      number: newNumber,
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
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
          number: <input
          value={newNumber}
          onChange={handleNumberChange}
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