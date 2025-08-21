import { useState, useEffect } from 'react'
import countriesService from './../services/countries'

/*
(1645) yaaas now the fun part, accessing and formatting data...
(1648) actually, checking out for like 10 minutes, back at 1700
(1729) nvm make that 1730, onto scaffolding the data, then the service.
(21aug;1337) formatting data ongoing, now we have the data passed
now wondering if objects are mappable
(1340) lul (looked up lul) nope, just call .values() on the object to return an array
(1351) okay with the guard conditional in place, now it's just a matter
of ensuring that we're calling the right data shapes. w/o typescript
this is incredibly painful and console heavy, but here we go...
(1355) damn so it's actually Object.values(object), not a function,, disgustang
(1357) and REMEMBER, Return the value in multiline arrow functions!
(1359) OMG WE'RE FUCKING DONE HOLY SHIT
*/
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
          return <li>{language}</li>
        })}
      </ul>
      <img src={countryData.flags.png} />
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
        console.log(initialCountries)
        setCountries(initialCountries)
      })
  }, [])

  // (21aug;1306) alright new effect hook, let's see if
  // this pulls the data we need...
  // (1315) after some query debugging, now we can run it
  // (1317) remembering to pass in the country name, we got data!
  useEffect(() => {
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      countriesService
        .getCountryData(country)
        .then(countryData => {
          // console.log(countryData)
          setCountryData(countryData)
        })
    }
  }, [filteredCountries])

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
  // (21aug;1301) okay since the input is the main reactive element,
  // i can set the country check here, need to make sure that ,,,
  // oh wait i can call useEffect on filteredCountries to run the
  // external service! okay yea that feels like it makes sense
  // (1313) alright looks like i needed to debug handleQuery before
  // the country data can be pulled. now that's done let's plug em up
  const handleQuery = (event) => {
    const newQuery = event.target.value
    console.log(newQuery)
    setQuery(newQuery)
    const filteredCountries = countries.filter(country => {
      return country.toLowerCase().includes(newQuery)
    })
    console.log(filteredCountries)
    setFilteredCountries(filteredCountries)
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
  // (21aug;1315) ok now we have an effect hook servicing
  // the data, we don't need a event handler anymore.
  // handlers of this type prolly best for button elements,
  // but since there's (1) external data (2) triggered from 
  // an input element, using an effect hook was the way here.
  // commenting this code out, but good lesson here.
  // const handleCountryData = (country) => () => {
  //   countriesService
  //     .getCountryData(country)
  //     .then()
  // }

  // (1636) lmao all we needed now is to give each div a key,, its name works.
  // (aug21;1348) ahh looks like there's a race condition for the data
  // to be received on time. for now, i'm setting up a guard conditional
  // with (&& countryData) to make sure data exists for <Country />.
  return (
    <>
      <h1>hello world</h1>
      <div>find countries</div>
      <input value={query} onChange={handleQuery} />
      {(filteredCountries.length > 10)
        ? 'Too many matches, specify another filter'
        : (filteredCountries.length === 1 && countryData)
        ? <Country countryData={countryData}/>
        : filteredCountries.map(country => <div key={country}>{country}</div>)
      }
    </>
  )
}

export default App
