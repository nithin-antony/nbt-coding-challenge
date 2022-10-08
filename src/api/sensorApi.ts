import axios from 'axios'
const BASE_URL = 'http://localhost:3009'

export const createSensor = async (data) => {
  const { data: response } = await axios.post(`${BASE_URL}/sensor`, data)
  return response.data
}
