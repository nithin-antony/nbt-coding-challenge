import React from 'react'
import { PageHeader } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getSensorsDetails } from '../../../api/sensorApi'
import SensorStatsWeekly from '../SensorStatsWeekly'
import DailyTemperatureGraph from '../DailyTemperatureGraph'
import SystemLog from '../SystemLog'
import SensorActivity from '../SensorActivity'
import './SensorDetails.css'

const SensorsDetails = () => {
  const { state } = useLocation()
  const { sensorId } = state
  const navigate = useNavigate()

  const { isLoading, data } = useQuery(
    ['sensorsDetails', sensorId],
    () => getSensorsDetails(sensorId),
    {
      keepPreviousData: true,
    }
  )

  const pageBackHandler = () => {
    navigate('/')
  }

  return (
    <>
      {!isLoading && (
        <>
          <PageHeader
            className="site-page-header"
            onBack={pageBackHandler}
            title={`Sensor - ${data?.result.device_id}`}
          />
          <SensorStatsWeekly overview={data?.result.overview} />
          <DailyTemperatureGraph sensorId={sensorId} />
          <div className="system-deatils-container">
            <SystemLog sensorId={sensorId} />
            <SensorActivity sensorId={sensorId} />
          </div>
        </>
      )}
    </>
  )
}

export default SensorsDetails
