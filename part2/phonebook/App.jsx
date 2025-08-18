import { useState } from 'react'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'

const Contact = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  )
}

const Contacts = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => <Contact key={person.id} person={person} />)}
    </div>
  )
}

// (13:35) refactoring: leave all state + event handlers in App
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('type new name...')
  const [newNumber, setNewNumber] = useState('type new number...')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter((person) => {
    const lowerName = person.name.toLowerCase()
    return person.name.toLowerCase().startsWith(filter)
  })

  const onSubmit = (event) => {
    event.preventDefault()

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

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
      <Filter onChange={handleFilterChange} />
      <h3>add a new</h3>
      <ContactForm
        onSubmit={onSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Contacts persons={filteredPersons} />
    </div>
  )
}

export default App