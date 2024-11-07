import React, {useState} from 'react';
import {Table, Input, Space, Pagination, Button, notification} from 'antd';

const GroupByNameTable = ({ dataSource, loading, onSorterChange, onFilterChange, onFilterSubmit}) => {


    const [filter, setFilter] = useState({}); // 用于存储过滤条件
    const [filterInput, setFilterInput] = useState(''); // 存储用户输入的过滤条件
    const noQuoteFields = ['value'];// 定义不需要加单引号的字段

    // 过滤条件输入框的变化
    const handleFilterChange = (e) => {
        setFilterInput(e.target.value); // 更新输入框的值
    };

    // 当点击"Apply Filter"按钮时
    const handleFilterSubmit = () => {

        const filterObj = parseFilterInput(filterInput);
        if (Object.keys(filterObj).length === 0) {
            notification.error({ message: '过滤条件格式不正确！' });
            return;
        }
        setFilter(filterObj); // 更新状态
        const urlParams = generateQueryParams(filterObj); // 转换成 URL 参数
        onFilterChange(urlParams); // 调用父组件的回调
    };

    // 当点击"Clear Filter"按钮时
    const handleClearFilter = () => {
        setFilterInput(''); // 清空输入框
        setFilter({}); // 清空过滤条件

        // 调用父组件的回调函数，传递空的过滤条件
        onFilterChange('');
    };

    // 解析用户输入的过滤条件（例如：salary[gt]=1000）
    const parseFilterInput = (input) => {
        const conditions = input.split(',').map((item) => item.trim());
        const filterObj = {};

        conditions.forEach((condition) => {
            const regex = /filter\[(\w+)]\s*=\s*(.+)/;
            const match = condition.match(regex);

            if (match) {
                let field = match[1];
                const value = match[2];
                // 如果字段是 count，则替换为 value
                if (field === 'count') {
                    field = 'value';
                }
                filterObj[field] = value;
            }
        });

        return filterObj;
    };

    // 将 filter 对象转换为 URL 参数
    const generateQueryParams = (filterObj) => {
        const params = new URLSearchParams();

        Object.keys(filterObj).forEach(field => {
            const value = filterObj[field];
            const formattedValue = noQuoteFields.includes(field) ? value : `'${value}'`;
            params.append(`filter[${field}]`, formattedValue);
        });

        return params.toString();
    };

    // 计算当前页数据
    // const startIndex = (pagination.current - 1) * pagination.pageSize;
    const filteredData = dataSource.filter(item => {
        return Object.keys(filter).every(field => {
            const value = filter[field];
            return item[field]?.toString() === value;
        });
    });


    // const currentData = filteredData.slice(startIndex, startIndex + pagination.pageSize);
    const handleTableChange = (pagination, filters, sorter) => {
        // 获取排序器
        let sorterString = '';
        if (Array.isArray(sorter)) {
            sorterString = sorter.map(s => {
                const field = s.field;
                const order = s.order === 'ascend' ? '' : '-';
                return `${order}${field}`;
            }).join(',');
        } else if (sorter.field) {
            const field = sorter.field;
            const order = sorter.order === 'ascend' ? '' : '-';
            sorterString = `${order}${field}`;
        }

        // 调用父组件的回调函数
        onSorterChange(sorterString);
    };


    return (
        <div>
            <Space style={{ marginBottom: 20 }}>
                <Input
                    placeholder="Filter (e.g. filter[name]=a)"
                    value={filterInput}
                    onChange={handleFilterChange}
                    style={{ width: '300px' }}
                />
                <Button type="primary"  onClick={handleFilterSubmit} style={{ marginBottom: 16 }}>
                    Apply Filter
                </Button>
                <Button type="primary" onClick={handleClearFilter} style={{ marginBottom: 16, marginLeft: 8 ,backgroundColor: 'red'}}>
                    Clear Filter
                </Button>
            </Space>
            <Table
                dataSource={filteredData}
                loading={loading}
                rowKey="id"
                style={{ marginTop: '20px', overflow: 'auto'  }}
                scroll={{ x: 'max-content' }} // 允许横向滚动
                pagination={false} // 禁用表格内置分页
                onChange={handleTableChange}
            >
                <Table.Column title="Name" dataIndex="name" sorter={{ compare: (a, b) => a.name.localeCompare(b.name), multiple: 1 }}/>
                <Table.Column title="Count" dataIndex="value" sorter={{ compare: (a, b) => a.value - b.value, multiple: 2}}  />
            </Table>
        </div>
    );
};

export default GroupByNameTable;
