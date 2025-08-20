// (04:53) remember: export default your component after defining it!
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  // (09:27) YES the success message is green!
  // (09:28) AND the failure message is red.
  const style = message.startsWith('Added')
    ? { color: 'green' }
    : { color: 'red' }

  return (
    <div className='notification' style={style}>
      {message}
    </div>
  )
}

export default Notification