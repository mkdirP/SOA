import React from 'react';
import { Layout, Menu } from 'antd';
import AddWorker from './b1/components/AddWorker';
import GetWorker from './b1/components/GetWorkerById';
import UpdateWorkerById from './b1/components/UpdateWorkerById';
import FilterWorkerBySalary from './b1/components/FilterWorkerBySalary';
import GroupWorkersByName from './b1/components/GroupWorkersByName';
import AverageSalary from './b1/components/AvgSalary';
import DeleteWorkerById from "./b1/components/DeleteWorkerById";
import WorkersList from "./b1/components/WorkersList";
import FireEmployee from "./b2/components/FireEmployee";
import MoveEmployee from "./b2/components/MoveEmployee";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const App = () => {
    const [selectedKey, setSelectedKey] = React.useState('1');

    const renderContent = () => {
        switch (selectedKey) {
            case '1':
                return <WorkersList />;
            case '2':
                return <AddWorker />;
            case '3':
                return <GetWorker />;
            case '4':
                return <UpdateWorkerById />;
            case '5':
                return <FilterWorkerBySalary />;
            case '6':
                return <GroupWorkersByName />;
            case '7':
                return <AverageSalary />;
            case '8':
                return <DeleteWorkerById />;
            case '9':
                return <FireEmployee />;
            case '10':
                return <MoveEmployee />
            default:
                return null;
        }
    };

    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} onSelect={({ key }) => setSelectedKey(key)}>
                    <SubMenu key="sub1" title="WORKER">
                        <Menu.Item key="1">Workers List</Menu.Item>
                        <Menu.Item key="2">Add Worker</Menu.Item>
                        <Menu.Item key="3">Get Worker by ID</Menu.Item>
                        <Menu.Item key="4">Update Worker by ID</Menu.Item>
                        <Menu.Item key="5">Filter by Salary</Menu.Item>
                        <Menu.Item key="6">Group by Name</Menu.Item>
                        <Menu.Item key="7">Average Salary</Menu.Item>
                        <Menu.Item key="8">Delete Worker by ID</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title="HR">
                        <Menu.Item key="9">Fire Employee</Menu.Item>
                        <Menu.Item key="10">Move Employee</Menu.Item>
                    </SubMenu>
                </Menu>
            </Header>
            <Layout>
                <Sider width={50} className="site-layout-background" />
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                        className="site-layout-background"
                        style={{ padding: 24, margin: 0, minHeight: 750 }}
                    >
                        {renderContent()}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default App;
