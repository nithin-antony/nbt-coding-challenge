import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getWeeklyAvg } from '../../../api/sensorApi'
import { sensorIdType } from '../../../types/types'
import { Area } from '@ant-design/plots'

const WeeklyAverageGraph = ({ sensorId }: sensorIdType) => {
  const { isLoading, error, data } = useQuery(
    ['WeeklyAverageGraph', sensorId],
    () => getWeeklyAvg(sensorId)
  )

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
      {error && <h1>Unexpected error occured</h1>}
    </>
  )
}

export default WeeklyAverageGraph
