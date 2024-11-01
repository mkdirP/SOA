import React, { useState } from 'react';
import {Form, Input, Button, Table, notification, Space} from 'antd';
import { filterWorkersBySalary } from '../api/API';
import WorkersTable from '../form/WorkersTable'; // 导入 WorkerTable 组件

const FilterWorkerBySalary = () => {
    const [workers, setWorkers] = useState([
        {
            id: 1,
            name: 'Alice',
            coordinates: { x: 35, y: 20 },
            creationDate: '2024-01-01',
            salary: 50000,
            startDate: '2022-03-15',
            endDate: '2023-12-30',
            status: 'Active',
            person: { weight: 65, passportID: 'A1234567', eyeColor: 'Blue', hairColor: 'Blonde' },
        },
        {
            id: 2,
            name: 'Alla',
            coordinates: { x: 90, y: 80 },
            creationDate: '2024-01-01',
            salary: 120000,
            startDate: '2022-03-15',
            endDate: '2023-12-30',
            status: 'Active',
            person: { weight: 167, passportID: 'A1234567', eyeColor: 'Blue', hairColor: 'Blonde' },
        },
        {
            id: 3,
            name: 'Alla',
            coordinates: { x: 90, y: 40 },
            creationDate: '2024-01-01',
            salary: 4000000,
            startDate: '2022-03-15',
            endDate: '2020-12-30',
            status: 'Active',
            person: { weight: 167, passportID: 'A1234567', eyeColor: 'Blue', hairColor: 'Blonde' },
        },
        {
            id: 4,
            name: 'Kalla',
            coordinates: { x: 80, y: 10 },
            creationDate: '2024-01-01',
            salary: 10000,
            startDate: '2022-03-15',
            endDate: '2023-12-30',
            status: 'Active',
            person: { weight: 188, passportID: 'A1234567', eyeColor: 'Blue', hairColor: 'Blonde' },
        },
    ]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [sorter, setSorter] = useState({});
    const [filters, setFilters] = useState({});
    const [inputValues, setInputValues] = useState({}); // 新增状态，用于存储输入框值
    const [salaryFilter, setSalaryFilter] = useState('');

    const filteredWorkers = workers.filter(worker => {
        return !isNaN(Number(salaryFilter)) ? worker.salary < Number(salaryFilter) : true;
    });

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await filterWorkersBySalary(values.salary);
            setWorkers(response);
        } catch (error) {
            notification.error({ message: 'Failed to filter workers' });
        } finally {
            setLoading(false);
        }
    };

    // 处理过滤条件的更新
    const handleFilterChange = (field, condition, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [field]: {
                condition,
                value: !isNaN(Number(value)) ? Number(value) : value // 如果是有效数字，使用数字；否则使用原值
            },
        }));
    };

    // 更新输入框的值
    const handleInputChange = (field, value) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            [field]: value,
        }));
    };

    // 删除过滤器和清空输入框
    const handleDeleteFilter = (field) => {
        handleFilterChange(field, null, null); // 删除过滤器
        handleInputChange(field, ''); // 清空输入框
    };

    // 数据过滤和排序
    const filteredAndSortedData = workers
        .filter((worker) => {
            return Object.keys(filters).every((field) => {
                const { condition, value } = filters[field];
                const fieldValue = field.includes('.')
                    ? field.split('.').reduce((o, i) => o[i], worker)
                    : worker[field];
                switch (condition) {
                    case 'eq': return fieldValue === value;
                    case 'ne': return fieldValue !== value;
                    case 'gt': return fieldValue > value;
                    case 'lt': return fieldValue < value;
                    case 'gte': return fieldValue >= value;
                    case 'lte': return fieldValue <= value;
                    default: return true;
                }
            });
        })
        .sort((a, b) => {
            let result = 0;
            if (sorter.field) {
                const fieldValueA = sorter.field.includes('.')
                    ? sorter.field.split('.').reduce((o, i) => o[i], a)
                    : a[sorter.field];
                const fieldValueB = sorter.field.includes('.')
                    ? sorter.field.split('.').reduce((o, i) => o[i], b)
                    : b[sorter.field];

                if (sorter.order === 'ascend') {
                    result = fieldValueA > fieldValueB ? 1 : -1;
                } else if (sorter.order === 'descend') {
                    result = fieldValueA < fieldValueB ? 1 : -1;
                }
            }
            return result;
        });

    // const paginatedData = filteredAndSortedData.slice(
    //     (pagination.current - 1) * pagination.pageSize,
    //     pagination.current * pagination.pageSize
    // );

    // 渲染列的过滤器
    const renderFilterDropdown = (field) => (
        <div style={{ padding: 8 }}>
            <Input
                placeholder={`${field} (eq|ne|gt|lt|gte|lte)=value`}
                value={inputValues[field] || ''} // 绑定输入框值
                onChange={(e) => {
                    const value = e.target.value;
                    handleInputChange(field, value); // 更新输入框值
                    const [condition, filterValue] = value.split('=');
                    handleFilterChange(field, condition, filterValue);
                }}
                // onChange={(e) => {
                //     const [condition, value] = e.target.value.split('=');
                //     handleFilterChange(field, condition, value);
                // }}
                style={{ marginBottom: 8, display: 'block' }}
            />
            <Button
                type="danger"
                onClick={() => {
                    // handleFilterChange(field, null, null); // 删除过滤器
                    handleDeleteFilter(field)
                }}
                size="small"
                style={{ width: '100%' }}
            >
                Delete Filter
            </Button>
        </div>
    );

    return (
        <Form.Item>
            <h2>Filter Worker By Salary</h2>
            <Form.Item label="Salary less than" name="salary" rules={[{ required: true }]}>
                <Input type="number"
                       style={{ width: '110px' }}
                       value={salaryFilter}
                       onChange={(e) => setSalaryFilter(e.target.value)}/>
            </Form.Item>
            {/*<Form.Item>*/}
                {/*<Button type="primary" htmlType="submit" loading={loading} onClick={() => setSalaryFilter('')}>*/}
                {/*    Filter*/}
                {/*</Button>*/}
            {/*</Form.Item>*/}
            <WorkersTable
                dataSource={filteredWorkers}
                loading={loading}
                pagination={pagination}
                setPagination={setPagination}
                setSorter={setSorter}
                renderFilterDropdown={renderFilterDropdown}
            />
        </Form.Item>
    );
};

export default FilterWorkerBySalary;
