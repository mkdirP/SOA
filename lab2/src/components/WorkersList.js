import React, { useState } from 'react';
import {Button, Form} from 'antd';
import { fetchWorkers } from "../api/API";
import WorkersTable from "../form/WorkersTable";
import {filterAndSortData, renderFilterDropdown, useSortAndFilter} from "../util/sort-filter";

const WorkersList = () => {

    const [loading, setLoading] = useState(false);
    const [workers, setWorkers] = useState([
        // {
        //     id: 1,
        //     name: 'Alice',
        //     coordinates: { x: 35, y: 20 },
        //     creationDate: '2024-01-01',
        //     salary: 50000,
        //     startDate: '2022-03-15',
        //     endDate: '2023-12-30',
        //     status: 'Active',
        //     person: { weight: 65, passportID: 'A1234567', eyeColor: 'Blue', hairColor: 'Blonde' },
        // },
        // {
        //     id: 2,
        //     name: 'Alla',
        //     coordinates: { x: 90, y: 80 },
        //     creationDate: '2024-01-01',
        //     salary: 120000,
        //     startDate: '2022-03-15',
        //     endDate: '2023-12-30',
        //     status: 'Active',
        //     person: { weight: 167, passportID: 'A1234567', eyeColor: 'Blue', hairColor: 'Blonde' },
        // },
        // {
        //     id: 3,
        //     name: 'Alla',
        //     coordinates: { x: 90, y: 40 },
        //     creationDate: '2024-01-01',
        //     salary: 4000000,
        //     startDate: '2022-03-15',
        //     endDate: '2020-12-30',
        //     status: 'Active',
        //     person: { weight: 167, passportID: 'A1234567', eyeColor: 'Blue', hairColor: 'Blonde' },
        // },
        // {
        //     id: 4,
        //     name: 'Kalla',
        //     coordinates: { x: 80, y: 10 },
        //     creationDate: '2024-01-01',
        //     salary: 10000,
        //     startDate: '2022-03-15',
        //     endDate: '2023-12-30',
        //     status: 'Active',
        //     person: { weight: 188, passportID: 'A1234567', eyeColor: 'Blue', hairColor: 'Blonde' },
        // },
    ]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [sorter, setSorter] = useState({});
    const [showTable, setShowTable] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const filter = {}; // 根据需要定义过滤条件
            const sort = []; // 根据需要定义排序条件
            const workers = await fetchWorkers(filter, sort); // 获取工人数据
            setWorkers(workers);
            setShowTable(true); // 显示表格
        } catch (error) {
            console.error('Failed to fetch workers:', error);
        } finally {
            setLoading(false);
        }
    };

    // 解构赋值语法，它从 useSortAndFilter 返回的对象中提取了以下属性和方法
    const { filters, inputValues, handleFilterChange, handleInputChange, handleDeleteFilter } = useSortAndFilter();
    const paginatedData = filterAndSortData(workers, filters, sorter, pagination);


    // // 处理过滤条件的更新
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

    // // 渲染列的过滤器
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
        <Form.Item>
            <h2>All Workers</h2>
            <Button type="primary" onClick={handleSearch} style={{ marginBottom: 16 }}>
                Fetch Workers
            </Button>

            {Object.keys(filters).map((field) =>
                renderFilterDropdown(field, inputValues[field], handleInputChange, handleFilterChange, handleDeleteFilter)
            )}

            {showTable && (
                <WorkersTable
                    dataSource={paginatedData}
                    loading={loading}
                    pagination={pagination}
                    setPagination={setPagination}
                    setSorter={setSorter}
                    renderFilterDropdown={renderFilterDropdown}
                />
            )}
        </Form.Item>
    );
};

export default WorkersList;
