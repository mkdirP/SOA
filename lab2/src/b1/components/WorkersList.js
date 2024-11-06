import React, { useState } from 'react';
import {Button, Form} from 'antd';
import { fetchWorkers } from "../api/API-b1";
import WorkersTable from "../form/WorkersTable";
import {filterAndSortData, renderFilterDropdown, useSortAndFilter} from "../util/sort-filter";

const WorkersList = () => {

    const [loading, setLoading] = useState(false);
    const [workers, setWorkers] = useState([]);
    const [showTable, setShowTable] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const workers = await fetchWorkers(); // 获取工人数据
            setWorkers(workers);
            setShowTable(true); // 显示表格
        } catch (error) {
            console.error('Failed to fetch workers:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form.Item>
            <h2>All Workers</h2>
            <Button type="primary" onClick={handleSearch} style={{ marginBottom: 16 }}>
                Fetch Workers
            </Button>

            {showTable && (
                <WorkersTable
                    dataSource={workers}
                    loading={loading}
                />
            )}
        </Form.Item>
    );
};

export default WorkersList;
