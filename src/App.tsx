/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  FieldTimeOutlined,
  ProfileOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import SensorAddView from './components/Sensors/SensorAddView'
import SensorsDetails from './components/Sensors/SensorDetails'
import './style.css'

const { Header, Sider, Content } = Layout

const queryClient = new QueryClient()

const App = () => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />{' '}
        <Menu theme="dark" defaultSelectedKeys={['dash']} mode="inline">
          <Menu.Item key="dash" icon={<DashboardOutlined />}>
            <Link to="/">DASHBOARD</Link>
          </Menu.Item>
          <Menu.Item key="reports" icon={<ProfileOutlined />}>
            <Link to="/reports">REPORTS</Link>
          </Menu.Item>
          <Menu.Item key="sensor" icon={<FieldTimeOutlined />}>
            <Link to="/sensor">SENSORS</Link>
          </Menu.Item>
          <Menu.Item key="users" icon={<UsergroupAddOutlined />}>
            <Link to="/sensors">USERS</Link>
          </Menu.Item>
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            <Link to="/sensors">SETTINGS</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <span className="trigger" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 590,
          }}
        >
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/sensor" element={<SensorAddView />} />
              <Route path="/sensor/:id" element={<SensorsDetails />} />
            </Routes>
          </QueryClientProvider>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
