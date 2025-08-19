// (16:52) okay time to actually write all this
import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = person => {
  const request = axios.post(baseUrl, person)
  return request.then(response => response.data)
}

const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

// (17:29) okay, time to export remove to App
export default { getAll, create, remove }