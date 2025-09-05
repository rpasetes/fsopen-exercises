import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const api_key = import.meta.env.VITE_API_KEY

const getAll = (search) => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then(response => {
    // console.log(response.data)
    const countries = response.data.map(country => country.name.common)
    return countries
  })
}

const getCountryData = (country) => {
  const request = axios.get(`${baseUrl}/name/${country}`)
  return request.then(response => {
    return response.data
  })
}

// (2114) okay getting a 401 bad request
// (2144) omg FINALLY WE CAN PASS THE DATA
const getWeatherData = (latlng) => {
  const [lat, lng] = latlng
  console.log(`retrieving weather for lat ${lat} lng ${lng}`)
  console.log('with key', api_key)
  const request = axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&exclude=hourly,daily,minutely,alerts&units=metric&appid=${api_key}`)

  return request.then(response => {
    // console.log(response.data.current)
    return response.data.current
  }).catch(error => {
    console.log(error)
  })
}

export default { getAll, getCountryData, getWeatherData }