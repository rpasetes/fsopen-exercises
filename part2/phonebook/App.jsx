import { useState } from 'react'

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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('type new name...')
  const [newNumber, setNewNumber] = useState('type new number...')
  // (13:31) surprised that there's no error msg for an
  // uncontrolled component, but hey, even an empty string
  // is controlled (according to gemini search).
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // (13:15) aight new filter who dis
  const handleFilterChange = (event) => {
    console.log('updating filter to', event.target.value)
    setFilter(event.target.value)
  }

  // (13:21) okay now i'm wondering if filtering
  // for starting at an empty string will always be true...
  // (13:29) the answer is Yes. all the contacts are displaying,
  const filteredPersons = persons.filter((person) => {
    const lowerName = person.name.toLowerCase()
    console.log(lowerName)
    console.log(`starts with ${filter}? ${lowerName.startsWith(filter)}`)
    // (13:28) Remember: return multiline arrow functions
    // for array operations. how else will the data update?
    return person.name.toLowerCase().startsWith(filter)
  })

  console.log(filteredPersons)

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
      filter shown with <input
        onChange={handleFilterChange}
      />
      <h2>add a new</h2>
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
      <Contacts persons={filteredPersons} />
    </div>
  )
}

export default App