import { useState, useEffect } from 'react'
import countriesService from './../services/countries'

// (1847) to start, let's make a component that lists
// a country with a button, then will figure out logic
// (1901) OMG i just needed to nest the button in the div
// to have it right next to the text, good to remember ha
// (1902) WAIT can i literally just setQuery to country!?
// (1905) LMAO nah it has to go through handleQuery first
const CountryToggle = ({ country, onToggle }) => {
  return (
    <>
      <div key={country}>
        {country}
        <button onClick={onToggle}>show</button>
      </div>
    </>
  )
}

const Country = ({ countryData }) => {
  console.log(countryData)
  console.log('languages', Object.values(countryData.languages))

  return (
    <>
      <h1>{countryData.name.common}</h1>
      <div>Capital {countryData.capital[0]}</div>
      <div>Area {countryData.area}</div>
      <h2>Languages</h2>
      <ul>
        {Object.values(countryData.languages).map(language => {
          return <li key={language}>{language}</li>
        })}
      </ul>
      <img src={countryData.flags.png} />
    </>
  ) 
}

// (1845) AIGHT WE BACK WITH A VENGEANCE, COMPLETE PART TWO!!
// GOAL FOR THIS EXERCISE: SET COUNTRYDATA WITH TOGGLE BUTTON
function App() {
  const [countries, setCountries] = useState(null)
  const [country, setCountry] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])
  const [countryData, setCountryData] = useState(null) 
  const [query, setQuery] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  useEffect(() => {
    console.log('effect run, country is now', country)

    if (country) {
      countriesService
        .getCountryData(country)
        .then(countryData => {
          setCountryData(countryData)
        })
    }

    // (1917) okay if i'm right, checking the length
    // and setting country ,, will create an infinite
    // loop, so we have to separate effects here,, or
    // actually just have the effect look at changing
    // country... and not setting country in an effect?
    // if (filteredCountries.length === 1) {
    //   setCountry(filteredCountries[0])
    //   country = filteredCountries[0]
    //   countriesService
    //     .getCountryData(country)
    //     .then(countryData => {
    //       setCountryData(countryData)
    //   })
    // }
  }, [country])

  if (!countries) {
    return null
  }

  // (1909) okay looks like setting newQuery toLower helps match
  // (1910) but changing query to whatever toggle doesn't help me
  // here,, unless i just make another state variable to store
  // country rather than just setting it in the filteredCountries
  // effect hook! okay that's worth abstracting...
  // (1923) wait we can actually handle filteredCountry logic here!
  // (1929) and now we have a toggle working successfully, we can
  // also handle any query change to reset our countryData until
  // country is set again, either by elimination or user toggling
  // (1932) yoooo the functionality works!! this is fucken huge
  // (1942) aight just getting off the phone with the fam, SHIP!
  const handleQuery = (event) => {
    setCountryData(null)

    const newQuery = event.target.value
    setQuery(newQuery)
    const filteredCountries = countries.filter(country => {
      return country.toLowerCase().includes(newQuery.toLowerCase())
    })

    if (filteredCountries.length === 1) {
      setCountry(filteredCountries[0])
    } else {
      setFilteredCountries(filteredCountries)
    }
  }

  return (
    <>
      <h1>hello world</h1>
      <div>find countries</div>
      <input value={query} onChange={handleQuery} />
      {(filteredCountries.length > 10)
        ? 'Too many matches, specify another filter'
        // (1927) okay now we have the possibility for countryData
        // to exist with multiple filtered countries, we can remove
        // our length check to display our Country component
        : (countryData)
        ? <Country countryData={countryData}/>
        : filteredCountries.map(country => 
          <CountryToggle 
            country={country} 
            onToggle={() => setCountry(country)}
          />
        )
      }
    </>
  )
}

export default App
