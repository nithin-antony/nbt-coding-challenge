import React from 'react'
import { Col, Row } from 'antd'
import WeeklyAverageGraph from '../WeeklyAverageGraph'

const SensorStatsWeekly = () => {
  return (
    <>
      <Row>
        <Col flex={2}>
          <h1>TOTAL MESSAGES</h1>
          <p>Total messages this week</p>
          <h1>DOWN TIME</h1>
          <p>Total down time</p>
          <h1>ALERTS</h1>
          <p>System alerts this week</p>
        </Col>
        <Col flex={3}>
          <WeeklyAverageGraph sensorId="nrf-2158adf90bc5" />
        </Col>
      </Row>
    </>
  )
}

export default SensorStatsWeekly
