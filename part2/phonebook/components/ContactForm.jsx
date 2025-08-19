const NameForm = (props) => {
  return (
    <div>
      name: <input 
        value={props.newName} 
        onChange={props.handleNameChange}
      />
    </div>
  )
}

const NumberForm = (props) => {
  return (
    <div>
      number: <input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
  )
}

const ContactForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <NameForm 
        newName={props.newName}
        handleNameChange={props.handleNameChange}
      />
      <NumberForm
        newNumber={props.newNumber}
        handleNumberChange={props.handleNumberChange}
      />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default ContactForm