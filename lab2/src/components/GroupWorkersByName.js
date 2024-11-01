import React, { useState } from 'react';
import { Button, Table, notification } from 'antd';
import { groupWorkersByName } from '../api/API';

const GroupWorkersByName = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchGroups = async () => {
        setLoading(true);
        try {
            const response = await groupWorkersByName();
            setGroups(response);
        } catch (error) {
            notification.error({ message: 'Failed to group workers' });
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { title: 'Name', dataIndex: 'name' },
        { title: 'Count', dataIndex: 'count' },
    ];

    return (
        <div>
            <h2>Count Workers Group By Name</h2>
            <Button type="primary" onClick={fetchGroups} loading={loading}>
                Group Workers By Name
            </Button>
            <Table columns={columns} dataSource={groups} rowKey="name" loading={loading} />
        </div>
    );
};

export default GroupWorkersByName;
