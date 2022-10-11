import React, { useState } from 'react'
import { Button, Card, Dropdown, Menu, Modal, Pagination, Table } from 'antd'
import type { PaginationProps, MenuProps } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import moment from 'moment'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getSensors, deleteSensor } from '../../../api/sensorApi'

const { confirm } = Modal

interface DataType {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

const SensorsList = () => {
  const [page, setPage] = useState(1)
  const { isLoading, isError, error, data } = useQuery(
    ['sensorsByPage', page],
    () => getSensors(page),
    {
      keepPreviousData: true,
    }
  )

  const navigate = useNavigate()
  const sensorDetailsHandler = (id: string) => {
    navigate(`/sensor/${id}`, { state: { sensorId: id } })
  }

  const showDeleteConfirm = (deviceId: string) => {
    confirm({
      title: 'Are you sure delete this device?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK')
        deleteSensor(deviceId)
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const onMenuClick: MenuProps['onClick'] = (evt, record) => {
    console.log('click', evt, record)
    const action = evt.key
    switch (action) {
      case 'delete':
        showDeleteConfirm(record.device_id)
        return
      case 'edit':
        navigate(`/sensor-edit/${record.device_id}`, {
          state: { data: record },
        })
        return
      default:
        return
    }
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Sensor ID',
      dataIndex: 'device_id',
      key: 'device_id',
      render: (sensorId) => <b>{sensorId}</b>,
    },
    {
      title: 'last_online',
      dataIndex: 'last_online',
      key: 'last_online',
      render: (lastOnline) => (
        <div>
          {moment(Number(lastOnline)).format('DD MMM YYYY')}
          <p>Last Online</p>
        </div>
      ),
    },
    {
      title: 'last_temp',
      dataIndex: 'last_temp',
      key: 'last_temp',
      render: (lastTemp) => (
        <div>
          {lastTemp}
          <p>Temp</p>
        </div>
      ),
    },
    {
      title: 'location',
      dataIndex: 'location',
      key: 'location',
      render: (location) => (
        <div>
          {location}
          <p>Location</p>
        </div>
      ),
    },
    {
      title: 'device_id',
      // dataIndex: 'device_id',
      key: 'device_id',
      render: (record) => {
        const menu = (
          <Menu
            onClick={(evt) => onMenuClick(evt, record)}
            items={[
              {
                key: 'delete',
                label: 'Delete',
              },
              {
                key: 'edit',
                label: 'Edit',
              },
            ]}
          />
        )

        return <Dropdown.Button overlay={menu}>Actions</Dropdown.Button>
      },
    },
    {
      title: 'device_id',
      dataIndex: 'device_id',
      key: 'device_id',
      render: (deviceId) => (
        <Button type="primary" onClick={() => sensorDetailsHandler(deviceId)}>
          Details
        </Button>
      ),
    },
  ]

  const onChange: PaginationProps['onChange'] = (page) => {
    console.log(page)
    setPage(page)
  }

  return (
    <>
      <h1>SENSOR LIST</h1>
      <Card>
        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error: {error.message}</div>
          ) : (
            <div>
              <Table
                columns={columns}
                dataSource={data.results}
                showHeader={false}
                pagination={false}
              />
              <Pagination
                onChange={onChange}
                defaultCurrent={page}
                total={data.paging.count}
                showSizeChanger={false}
                pageSize={data.paging.pageSize}
              />
            </div>
          )}
        </div>
      </Card>
    </>
  )
}

export default SensorsList
