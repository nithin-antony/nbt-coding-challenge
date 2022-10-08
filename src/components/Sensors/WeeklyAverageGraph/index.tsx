import React, { useEffect } from 'react'
import moment from 'moment'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { sensorIdType } from '../../../types/types'
import { Area } from '@ant-design/plots'

const WeeklyAverageGraph = ({ sensorId }: sensorIdType) => {
  const { isLoading, error, data } = useQuery(['weeklyAvgTemp', sensorId], () =>
    axios
      .get(`http://localhost:3009/sensor/${sensorId}/stats/weekly_avg`)
      .then((res) => {
        const activities = res.data.results.map((activity) => {
          return activity.stats.map((data) => {
            return {
              ...data,
              weekDay: moment(Number(data.time))
                .format('ddd')
                .toLocaleUpperCase(),
              sensorId: activity.sensor_id,
            }
          })
        })
        return activities[0].concat(activities[1])
      })
  )

  useEffect(() => {
    console.log(data, isLoading)
  }, [data, isLoading])

  const config = {
    data,
    xField: 'weekDay',
    yField: 'temp',
    seriesField: 'sensorId',
    color: [
      '#6897a7',
      '#8bc0d6',
      '#60d7a7',
      '#dedede',
      '#fedca9',
      '#fab36f',
      '#d96d6f',
    ],
    legend: {
      position: 'top',
    },
    width: 200,
    height: 400,
  }
  return (
    <>
      <h1>WEEKLY AVERAGE TEMP</h1>
      {!isLoading && <Area {...config} />}
    </>
  )
}

export default WeeklyAverageGraph
