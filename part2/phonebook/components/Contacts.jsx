const DeleteContact = ({ person, removeContact }) => {
  return (
    <button onClick={() => removeContact(person)}>
      delete
    </button>
  )
}

const Contact = ({ person, removeContact }) => {
  return (
    <>
      <div>
        {person.name} {person.number}
      </div>
      <DeleteContact person={person} removeContact={removeContact} />
    </>
  )
}

const Contacts = ({ persons, removeContact }) => {
  return (
    <div>
      {persons.map((person) => {
        return <Contact 
          key={person.id}
          person={person}
          removeContact={removeContact}
        />
      })}
    </div>
  )
}

export default Contacts