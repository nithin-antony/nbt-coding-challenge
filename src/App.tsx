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
const { Header, Sider, Content } = Layout
import './style.css'

const App = () => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />{' '}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: 'DASHBOARD',
            },
            {
              key: '2',
              icon: <ProfileOutlined />,
              label: 'REPORTS',
            },
            {
              key: '3',
              icon: <FieldTimeOutlined />,
              label: 'SENSORS',
            },
            {
              key: '4',
              icon: <UsergroupAddOutlined />,
              label: 'USERS',
            },
            {
              key: '5',
              icon: <SettingOutlined />,
              label: 'SETTINGS',
            },
          ]}
        />
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
          Content
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
