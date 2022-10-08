import React from 'react'
import { Avatar, Card } from 'antd'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { UserOutlined } from '@ant-design/icons'
import { sensorActivityType, sensorIdType } from '../../../types/types'
import './SensorActivity.css'

const SensorActivity = ({ sensorId }: sensorIdType) => {
  const { isLoading, error, data } = useQuery(
    ['sensorActivity', sensorId],
    () =>
      axios
        .get(`http://localhost:3009/sensor/${sensorId}/events`)
        .then((res) => {
          console.log(res.data)
          return res.data
        })
  )
  const ActivityCard = ({
    description,
    eventName,
    time,
  }: sensorActivityType) => {
    return (
      <>
        <Avatar icon={<UserOutlined />} />
        <h1>{description}</h1>
        <span>{eventName}</span>
        <span>{time}</span>
      </>
    )
  }
  return (
    <div className="sensor-activity-container">
      <h1>SENSOR ACTIVITY</h1>
      <Card loading={isLoading}>
        <>
          {!error &&
            data?.results &&
            data.results?.map((activity: sensorActivityType) => (
              <React.Fragment key={activity.time}>
                <ActivityCard
                  time={activity.time}
                  description={activity.description}
                  eventName={activity.event_name}
                />
              </React.Fragment>
            ))}
          {error && <h1>An error has occurred</h1>}
        </>
      </Card>
    </div>
  )
}

export default SensorActivity
