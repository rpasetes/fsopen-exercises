import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Stat = ({ text, number } ) => <p>{text} {number}</p>

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad

  return (
    <div>
      <Stat text='good' number={good} />
      <Stat text='neutral' number={neutral} />
      <Stat text='bad' number={bad} />
      <Stat text='all' number={total} />
      <Stat text='average' number={(good - bad) / total} />
      <Stat text='positive' number={good / total} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <Header text='give feedback' />
      <Button text='good' onClick={handleGood} />
      <Button text='neutral' onClick={handleNeutral} />
      <Button text='bad' onClick={handleBad}/>
      <Header text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App