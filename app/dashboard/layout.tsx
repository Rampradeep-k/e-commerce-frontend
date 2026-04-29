'use client';

import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import Sidebar from '../components/atoms/Sidebar/page';
import AppHeader from '../components/atoms/Header/page';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const { Content } = Layout;


export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;   /* 👈 control dashboard width */
  margin: 0 auto;     /* 👈 center horizontally */
  padding: 16px;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  // ✅ client-only logic
  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(auth);

    if (!auth) {
      router.replace('/login');
    }
  }, [router]);

  // ⛔ prevents hydration mismatch
  if (isAuthenticated === null) return null;

  if (!isAuthenticated) return null;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar isOpen={isSidebarOpen} />

      <Layout style={{ overflow: "hidden" }}>
        <AppHeader
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
        />

        <Content
          style={{
            margin: 16,
            padding: 16,
            background: '#fff',
            minHeight: 'calc(100vh - 64px)',
            overflow: 'auto'
          }}
        >
          <ContentWrapper>
            {children}
          </ContentWrapper>

        </Content>

      </Layout>
    </Layout>
  );
}
