import React from 'react'
import { Avatar, Card } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { UserOutlined } from '@ant-design/icons'
import moment from 'moment'
import { getSensorActivity } from '../../../api/sensorApi'
import { sensorActivityType, sensorIdType } from '../../../types/types'
import './SensorActivity.css'

const SensorActivity = ({ sensorId }: sensorIdType) => {
  const { isLoading, error, data } = useQuery(
    ['sensorActivity', sensorId],
    () => getSensorActivity(sensorId)
  )

  const ActivityCard = ({
    description,
    eventName,
    time,
  }: sensorActivityType) => {
    return (
      <>
        <div className="sensor-activity">
          <Avatar icon={<UserOutlined />} />
          <div className="sensor-activity_info">
            <span>{eventName.replaceAll('_', ' ')}</span>
            <span>{moment(Number(time)).fromNow()}</span>
          </div>
        </div>
        <p className="sensor-activity_discription">{description}</p>
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
