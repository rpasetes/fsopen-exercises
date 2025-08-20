import { useState, useEffect } from 'react'
import Filter from './components/Filter'
// (04:54) and since it wasn't exported, it imported 
// <Notification /> from another projcet lmaoo
import Notification from './components/Notification'
import ContactForm from './components/ContactForm'
import Contacts from './components/Contacts'
import contactService from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('type new name...')
  const [newNumber, setNewNumber] = useState('type new number...')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
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

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    if (persons.some((person) => person.name === newName)) {
      const match = persons.filter(person => person.name === newName)[0]
      if (confirm(`${match.name} is already added to phonebook, 
        replace the old number with a new one?`)) {
          console.log(`updating ${match.name} to ${newNumber}`)
          contactService
            .update(match.id, newPerson)
            .then(returnedPerson => {
              console.log(`update response:`, returnedPerson)
              setPersons(persons.map(person => person.name === match.name ? returnedPerson : person))
              setNewName('')
              setNewNumber('')
            }).catch(error => {
              console.log(error)
            })
        }
      return
    }

    contactService
      .create(newPerson)
      .then(returnedPerson => {
        console.log(returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        // (04:47) notif displaying successfully! now to style,
        setMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const removeContact = (person) => {
    if (confirm(`delete ${person.name}?`)) {
      console.log(`removing ${person.name}`)
      contactService
        .remove(person.id)
        .then(deletedContact => {
          setPersons(persons.filter(person => person.id !== deletedContact.id))
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
      <Contacts 
        persons={filteredPersons}
        removeContact={removeContact}
      />
    </div>
  )
}

export default App