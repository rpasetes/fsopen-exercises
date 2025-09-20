import axios from 'axios'
const baseUrl = '/api/notes'

export interface NoteProps {
  id: number
  content: string
  important: boolean
}

export interface NewNote {
  content: string
  important: boolean
}

const getAll = (): Promise<NoteProps[]> => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject: NewNote): Promise<NoteProps> => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id: number, newObject: NoteProps): Promise<NoteProps> => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update }