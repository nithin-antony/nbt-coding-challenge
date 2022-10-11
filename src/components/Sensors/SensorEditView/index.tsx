import React, { useState } from 'react'
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  notification,
} from 'antd'
import { CheckCircleOutlined, SaveOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, useLocation } from 'react-router-dom'
import { createSensor } from '../../../api/sensorApi'
import './sensorEditView.css'

const { Option } = Select

const SensorEditView = () => {
  const { state } = useLocation()
  console.log(state)
  const customers = [
    {
      value: 'customer-1',
      name: 'customer-1',
    },
    {
      value: 'customer-2',
      name: 'customer-2',
    },
    {
      value: 'customer-3',
      name: 'customer-3',
    },
    {
      value: 'customer-4',
      name: 'customer-4',
    },
    {
      value: 'customer-5',
      name: 'customer-5',
    },
    {
      value: 'customer-6',
      name: 'customer-6',
    },
    {
      value: 'customer-7',
      name: 'customer-7',
    },
  ]
  const [sensorRegistrationForm, setSensorRegistrationForm] = useState({
    sensorId: state.data.device_id ?? '',
    location: state.data.location ?? '',
    customer: state.data.customer ?? '',
    minTempTreshold: state.data.min_temp_limit ?? 0,
    trackMinTemp: state.data.monitor_min_temp ?? false,
    maxTempTreshold: state.data.max_temp_limit ?? 0,
    trackMaxTemp: state.data.monitor_max_temp ?? false,
  })
  const navigate = useNavigate()

  const { mutate, isLoading } = useMutation(createSensor, {
    onSuccess: () => {
      notification.open({
        message: 'SUCCESS',
        description: 'Sesnsor was updated sucessfully',
        icon: <CheckCircleOutlined style={{ color: '#a0d911' }} />,
      })
      navigate('/')
    },
    onError: () => {
      alert('there was an error')
    },
  })

  const addSensorHandler = () => {
    const payload = {
      customer: sensorRegistrationForm.customer,
      location: sensorRegistrationForm.location,
      min_temp_limit: sensorRegistrationForm.minTempTreshold,
      monitor_min_temp: sensorRegistrationForm.trackMinTemp,
      max_temp_limit: sensorRegistrationForm.trackMaxTemp,
      monitor_max_temp: sensorRegistrationForm.trackMinTemp,
    }
    mutate(payload)
  }

  const cancelHandler = () => {
    navigate('/')
  }

  const addSensorInputHandler = (evt) => {
    setSensorRegistrationForm((prevState) => {
      return {
        ...prevState,
        [evt.target.name]: evt.target.value ?? evt.target.checked,
      }
    })
  }

  const onCustomerChange = (value: string) => {
    setSensorRegistrationForm((prevState) => {
      return {
        ...prevState,
        customer: value,
      }
    })
  }

  const minTempTresholdInputHandler = (value: number) => {
    setSensorRegistrationForm((prevState) => {
      return {
        ...prevState,
        minTempTreshold: value,
      }
    })
  }

  const maxTempTresholdInputHandler = (value: number) => {
    setSensorRegistrationForm((prevState) => {
      return {
        ...prevState,
        maxTempTreshold: value,
      }
    })
  }

  return (
    <>
      <div className="sensor-view">
        <div className="new-sensor">
          <h1>Edit Sensor - {sensorRegistrationForm.sensorId}</h1>
          <Divider />
          <Form layout="vertical">
            <Form.Item label="Sensor ID">
              <h1>{sensorRegistrationForm.sensorId}</h1>
            </Form.Item>
            <Form.Item label="Location">
              <Input
                name="location"
                onChange={addSensorInputHandler}
                value={sensorRegistrationForm.location}
              />
            </Form.Item>
            <Form.Item label="Customer">
              <Select
                onChange={onCustomerChange}
                defaultValue={sensorRegistrationForm.customer ?? ''}
              >
                {customers.map((customer) => (
                  <Option key={customer.value} value={customer.value}>
                    {customer.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </div>
        <div className="sensor-alerts">
          <Form layout="vertical">
            <h1>Alerts</h1>
            <Divider />
            <Form.Item label="Min. Temp. Treshold">
              <InputNumber
                style={{ width: 200 }}
                name="maxTempTreshold"
                onChange={minTempTresholdInputHandler}
              />
            </Form.Item>
            <Form.Item valuePropName="checked">
              <Checkbox name="trackMinTemp" onChange={addSensorInputHandler}>
                Monitor Min Temperature
              </Checkbox>
            </Form.Item>
            <Form.Item label="Max. Temp. Treshold">
              <InputNumber
                style={{ width: 200 }}
                name="maxTempTreshold"
                onChange={maxTempTresholdInputHandler}
              />
            </Form.Item>
            <Form.Item valuePropName="checked">
              <Checkbox name="trackMaxTemp" onChange={addSensorInputHandler}>
                Monitor Max Temperature
              </Checkbox>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Divider />
      <Space>
        <Button
          disabled={isLoading}
          type="primary"
          style={{ width: '150px' }}
          icon={<SaveOutlined />}
          onClick={addSensorHandler}
        >
          Update Sensor
        </Button>
        <Button
          disabled={isLoading}
          type="ghost"
          style={{ width: '150px' }}
          onClick={cancelHandler}
        >
          Cancel
        </Button>
      </Space>
    </>
  )
}

export default SensorEditView
