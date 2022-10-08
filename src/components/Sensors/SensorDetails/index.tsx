import React from 'react'
import { PageHeader } from 'antd'
import SensorStatsWeekly from '../SensorStatsWeekly'
import SystemLog from '../SystemLog'
import SensorActivity from '../SensorActivity'
import './SensorDetails.css'

const SensorsDetails = () => {
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Sensor"
      />
      <SensorStatsWeekly />
      <div className="system-deatils-container">
        <SystemLog sensorId="nrf-2158adf90bc5" />
        <SensorActivity sensorId="nrf-2158adf90bc5" />
      </div>
    </>
  )
}

export default SensorsDetails
