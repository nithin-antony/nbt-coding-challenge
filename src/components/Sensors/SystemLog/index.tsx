import React from 'react'
import { Card, Timeline } from 'antd'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { sensorIdType } from '../../../types/types'

import './SystemLog.css'

const SystemLog = ({ sensorId }: sensorIdType) => {
  const { isLoading, error, data } = useQuery(['systemLog', sensorId], () =>
    axios
      .get(`http://localhost:3009/sensor/${sensorId}/logs`)
      .then((res) => res.data)
  )

  return (
    <div className="system-log-container">
      <h1>SYSTEM LOG</h1>
      <Card loading={isLoading}>
        <>
          {!error && (
            <Timeline>
              {data?.results &&
                data.results?.map((log) => (
                  <Timeline.Item key={log.time}>
                    {log.description}
                  </Timeline.Item>
                ))}
            </Timeline>
          )}
          {error && <h1>An error has occurred</h1>}
        </>
      </Card>
    </div>
  )
}

export default SystemLog
