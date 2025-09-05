import { useState, useEffect } from 'react'
import countriesService from './../services/countries'

const CountryToggle = ({ country, onToggle }) => {
  return (
    <div>
      {country}
      <button onClick={onToggle}>show</button>
    </div>
  )
}

const Country = ({ countryData, weatherData }) => {
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
      <h2>Weather in {countryData.capital[0]}</h2>
      <Weather weatherData={weatherData} />
    </>
  ) 
}

// (2145) AIGHT PLUG AND PLAY ALMOST THERE
// (2152) and NOW UNCOMMENT OUT THE DATA WE GOT FROM OUR API
// (2153) AND WE GOT GUAM WITH 26.54 CELCIUS MAIPE ITS HOTTT
const Weather = ({ weatherData }) => {
  // console.log(weatherData)
  const icon = weatherData.weather[0].icon
  // const icon = '50n'
  const temp = weatherData.temp
  // const temp = 8
  const wind = weatherData.wind_speed
  // const wind = 7

  return (
    <>
      <p>Temperature {temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
      <p>Wind {wind} m/s</p>
    </>
  )
}

// (2001) okay with all that gitfu behind us, let's do this
// LAST. FARKEN. EXERCISE. WITH API CALLS OMFG HOW EXPENSIV
// (2002) oh yea note to self, take care of rebasing b4 push
// (2011) okay lets step it out, we're making an api call so we:
// > add a weatherData state (done at 2014)
// > set in its own effect hook (done at 2107)
// > which gets populated with another service call (done 2147)
// > after giving the API ur cc info UGHHHHH (2133)
// > that then gets rendered within its own new component. (2153)
// Simple enough.
// (2022) okay wait clocking out, this is actually a lot.
// (2157) WOAH found a weird edge case where country immediately 
// gets set with a single query. whats going on
// (2207) found it but honestly having dynamic weather data is 
// enough for me, and enough for the coursework WE ARE DONE
function App() {
  const [countries, setCountries] = useState(null)
  const [country, setCountry] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])
  const [query, setQuery] = useState('')
  const [countryData, setCountryData] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

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
  }, [country])

  useEffect(() => {    
    if (countryData) {
      console.log('received data for', countryData.name.common)
      const latlng = countryData.capitalInfo.latlng
      countriesService
      .getWeatherData(latlng)
      // (2149) okay now we set the data with our callback
      .then(weatherData => {
          console.log(weatherData)
          setWeatherData(weatherData)
        })
    }
  }, [countryData])

  // (2203) Remember, check for null data after effect hooks
  // if (!countries) {
  //   return null
  // }

  const handleQuery = (event) => {
    setCountryData(null)

    const newQuery = event.target.value
    setQuery(newQuery)
    const filteredCountries = countries.filter(country => {
      return country.toLowerCase().includes(newQuery.toLowerCase())
    })
    console.log(filteredCountries)

    if (filteredCountries.length === 1) {
      console.log('we got an exact match:', filteredCountries[0])
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
      {// (2205) okay this massive length reduction skips something
      // about this ternary operator. i'm too lazy to debug but hey,
      (filteredCountries.length > 10)
        ? 'Too many matches, specify another filter'
        : (countryData)
        // (2151) and make sure to pass weatherData appropriately
        ? <Country countryData={countryData} weatherData={weatherData}/>
        : filteredCountries.map(country => 
          <CountryToggle 
            key={country}
            country={country} 
            onToggle={() => setCountry(country)}
          />
        )
      }
    </>
  )
}

export default App
