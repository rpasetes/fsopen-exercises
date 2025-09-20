import axios from 'axios'
// (1138) wow, going from db-json to express. huge
// (1234) DAMN literally adding the proxy brought the
// dev app back to life! powerful.
const baseUrl = '/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  const unusedNote = {
    id: 10000,
    content: 'This note is not saved to server',
    important: true
  }
  return request.then(response => response.data.concat(unusedNote))
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update }