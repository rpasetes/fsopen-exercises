import { useState } from 'react'

// NOTE: if a feature isn't working as intended, 
// how can you shift focus such that it can be 
// validated? can you break the problem down? 
// can you get feedback in the console?

const ContactList = (props) => {
  console.log('inheriting contacts:', props);
  
  return (
    <div>
      {props.persons.map((person) => <div key={person.id}>{person.name}</div>)}
    </div>
  )
}

const App = () => {
  // remember: give unique ids to array objects
  // that become mapped child components
  // NB: apparently we could've use the name as id... lmao
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas' }
  ]) 
  // error: "A component is changing an uncontrolled input 
  // to be controlled. This is likely caused by the value 
  // changing from undefined to a defined value, which should not happen."
  // lesson: controlled inputs have defined initial values
  const [newName, setNewName] = useState('type new name...')

  // remember: inherit events in input changes.
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value);
  }

  // remember: prevent default page refresh on submit
  const onSubmit = (event) => {
    event.preventDefault()
    const newPerson = {
      id: String(persons.length + 1),
      name: newName,
    }

    setPersons(persons.concat(newPerson))
    // nice bit after the fact...
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
      <ContactList persons={persons} />
      <div>debug: {newName}</div>
    </div>
  )
}

export default App