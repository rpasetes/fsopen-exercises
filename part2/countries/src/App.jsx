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
      <h2>Weather in {countryData.capital[0]}</h2>
    </>
  ) 
}

const Weather = ({ weatherData }) => {
  const icon = weatherData.weather[0].icon
  const temp = weatherData.temp
  const wind = weatherData.wind_speed

  return (
    <>      
      <p>Temperature {temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
      <p>Wind {wind} m/s</p>
    </>
  )
}

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
      .then(weatherData => {
          console.log(weatherData)
          setWeatherData(weatherData)
        })
    }
  }, [countryData])

  const handleQuery = (event) => {
    setCountryData(null)
    setWeatherData(null)

    const newQuery = event.target.value
    setQuery(newQuery)
    const filteredCountries = countries.filter(country => {
      return country.toLowerCase().includes(newQuery.toLowerCase())
    })
    console.log('new filteredCountries', filteredCountries)
    setFilteredCountries(filteredCountries)

    if (filteredCountries.length === 1) {
      console.log('we got an exact match:', filteredCountries[0])
      setCountry(filteredCountries[0])
    }
  }

  return (
    <>
      <h1>hello world</h1>
      <div>find countries</div>
      <input value={query} onChange={handleQuery} />
      {(filteredCountries.length > 10)
        ? 'Too many matches, specify another filter'
        : (countryData && weatherData)
        ? <div>
            <Country countryData={countryData} />
            <Weather weatherData={weatherData} />
          </div>
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
