import { UserOutlined, DesktopOutlined, HomeOutlined, CalendarOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import UserInfo from '../components/UserInfo';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
    const { user } = useSelector((state) => state);
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to="/dashboard/home">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<CalendarOutlined />}>
                        <Link to="/dashboard/calendar">Calendar</Link>
                    </Menu.Item>
                    {user.id === user.team_manager_id &&
                        <Menu.Item key="3" icon={<DesktopOutlined />}>
                            <Link to="/dashboard/team">My Team</Link>
                        </Menu.Item>
                    }
                    <Menu.SubMenu key="sub1" title="User" icon={<UserOutlined />}>
                        <Menu.Item key="sub1-1">
                            <Link to="/dashboard/user1">User1</Link>
                        </Menu.Item>
                        <Menu.Item key="sub1-2">
                            <Link to="/dashboard/user2">User2</Link>
                        </Menu.Item>
                        <Menu.Item key="sub1-3">
                            <Link to="/dashboard/user3">User3</Link>
                        </Menu.Item>
                    </Menu.SubMenu>

                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        display: 'flex', alignItems: 'center',
                        margin: '10px',
                        padding: '10px',
                        background: colorBgContainer,
                    }}
                >
                    <UserInfo user={user} />

                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ?2023 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};
export default Dashboard;
