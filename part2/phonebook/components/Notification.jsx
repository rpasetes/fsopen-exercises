const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

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