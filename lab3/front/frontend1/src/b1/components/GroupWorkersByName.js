import React, {useEffect, useState} from 'react';
import {Button, Table, notification, Form} from 'antd';
import { groupWorkersByName } from '../api/API-b1';
import WorkersTable from "../form/WorkersTable";
import GroupByNameTable from "../form/GroupByNameTable";

const GroupWorkersByName = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [sorters, setSorters] = useState('');
    const [filters, setFilters] = useState('');

    const fetchGroups = async (sorterString = sorters, urlParams = filters) => {
        setLoading(true);

        setSorters(sorterString);
        setFilters(urlParams);

        try {
            const response = await groupWorkersByName(sorterString, urlParams);
            setGroups(response);
            console.log("group", groups)
            setShowTable(true);
        } catch (error) {
            notification.error({ message: 'Failed to group workers' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // 在排序或过滤条件改变时重新触发搜索
        if (sorters || filters) {
            fetchGroups(sorters, filters)
        }
    }, [sorters, filters]);

    return (
        <Form.Item>
            <h2>Count Workers Group By Name</h2>
            <Button type="primary" onClick={fetchGroups} loading={loading}>
                Group Workers By Name
            </Button>

            {showTable && (
                <GroupByNameTable
                    dataSource={groups}
                    loading={loading}
                    onSorterChange={(sorterString) => fetchGroups(sorterString, filters)} // 排序触发
                    onFilterChange={(urlParams) => fetchGroups(sorters, urlParams)} // 过滤触发
                    onFilterSubmit={(filterInput) => fetchGroups(filters, filterInput)}
                />
            )}
        </Form.Item>
    );
};

export default GroupWorkersByName;
