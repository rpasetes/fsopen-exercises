const NameForm = (props) => {
  console.log('NameForm props', props)
  
  return (
    <div>
      name: <input 
        value={props.newName} 
        onChange={props.handleNameChange}
      />
    </div>
  )
}

// (13:55) okay looks like there's an error:
// You provided a `value` prop to a form field 
// without an `onChange` handler. This will render 
// a read-only field. If the field should be mutable
//  use `defaultValue`. Otherwise, set either 
// `onChange` or `readOnly`.
// hopefully separating each field and 'not defining
// components in another component' will solve this.
// (13:56) okay that didn't work.
// (13:58) LESSON: READ the console for undefined props
// turns out i passed 'handleFilterChange' instead of 
// 'handleNumberChange'... humbling moment right there *sigh*
// (14:00) y'know what tho, separating parts was a good triage.
// and glad to have console logging muscle memoried in. fuck yea.
const NumberForm = (props) => {
  console.log('NumberForm props', props)

  return (
    <div>
      number: <input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
  )
}

// (13:43) good practice, prepend undefined
// variables with 'props.' for initial check
// ,oh and 'console.log(props)' to see shape
// and check that everything passes thru well
const ContactForm = (props) => {
  console.log('ContactForm props', props)
  
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