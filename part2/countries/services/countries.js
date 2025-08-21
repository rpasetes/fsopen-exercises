import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

// (1146) let's handle data massaging at the service level
// (1150) remember to reference response.data before massaging
const getAll = (search) => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then(response => {
    console.log(response.data)
    const countries = response.data.map(country => country.name.common)
    return countries
  })
}

// (1748) aight straightforward
const getCountryData = (country) => {
  const request = axios.get(`${baseUrl}/name/${country}`)
  return request.then(response => {
    return response.data
  })
}

export default { getAll, getCountryData }