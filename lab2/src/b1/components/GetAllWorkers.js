import React, {useEffect, useState} from 'react';
import {Button, Form} from 'antd';
import { fetchWorkers } from "../api/API-b1";
import WorkersTable from "../form/WorkersTable";

const GetAllWorkers = () => {

    const [loading, setLoading] = useState(false);
    const [workers, setWorkers] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [sorters, setSorters] = useState('');
    const [filters, setFilters] = useState('');

    const handleSearch = async (sorterString = sorters, urlParams = filters) => {
        setLoading(true);
        setSorters(sorterString);
        setFilters(urlParams);
        // console.log("sorters: ",sorterString);
        // console.log("urlParams: ",urlParams);

        try {
            const workers = await fetchWorkers(sorterString, urlParams); // 获取工人数据
            setWorkers(workers);
            setShowTable(true); // 显示表格
        } catch (error) {
            console.error('Failed to fetch workers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // 在排序或过滤条件改变时重新触发搜索
        if (sorters || filters) {
            handleSearch(sorters, filters)
        }
    }, [sorters, filters]);

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
                    onSorterChange={(sorterString) => handleSearch(sorterString, filters)} // 排序触发
                    onFilterChange={(urlParams) => handleSearch(sorters, urlParams)} // 过滤触发
                    onFilterSubmit={(filterInput) => handleSearch(filters, filterInput)}
                />
            )}
        </Form.Item>
    );
};

export default GetAllWorkers;
