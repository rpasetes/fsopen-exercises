import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('type new name...')
  const [newNumber, setNewNumber] = useState('type new number...')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
      })
  }, [])

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

    axios
      .post('http://localhost:3001/persons', newPerson)
      .then(response => {
        console.log(response.data)
        // (16:47) u still append response to state, since 201
        // updates with only the new number, not all persons
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
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