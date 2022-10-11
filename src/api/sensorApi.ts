import axios from 'axios'
import moment from 'moment'
const BASE_URL = 'http://localhost:3009'

export const getSensorsDetails = async (sensorId: string) => {
  const { data } = await axios.get(`${BASE_URL}/sensor/${sensorId}`)
  return data
}

export const getSensors = async (page: number) => {
  const { data } = await axios.get(`${BASE_URL}/sensor?page=${page}`)
  return data
}

export const createSensor = async (data) => {
  const { data: response } = await axios.post(`${BASE_URL}/sensor`, data)
  return response.data
}

export const updateSensor = async (data) => {
  const { data: response } = await axios.post(
    `${BASE_URL}/sensor/${data.sensor_id}`,
    data
  )
  return response.data
}

export const getSystemLog = async (sensorId: string) => {
  const { data } = await axios.get(`${BASE_URL}/sensor/${sensorId}/logs`)
  return data
}

export const getWeeklyAvg = async (sensorId: string) => {
  const { data } = await axios.get(
    `${BASE_URL}/sensor/${sensorId}/stats/weekly_avg`
  )

  const activities = data.results.map((activity) => {
    return activity.stats.map((data) => {
      return {
        ...data,
        weekDay: moment(Number(data.time)).format('ddd').toLocaleUpperCase(),
        sensorId: activity.sensor_id,
      }
    })
  })
  return activities[0].concat(activities[1])
}

export const getDailyTemp = async (sensorId: string) => {
  const { data } = await axios.get(
    `${BASE_URL}/sensor/${sensorId}/stats/weekly`
  )

  const dailyData = data.results.map((data) => {
    return {
      ...data,
      hour: moment(Number(data.time)).hours(),
    }
  })
  return dailyData.sort((a, b) => {
    return a.hour - b.hour
  })
}

export const getSensorActivity = async (sensorId: string) => {
  const { data } = await axios.get(`${BASE_URL}/sensor/${sensorId}/events`)
  return data
}

export const deleteSensor = async (sensorId: string) => {
  const { data } = await axios.delete(`${BASE_URL}/sensor/${sensorId}`)
  return data
}
