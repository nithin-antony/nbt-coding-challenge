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
import { useNavigate } from 'react-router-dom'
import { createSensor } from '../../../api/sensorApi'
import './sensorAddView.css'

const { Option } = Select

const SensorAddView = () => {
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
    sendorId: '',
    location: '',
    customer: '',
    minTempTreshold: 0,
    trackMinTemp: false,
    maxTempTreshold: 0,
    trackMaxTemp: false,
  })
  const navigate = useNavigate()

  const { mutate, isLoading } = useMutation(createSensor, {
    onSuccess: (data) => {
      console.log(data)
      notification.open({
        message: 'SUCCESS',
        description: 'New Sesnsor was created sucessfully',
        icon: <CheckCircleOutlined style={{ color: '#a0d911' }} />,
      })
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
          <h1>New Sensor</h1>
          <Divider />
          <Form layout="vertical">
            <Form.Item label="Sensor ID">
              <Input
                name="sendorId"
                onChange={addSensorInputHandler}
                value={sensorRegistrationForm.sendorId}
              />
            </Form.Item>
            <Form.Item label="Location">
              <Input
                name="location"
                onChange={addSensorInputHandler}
                value={sensorRegistrationForm.location}
              />
            </Form.Item>
            <Form.Item label="Customer">
              <Select onChange={onCustomerChange}>
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
              {/* <Input name="minTempTreshold" onChange={addSensorInputHandler} /> */}
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
          Add Sensor
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

export default SensorAddView
