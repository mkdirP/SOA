import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { filterWorkersBySalary } from '../api/API-b1';
import WorkersTable from '../form/WorkersTable';

const FilterWorkerBySalary = () => {
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [sorters, setSorters] = useState('');
    const [filters, setFilters] = useState('');
    const [salary, setSalary] = useState(null); // 保持 salary 状态

    useEffect(() => {
        // 每次 sorters 或 filters 更新时重新触发搜索
        if (sorters || filters || salary !== null) {
            fetchWorkersBySalary(salary, sorters, filters); // 确保传递当前的 salary
        }
    }, [sorters, filters, salary]); // 将 salary 加入依赖

    const fetchWorkersBySalary = async (salaryValue, sorterString = sorters, urlParams = filters) => {
        setLoading(true);
        setSorters(sorterString);
        setFilters(urlParams);

        try {
            const workers = await filterWorkersBySalary(salaryValue, sorterString, urlParams);
            setWorkers(workers);
            setShowTable(true); // 显示表格
        } catch (error) {
            notification.error({ message: 'Failed to filter workers' });
        } finally {
            setLoading(false);
        }
    };

    // !!!!!
    const handleFormSubmit = (values) => {
        setSalary(values.salary); // 提交表单时设置 salary
        fetchWorkersBySalary(values.salary, sorters, filters); // 调用函数时传递 salary
    };

    return (
        <div>
            <h2>Filter Worker By Salary</h2>
            <Form layout="vertical" onFinish={handleFormSubmit}>
                <Form.Item
                    label="Salary less than"
                    name="salary"
                    rules={[{ required: true, message: 'Please input the salary' },
                        {
                            validator(_, value) {
                                if (!value || (Number.isInteger(Number(value)) && Number(value) > 0)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Salary must be a positive integer'));
                            },
                        },]}
                    style={{  width: '20%' }}
                >
                    <Input type="number"/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Filter
                    </Button>
                </Form.Item>
            </Form>

            {showTable && (
                <WorkersTable
                    dataSource={workers}
                    loading={loading}
                    onSorterChange={(sorterString) => fetchWorkersBySalary(salary, sorterString, filters)} 
                    onFilterChange={(urlParams) => fetchWorkersBySalary(salary, sorters, urlParams)} // 保持当前 salary
                    onFilterSubmit={(filterInput) => fetchWorkersBySalary(salary, sorters, filterInput)}
                />
            )}
        </div>
    );
};
// onFilterSubmit {/*当用户更改排序条件时，通知父组件更新排序条件，并保持 salary 和 filters 状态不变。*/}
export default FilterWorkerBySalary;
