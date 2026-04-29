'use client';

import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Avatar, 
  Tag, 
  Space, 
  Button, 
  List, 
  Progress, 
  Badge,
  Dropdown,
  Grid,
  MenuProps,
  Drawer,
  Segmented
} from "antd";
import { 
  UserOutlined, 
  TeamOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined,
  StarOutlined,
  EyeOutlined,
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  ArrowUpOutlined,
  MoreOutlined,
  TrophyOutlined,
  HeartOutlined,
  SecurityScanOutlined,
  DashboardOutlined,
  PlusOutlined,
  DownloadOutlined,
  FilterOutlined,
  MenuOutlined,
  CloseOutlined
} from "@ant-design/icons";
import { useState } from "react";

const { useBreakpoint } = Grid;

interface Product {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastActive: string;
  avatarColor: string;
  country: string;
}

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
  icon: React.ReactNode;
  color: string;
}

export default function SimpleDashboard() {
  const screens = useBreakpoint();
  const [timeRange, setTimeRange] = useState<string>('today');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // Dummy data for stats
  const dashboardStats = {
    totalUsers: 1248,
    activeUsers: 894,
    newUsers: 42,
    pendingUsers: 24,
    growthRate: 12.5,
    satisfactionRate: 4.8,
    retentionRate: 87,
    engagementRate: 76
  };

  // Dummy user data
  const users: Product[] = [
    { id: 1, name: 'Alex Johnson', email: 'alex@example.com', role: 'Admin', status: 'active', lastActive: '2 min ago', avatarColor: '#1890ff', country: 'US' },
    { id: 2, name: 'Sarah Miller', email: 'sarah@example.com', role: 'Editor', status: 'active', lastActive: '10 min ago', avatarColor: '#52c41a', country: 'UK' },
    { id: 3, name: 'David Chen', email: 'david@example.com', role: 'Subscriber', status: 'active', lastActive: '15 min ago', avatarColor: '#722ed1', country: 'CA' },
    { id: 4, name: 'Emma Wilson', email: 'emma@example.com', role: 'Viewer', status: 'pending', lastActive: '1 hour ago', avatarColor: '#fa8c16', country: 'AU' },
    { id: 5, name: 'Michael Brown', email: 'michael@example.com', role: 'Admin', status: 'active', lastActive: '2 hours ago', avatarColor: '#f5222d', country: 'US' },
  ];

  // Recent activities
  const recentActivities: Activity[] = [
    { id: 1, user: 'Alex Johnson', action: 'Logged in', time: '2 min ago', icon: <SecurityScanOutlined />, color: '#52c41a' },
    { id: 2, user: 'Sarah Miller', action: 'Updated profile', time: '10 min ago', icon: <EditOutlined />, color: '#1890ff' },
    { id: 3, user: 'David Chen', action: 'Uploaded photo', time: '15 min ago', icon: <HeartOutlined />, color: '#eb2f96' },
    { id: 4, user: 'New Product', action: 'Registered account', time: '25 min ago', icon: <UserOutlined />, color: '#722ed1' },
    { id: 5, user: 'Emma Wilson', action: 'Changed password', time: '1 hour ago', icon: <TrophyOutlined />, color: '#fa8c16' },
  ];

  // Popular countries
  const countries = [
    { name: 'United States', users: 420, percentage: 34, flag: '🇺🇸' },
    { name: 'United Kingdom', users: 198, percentage: 16, flag: '🇬🇧' },
    { name: 'Canada', users: 112, percentage: 9, flag: '🇨🇦' },
    { name: 'Australia', users: 87, percentage: 7, flag: '🇦🇺' },
    { name: 'Germany', users: 64, percentage: 5, flag: '🇩🇪' },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'success';
      case 'inactive': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'active': return <CheckCircleOutlined />;
      case 'inactive': return <ClockCircleOutlined />;
      case 'pending': return <ClockCircleOutlined />;
      default: return null;
    }
  };

  const menuItems: MenuProps['items'] = [
    { key: '1', label: 'Today', icon: <DashboardOutlined /> },
    { key: '2', label: 'This Week', icon: <CalendarOutlined /> },
    { key: '3', label: 'This Month', icon: <CalendarOutlined /> },
    { key: '4', label: 'This Year', icon: <CalendarOutlined /> },
  ];

  // Mobile drawer for actions
  const mobileActionsDrawer = (
    <Drawer
      title="Actions"
      placement="bottom"
      open={showMobileMenu}
      onClose={() => setShowMobileMenu(false)}
      height="auto"
      styles={{ body: { padding: 16 } }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button 
          icon={<FilterOutlined />}
          block
          size="large"
        >
          Filter
        </Button>
        <Button 
          icon={<DownloadOutlined />} 
          type="primary"
          block
          size="large"
        >
          Export Data
        </Button>
        <Button 
          icon={<PlusOutlined />} 
          type="primary"
          block
          size="large"
        >
          Add New Product
        </Button>
      </Space>
    </Drawer>
  );

  return (
    <div style={{ 
      padding: screens.xs ? '12px 8px' : screens.sm ? '16px 12px' : '24px', 
      background: '#f0f2f5', 
      minHeight: '100vh' 
    }}>
      
      {/* Mobile Actions Drawer */}
      {mobileActionsDrawer}

      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: screens.xs ? 'flex-start' : 'center',
        flexDirection: screens.xs ? 'column' : 'row',
        gap: screens.xs ? 12 : 0,
        marginBottom: 24 
      }}>
        <div>
          <h1 style={{ 
            margin: 0, 
            fontSize: screens.xs ? 20 : screens.sm ? 24 : 28, 
            fontWeight: 700,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Product Dashboard
          </h1>
          <p style={{ 
            color: '#666', 
            margin: '4px 0 0 0',
            fontSize: screens.xs ? 13 : 14 
          }}>
            Welcome back! Here's what's happening with your users today.
          </p>
        </div>
        
        {/* Desktop Actions */}
        {!screens.xs ? (
          <Space wrap>
            <Button icon={<FilterOutlined />}>
              Filter
            </Button>
            <Button icon={<DownloadOutlined />} type="primary">
              Export
            </Button>
            <Button icon={<PlusOutlined />} type="primary">
              Add Product
            </Button>
          </Space>
        ) : (
          // Mobile Actions Button
          <div style={{ alignSelf: 'flex-end' }}>
            <Button 
              icon={<MenuOutlined />}
              type="primary"
              shape="circle"
              onClick={() => setShowMobileMenu(true)}
            />
          </div>
        )}
      </div>

      {/* Main Stats Cards */}
      <Row gutter={[12, 12]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            hoverable
            style={{ 
              borderRadius: 12,
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}
            bodyStyle={{ padding: screens.xs ? 16 : 24 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ opacity: 0.9, fontSize: screens.xs ? 12 : 14 }}>Total Products</div>
                <Statistic 
                  value={dashboardStats.totalUsers} 
                  styles={{ 
                    content: { 
                      color: 'white', 
                      fontSize: screens.xs ? 24 : 32 
                    }
                  }}
                  prefix={<TeamOutlined />}
                />
              </div>
              <Avatar 
                size={screens.xs ? 48 : 56}
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)'
                }}
                icon={<TeamOutlined />}
              />
            </div>
            <div style={{ 
              marginTop: 16, 
              fontSize: screens.xs ? 12 : 14, 
              opacity: 0.9,
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}>
              <ArrowUpOutlined /> {dashboardStats.growthRate}% growth this month
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card 
            hoverable
            style={{ 
              borderRadius: 12,
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white'
            }}
            bodyStyle={{ padding: screens.xs ? 16 : 24 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ opacity: 0.9, fontSize: screens.xs ? 12 : 14 }}>Active Products</div>
                <Statistic 
                  value={dashboardStats.activeUsers} 
                  styles={{ 
                    content: { 
                      color: 'white', 
                      fontSize: screens.xs ? 24 : 32 
                    }
                  }}
                  prefix={<CheckCircleOutlined />}
                />
              </div>
              <Avatar 
                size={screens.xs ? 48 : 56}
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)'
                }}
                icon={<CheckCircleOutlined />}
              />
            </div>
            <Progress 
              percent={Math.round((dashboardStats.activeUsers / dashboardStats.totalUsers) * 100)} 
              strokeColor="#fff"
              showInfo={false}
              style={{ marginTop: 16 }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card 
            hoverable
            style={{ 
              borderRadius: 12,
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              color: 'white'
            }}
            bodyStyle={{ padding: screens.xs ? 16 : 24 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ opacity: 0.9, fontSize: screens.xs ? 12 : 14 }}>New Today</div>
                <Statistic 
                  value={dashboardStats.newUsers} 
                  styles={{ 
                    content: { 
                      color: 'white', 
                      fontSize: screens.xs ? 24 : 32 
                    }
                  }}
                  prefix={<UserOutlined />}
                />
              </div>
              <Avatar 
                size={screens.xs ? 48 : 56}
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)'
                }}
                icon={<UserOutlined />}
              />
            </div>
            <div style={{ 
              marginTop: 16, 
              fontSize: screens.xs ? 12 : 14, 
              opacity: 0.9 
            }}>
              {dashboardStats.retentionRate}% retention rate
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card 
            hoverable
            style={{ 
              borderRadius: 12,
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
              background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              color: 'white'
            }}
            bodyStyle={{ padding: screens.xs ? 16 : 24 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ opacity: 0.9, fontSize: screens.xs ? 12 : 14 }}>Satisfaction</div>
                <Statistic 
                  value={dashboardStats.satisfactionRate} 
                  styles={{ 
                    content: { 
                      color: 'white', 
                      fontSize: screens.xs ? 24 : 32 
                    }
                  }}
                  prefix={<StarOutlined />}
                  suffix="/5"
                />
              </div>
              <Avatar 
                size={screens.xs ? 48 : 56}
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)'
                }}
                icon={<StarOutlined />}
              />
            </div>
            <div style={{ 
              marginTop: 16, 
              fontSize: screens.xs ? 12 : 14, 
              opacity: 0.9 
            }}>
              {dashboardStats.engagementRate}% engagement rate
            </div>
          </Card>
        </Col>
      </Row>

      {/* View Mode Toggle for Mobile */}
      {screens.xs && (
        <div style={{ marginBottom: 16 }}>
          <Segmented
            options={[
              { label: 'List View', value: 'list' },
              { label: 'Grid View', value: 'grid' },
            ]}
            value={viewMode}
            onChange={setViewMode}
            block
          />
        </div>
      )}

      {/* Product List and Activities */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card 
            title={
              <Space>
                <TeamOutlined />
                <span style={{ fontSize: screens.xs ? 14 : 16 }}>Recent Products</span>
                <Tag color="blue" style={{ marginLeft: 8 }}>{users.length} total</Tag>
              </Space>
            }
            style={{ 
              borderRadius: 12,
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.09)'
            }}
            bodyStyle={{ padding: screens.xs ? 12 : 24 }}
            extra={
              screens.xs ? null : (
                <Dropdown menu={{ items: menuItems }}>
                  <Button type="text" icon={<MoreOutlined />} />
                </Dropdown>
              )
            }
          >
            <List
              dataSource={users}
              renderItem={(user) => (
                <List.Item
                  style={{ 
                    padding: screens.xs ? '12px 0' : '16px 0',
                    borderBottom: '1px solid #f0f0f0'
                  }}
                  actions={screens.xs ? [] : [
                    <Button key="view" type="text" icon={<EyeOutlined />} size="small" />,
                    <Button key="edit" type="text" icon={<EditOutlined />} size="small" />
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        size={screens.xs ? 40 : 48}
                        style={{ backgroundColor: user.avatarColor }}
                      >
                        {user.name.charAt(0)}
                      </Avatar>
                    }
                    title={
                      <div style={{ fontSize: screens.xs ? 14 : 16 }}>
                        <Space wrap size={4}>
                          <span>{user.name}</span>
                          <Tag 
                            icon={getStatusIcon(user.status)} 
                            color={getStatusColor(user.status)}
                            style={{ 
                              fontSize: screens.xs ? 10 : 12,
                              padding: screens.xs ? '0 4px' : '2px 8px'
                            }}
                          >
                            {user.status.toUpperCase()}
                          </Tag>
                        </Space>
                      </div>
                    }
                    description={
                      <Space direction="vertical" size={0} style={{ marginTop: 4 }}>
                        <Space size={4}>
                          <MailOutlined style={{ color: '#666', fontSize: screens.xs ? 10 : 12 }} />
                          <span style={{ fontSize: screens.xs ? 11 : 13 }}>{user.email}</span>
                        </Space>
                        <Space size={4} style={{ marginTop: 2 }}>
                          <EnvironmentOutlined style={{ color: '#666', fontSize: screens.xs ? 10 : 12 }} />
                          <span style={{ fontSize: screens.xs ? 11 : 13 }}>{user.country}</span>
                          <Tag 
                            color="blue" 
                            style={{ 
                              fontSize: screens.xs ? 10 : 12,
                              padding: screens.xs ? '0 4px' : '2px 8px'
                            }}
                          >
                            {user.role}
                          </Tag>
                        </Space>
                        <Space size={4} style={{ marginTop: 2 }}>
                          <ClockCircleOutlined style={{ color: '#666', fontSize: screens.xs ? 10 : 12 }} />
                          <span style={{ fontSize: screens.xs ? 11 : 13, color: '#999' }}>
                            Last active: {user.lastActive}
                          </span>
                        </Space>
                      </Space>
                    }
                  />
                  {/* {screens.xs && (
                    <div style={{ marginTop: 8 }}>
                      <Space>
                        <Button size="small" icon={<EyeOutlined />} />
                        <Button size="small" icon={<EditOutlined />} />
                      </Space>
                    </div>
                  )} */}
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card 
            title={
              <Space>
                <ClockCircleOutlined />
                <span style={{ fontSize: screens.xs ? 14 : 16 }}>Recent Activities</span>
              </Space>
            }
            style={{ 
              borderRadius: 12,
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
              marginBottom: 16
            }}
            bodyStyle={{ padding: screens.xs ? 12 : 24 }}
          >
            <List
              dataSource={recentActivities}
              renderItem={(activity) => (
                <List.Item
                  style={{ 
                    padding: screens.xs ? '12px 0' : '16px 0',
                    borderBottom: '1px solid #f0f0f0'
                  }}
                >
                  <Space align="start" size={screens.xs ? 8 : 12}>
                    <Badge 
                      count={activity.icon} 
                      style={{ 
                        backgroundColor: activity.color,
                        color: 'white',
                        fontSize: screens.xs ? 10 : 12
                      }}
                    />
                    <div>
                      <div style={{ 
                        fontWeight: 500,
                        fontSize: screens.xs ? 13 : 14
                      }}>
                        {activity.user}
                        <span style={{ 
                          marginLeft: 8, 
                          color: '#666', 
                          fontSize: screens.xs ? 11 : 12,
                          fontWeight: 'normal'
                        }}>
                          {activity.time}
                        </span>
                      </div>
                      <div style={{ 
                        color: '#666', 
                        fontSize: screens.xs ? 12 : 13 
                      }}>
                        {activity.action}
                      </div>
                    </div>
                  </Space>
                </List.Item>
              )}
            />
          </Card>

          <Card 
            title={
              <Space>
                <EnvironmentOutlined />
                <span style={{ fontSize: screens.xs ? 14 : 16 }}>Top Countries</span>
              </Space>
            }
            style={{ 
              borderRadius: 12,
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.09)'
            }}
            bodyStyle={{ padding: screens.xs ? 12 : 24 }}
          >
            <List
              dataSource={countries}
              renderItem={(country) => (
                <List.Item
                  style={{ 
                    padding: screens.xs ? '12px 0' : '16px 0',
                    borderBottom: '1px solid #f0f0f0'
                  }}
                  extra={
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ 
                        fontWeight: 600,
                        fontSize: screens.xs ? 13 : 14 
                      }}>
                        {country.users} users
                      </div>
                      <div style={{ 
                        fontSize: screens.xs ? 11 : 12, 
                        color: '#666' 
                      }}>
                        {country.percentage}%
                      </div>
                    </div>
                  }
                >
                  <List.Item.Meta
                    avatar={
                      <span style={{ fontSize: screens.xs ? 20 : 24 }}>{country.flag}</span>
                    }
                    title={
                      <span style={{ fontSize: screens.xs ? 13 : 14 }}>{country.name}</span>
                    }
                    description={
                      <Progress 
                        percent={country.percentage} 
                        size="small" 
                        strokeColor="#1890ff"
                        showInfo={false}
                        style={{ marginTop: 4 }}
                      />
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Bottom Stats Cards */}
      <Row gutter={[12, 12]} style={{ marginTop: 24 }}>
        <Col xs={24} md={8}>
          <Card 
            style={{ 
              borderRadius: 12,
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
              background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
            }}
            bodyStyle={{ padding: screens.xs ? 16 : 24 }}
          >
            <Statistic
              title="Monthly Target"
              value={23}
              suffix="%"
              prefix={<TrophyOutlined />}
              styles={{
                title: { fontSize: screens.xs ? 12 : 14 },
                content: { fontSize: screens.xs ? 24 : 32 }
              }}
            />
            <Progress 
              percent={50} 
              strokeColor="#1890ff"
              style={{ marginTop: 16 }}
            />
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card 
            style={{ 
              borderRadius: 12,
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
              background: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)'
            }}
            bodyStyle={{ padding: screens.xs ? 16 : 24 }}
          >
            <Statistic
              title="Engagement Rate"
              value={dashboardStats.engagementRate}
              suffix="%"
              prefix={<HeartOutlined />}
              styles={{
                title: { fontSize: screens.xs ? 12 : 14 },
                content: { 
                  color: '#eb2f96',
                  fontSize: screens.xs ? 24 : 32 
                }
              }}
            />
            <div style={{ 
              marginTop: 16, 
              fontSize: screens.xs ? 12 : 14, 
              color: '#666',
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}>
              <ArrowUpOutlined style={{ color: '#52c41a' }} />
              3.2% increase from last week
            </div>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card 
            style={{ 
              borderRadius: 12,
              border: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
              background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)'
            }}
            bodyStyle={{ padding: screens.xs ? 16 : 24 }}
          >
            <Statistic
              title="Pending Products"
              value={dashboardStats.pendingUsers}
              prefix={<ClockCircleOutlined />}
              styles={{
                title: { fontSize: screens.xs ? 12 : 14 },
                content: { 
                  color: '#fa8c16',
                  fontSize: screens.xs ? 24 : 32 
                }
              }}
            />
            <div style={{ 
              marginTop: 16, 
              fontSize: screens.xs ? 12 : 14, 
              color: '#666' 
            }}>
              Need verification and approval
            </div>
          </Card>
        </Col>
      </Row>

      {/* Footer */}
      <div style={{ 
        marginTop: 32, 
        paddingTop: 16, 
        borderTop: '1px solid #f0f0f0',
        textAlign: 'center',
        color: '#666',
        fontSize: screens.xs ? 12 : 14
      }}>
        <Space 
          direction={screens.xs ? 'vertical' : 'horizontal'} 
          size={screens.xs ? 4 : 8}
        >
          <DashboardOutlined />
          <span>Last updated: Today at 14:30</span>
          {!screens.xs && <span>•</span>}
          <span>Data refreshes every 5 minutes</span>
        </Space>
      </div>
    </div>
  );
}