import React from 'react'
import WeeklyAverageGraph from '../WeeklyAverageGraph'

const SensorStatsWeekly = ({ overview }) => {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '300px' }}>
          <div className="weekly-stats">
            <div>
              <h1>TOTAL MESSAGES</h1>
              <p>Total messages this week</p>
            </div>
            {overview.total_messages}
          </div>
          <div className="weekly-stats">
            <div>
              <h1>DOWN TIME</h1>
              <p>Total down time</p>
            </div>
            {overview.down_time}
          </div>
          <div className="weekly-stats">
            <div>
              <h1>ALERTS</h1>
              <p>System alerts this week</p>
            </div>
            {overview.alerts}
          </div>
        </div>
        <div style={{ width: '700px', marginLeft: '20px' }}>
          <WeeklyAverageGraph sensorId="nrf-2158adf90bc5" />
        </div>
      </div>
    </>
  )
}

export default SensorStatsWeekly
