import React from 'react'
import './sensorAddView.css'
import { Button, Checkbox, Divider, Form, Input } from 'antd'
import { SaveOutlined } from '@ant-design/icons'

const SensorAddView = () => {
  return (
    <>
      <div className="sensor-view">
        <div className="new-sensor">
          <h1>New Sensor</h1>
          <Divider />
          <Form layout="vertical" name="CreateBidder">
            <Form.Item label="Sensor ID">
              <Input />
            </Form.Item>
            <Form.Item label="Location">
              <Input />
            </Form.Item>
          </Form>
        </div>
        <div className="sensor-alerts">
          <Form layout="vertical" name="CreateBidder">
            <h1>Alerts</h1>
            <Divider />
            <Form.Item label="Min. Temp. Treshold">
              <Input />
            </Form.Item>
            <Form.Item name="trackMinTemp" valuePropName="checked">
              <Checkbox>Monitor Min Temperature</Checkbox>
            </Form.Item>
            <Form.Item label="Max. Temp. Treshold">
              <Input />
            </Form.Item>
            <Form.Item name="trackMaxTemp" valuePropName="checked">
              <Checkbox>Monitor Max Temperature</Checkbox>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Divider />
      <Button
        type="primary"
        style={{ width: '150px' }}
        htmlType="submit"
        icon={<SaveOutlined />}
      >
        Add Sensor
      </Button>
      <Button
        type="ghost"
        style={{ width: '150px' }}
        htmlType="submit"
        icon={<SaveOutlined />}
      >
        Add Sensor
      </Button>
    </>
  )
}

export default SensorAddView
