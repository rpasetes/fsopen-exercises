// (1448) oh wow, you can just make interfaces...
export interface NotificationProps {
  message: string | null
}

const Notification = ({ message }: NotificationProps) => {
  // (1544) changing non-render to fit initial state
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

export default Notification