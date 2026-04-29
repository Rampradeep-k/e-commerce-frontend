'use client';

import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';

const { Sider } = Layout;

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sider
      collapsible
      collapsed={!isOpen}
      trigger={null}
      width={240}
      collapsedWidth={80}
    >
      {/* Logo Section */}
      <div
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: isOpen ? 'flex-start' : 'center',
          paddingLeft: isOpen ? 16 : 0,
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 18,
        }}
      >
        {isOpen ? 'Admin panel' : '🅰️'}
      </div>

      {/* Menu */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[pathname]}
        items={[
          {
            key: '/dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
          },
          {
            key: '/dashboard/products',
            icon: <UserOutlined />,
            label: 'Products',
          },
         /*  {
            key: '/dashboard/settings',
            icon: <SettingOutlined />,
            label: 'Settings',
          }, */
        ]}
        onClick={({ key }) => router.push(key)}
      />
    </Sider>
  );
}
