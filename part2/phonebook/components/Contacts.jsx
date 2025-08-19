// (17:11) hmm the button isn't showing up
// (17:11) omg Remember: return the component!
// (17:28) for taste, putting arrow f'n at onClick
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