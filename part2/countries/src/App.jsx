import { useState, useEffect } from 'react'
import countriesService from './../services/countries'
import viteImg from './../public/vite.svg'

/*
(1645) yaaas now the fun part, accessing and formatting data...
(1648) actually, checking out for like 10 minutes, back at 1700
(1729) nvm make that 1730, onto scaffolding the data, then the service.
*/
const CountryData = ({ country }) => {
  return (
    <>
      <h1>{country}</h1>
      <div>Capital Bern</div>
      <div>Area 41284</div>
      <h2>Languages</h2>
      <ul>
        <li>French</li>
        <li>Swiss German</li>
        <li>Italian</li>
        <li>Romansh</li>
      </ul>
      <img src={viteImg} />
    </>
  ) 
}

/* 
(1124) aight barebones app display established
(1134) done reading thru json country data, time to make services
(1142) realising that we just need to get all countries once, 
at first render, then filter every time the query changes
(1154) okay now we have countries populated as state, now filter
*/
function App() {
  const [countries, setCountries] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])
  const [countryData, setCountryData] = useState(null) 
  const [query, setQuery] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        // console.log(response)
        setCountries(initialCountries)
      })
  }, [])

  if (!countries) {
    return null
  }

  // (1128) remember that input elements trigger events
  // (1627) jumped back in at ~1615, gonna make filtered countries 
  // its own state here, esp since the display below depends on the 
  // input area. fuck it, feels dirty, but we're aiming for functionality.
  // (1631) okay we're getting display results here, but the filter
  // is behind by one,,, because the query doesn't change at the same
  // time as the filter. it's pulling from the previous query state ohhh
  // (1637) sweet giving the target value its own const really fixed it ha
  // (1638) okay looks like the example filter searches in any name position,,
  // (1642) looked it up, seems that includes() works over startsWith()
  const handleQuery = (event) => {
    const newQuery = event.target.value
    setQuery(newQuery)
    setFilteredCountries(countries.filter(country => {
      return country.toLowerCase().includes(newQuery)
    }))
    console.log(filteredCountries)
  }

  // (1750) fuck it nested function call
  // (1754) we don't want to pass any function calls
  // just references, so i gotta go back to remember.
  // (1759) so it looks like it doesn't make sense to
  // pass this function to the component just because
  // it renders. so based on what is displayed, can i
  // also call and execute this function? gosh i feel
  // like i'm running up against some self-defined
  // constraints here: not looking up or deferring away
  // from the techniques of the course. let's call it today
  const handleCountryData = (country) => () => {
    countriesService
      .getCountryData(country)
      .then()
  }

  // (1636) lmao all we needed now is to give each div a key,, its name works.
  return (
    <>
      <h1>hello world</h1>
      <div>find countries</div>
      <input value={query} onChange={handleQuery} />
      {(filteredCountries.length > 10)
        ? 'Too many matches, specify another filter'
        : (filteredCountries.length === 1)
        ? <CountryData country={country} />
        : filteredCountries.map(country => <div key={country}>{country}</div>)
      }
    </>
  )
}

export default App
