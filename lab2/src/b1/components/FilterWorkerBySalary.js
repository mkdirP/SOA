import React, { useState } from 'react';
import {Form, Input, Button, Table, notification, Space} from 'antd';
import {filterWorkersBySalary} from '../api/API-b1';
import WorkersTable from '../form/WorkersTable';
import {filterAndSortData, renderFilterDropdown, useSortAndFilter} from "../util/sort-filter";

const FilterWorkerBySalary = () => {
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [sorter, setSorter] = useState({});
    const [showTable, setShowTable] = useState(false);

    // const [filters, setFilters] = useState({});
    // const [inputValues, setInputValues] = useState({}); // 新增状态，用于存储输入框值
    // const [salaryFilter, setSalaryFilter] = useState('');


    const fetchWorkersBySalary = async (values) => {
        const { salary } = values;

        setLoading(true);
        try {
            const filter = {}; // 根据需要定义过滤条件
            const sort = []; // 根据需要定义排序条件
            const workers = await filterWorkersBySalary(salary);
            console.log(workers); // 这里将是XML字符串或XML文档对象
            setWorkers(workers);
            setShowTable(true); // 显示表格
        } catch (error) {
            notification.error({ message: 'Failed to filter workers' });
        } finally {
            setLoading(false);
        }
    };

    // 解构赋值语法，它从 useSortAndFilter 返回的对象中提取了以下属性和方法
    const { filters, inputValues, handleFilterChange, handleInputChange, handleDeleteFilter } = useSortAndFilter();
    const paginatedData = filterAndSortData(workers, filters, sorter, pagination);


    // 处理过滤条件的更新
    // const handleFilterChange = (field, condition, value) => {
    //     setFilters((prevFilters) => ({
    //         ...prevFilters,
    //         [field]: {
    //             condition,
    //             value: !isNaN(Number(value)) ? Number(value) : value // 如果是有效数字，使用数字；否则使用原值
    //         },
    //     }));
    // };
    //
    // // 更新输入框的值
    // const handleInputChange = (field, value) => {
    //     setInputValues((prevValues) => ({
    //         ...prevValues,
    //         [field]: value,
    //     }));
    // };
    //
    // // 删除过滤器和清空输入框
    // const handleDeleteFilter = (field) => {
    //     handleFilterChange(field, null, null); // 删除过滤器
    //     handleInputChange(field, ''); // 清空输入框
    // };
    //
    // // 数据过滤和排序
    // const filteredAndSortedData = workers
    //     .filter((worker) => {
    //         return Object.keys(filters).every((field) => {
    //             const { condition, value } = filters[field];
    //             const fieldValue = field.includes('.')
    //                 ? field.split('.').reduce((o, i) => o[i], worker)
    //                 : worker[field];
    //             switch (condition) {
    //                 case 'eq': return fieldValue === value;
    //                 case 'ne': return fieldValue !== value;
    //                 case 'gt': return fieldValue > value;
    //                 case 'lt': return fieldValue < value;
    //                 case 'gte': return fieldValue >= value;
    //                 case 'lte': return fieldValue <= value;
    //                 default: return true;
    //             }
    //         });
    //     })
    //     .sort((a, b) => {
    //         let result = 0;
    //         if (sorter.field) {
    //             const fieldValueA = sorter.field.includes('.')
    //                 ? sorter.field.split('.').reduce((o, i) => o[i], a)
    //                 : a[sorter.field];
    //             const fieldValueB = sorter.field.includes('.')
    //                 ? sorter.field.split('.').reduce((o, i) => o[i], b)
    //                 : b[sorter.field];
    //
    //             if (sorter.order === 'ascend') {
    //                 result = fieldValueA > fieldValueB ? 1 : -1;
    //             } else if (sorter.order === 'descend') {
    //                 result = fieldValueA < fieldValueB ? 1 : -1;
    //             }
    //         }
    //         return result;
    //     });

    // const paginatedData = filteredAndSortedData.slice(
    //     (pagination.current - 1) * pagination.pageSize,
    //     pagination.current * pagination.pageSize
    // );

    // 渲染列的过滤器
    // const renderFilterDropdown = (field) => (
    //     <div style={{ padding: 8 }}>
    //         <Input
    //             placeholder={`${field} (eq|ne|gt|lt|gte|lte)=value`}
    //             value={inputValues[field] || ''} // 绑定输入框值
    //             onChange={(e) => {
    //                 const value = e.target.value;
    //                 handleInputChange(field, value); // 更新输入框值
    //                 const [condition, filterValue] = value.split('=');
    //                 handleFilterChange(field, condition, filterValue);
    //             }}
    //             // onChange={(e) => {
    //             //     const [condition, value] = e.target.value.split('=');
    //             //     handleFilterChange(field, condition, value);
    //             // }}
    //             style={{ marginBottom: 8, display: 'block' }}
    //         />
    //         <Button
    //             type="danger"
    //             onClick={() => {
    //                 // handleFilterChange(field, null, null); // 删除过滤器
    //                 handleDeleteFilter(field)
    //             }}
    //             size="small"
    //             style={{ width: '100%' }}
    //         >
    //             Delete Filter
    //         </Button>
    //     </div>
    // );

    return (
        <div>
            <h2>Filter Worker By Salary</h2>
            <Form layout="vertical" onFinish={fetchWorkersBySalary}>
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
                    pagination={pagination}
                    setPagination={setPagination}
                    setSorter={setSorter}
                    renderFilterDropdown={renderFilterDropdown}
                />
            )}
        </div>
    );
};

export default FilterWorkerBySalary;
