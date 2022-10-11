import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getDailyTemp } from '../../../api/sensorApi'
import { sensorIdType } from '../../../types/types'
import { Line } from '@ant-design/plots'

const DailyTemperatureGraph = ({ sensorId }: sensorIdType) => {
  const { isLoading, error, data } = useQuery(
    ['DailyTemperatureGraph', sensorId],
    () => getDailyTemp(sensorId)
  )

  const config = {
    data,
    xField: 'hour',
    yField: 'temp',
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  }
  return (
    <>
      <h1>TEMPERATURE DAILY</h1>
      {!isLoading && <Line {...config} />}
      {error && <h1>Unexpected error occured</h1>}
    </>
  )
}

export default DailyTemperatureGraph
