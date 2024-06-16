import axios from 'axios'
const baseUrl = '/api/persons'
//const baseUrl = 'http://localhost:3001/api/persons'
//const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newRecord => {
  return axios.post(baseUrl, newRecord)
}

const remove = (id)=> {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson)
}
export default { 
  getAll, 
  create,
  remove,
  update
}