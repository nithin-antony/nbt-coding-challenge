import React from 'react'
import { Card, Timeline } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { getSystemLog } from '../../../api/sensorApi'
import { sensorIdType } from '../../../types/types'

import './SystemLog.css'

const SystemLog = ({ sensorId }: sensorIdType) => {
  const { isLoading, error, data } = useQuery(['systemLog', sensorId], () =>
    getSystemLog(sensorId)
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
            //{data.results?.length === 0 && <h1>No logs for the device</h1>}
          )}
          {error && <h1>An error has occurred</h1>}
        </>
      </Card>
    </div>
  )
}

export default SystemLog
