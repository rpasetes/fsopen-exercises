const Footer = () => {
  // (04:28) note: inline styling can't straightforwardly
  // use pseudo classes that style particular states 
  // eg. button:hover
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic'
  }

  return (
    <div style={footerStyle}>
      <br />
      <p>
        Note app, Department of Computer Science, University of Helsinki 2025
      </p>
    </div>
  )
}

export default Footer