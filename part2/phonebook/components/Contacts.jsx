// (15:33) okay beautiful finally getting round to this
// (15:34) LMAO that literally took a minute, didn't 
// need to stop but glad to have saved my progress,,
// lets checkpoint this and move on to 3c...
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

export default Contacts