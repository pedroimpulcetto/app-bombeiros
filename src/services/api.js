import axios from 'axios'

const api = axios.create({
  baseURL: 'http://erpbombeiros-backend.herokuapp.com/api'
})

export default api