// 用于储存查找所有worker和查找低于指定工资的worker的返回的table
import React, {useState} from 'react';
import {Table, Input, Space, Pagination, Button, notification} from 'antd';
import { createStyles } from 'antd-style';
import {red} from "@ant-design/colors";

const useStyle = createStyles(({ css, token }) => {
    const { antCls } = token;
    return {
        customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
    };
});

// , pagination, setPagination, setSorter, renderFilterDropdown
const WorkersTable = ({ dataSource, loading, onSorterChange, onFilterChange, onFilterSubmit}) => {
    const showTotal = (total) => {
        return `共 ${total} 条`;
    };
    const { styles } = useStyle();
    const [pagination, setPagination] = useState({current: 1, pageSize: 10,});
    const [filter, setFilter] = useState({}); // 用于存储过滤条件
    const [filterInput, setFilterInput] = useState(''); // 存储用户输入的过滤条件
    // 定义不需要加单引号的字段
    const noQuoteFields = ['id', 'x', 'y', 'creationDate', 'endDate', 'organization', 'weight', 'salary'];

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
        onFilterSubmit(filterInput);  // 将过滤条件提交给父组件
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
            const regex = /(\w+)\[(eq|ne|gt|lt|lte|gte)]=(.+)/;
            const match = condition.match(regex);

            if (match) {
                const field = match[1];
                const operator = match[2];
                const value = match[3];
                if (!filterObj[field]) {
                    filterObj[field] = {};
                }
                filterObj[field][operator] = value;
            }
        });

        return filterObj;
    };

    // 将 filter 对象转换为 URL 参数
    const generateQueryParams = (filterObj) => {
        const params = new URLSearchParams();

        Object.keys(filterObj).forEach(field => {
            const conditions = filterObj[field];
            Object.entries(conditions).forEach(([condition, value]) => {
                // 根据字段名判断是否需要加单引号
                const formattedValue = noQuoteFields.includes(field) ? value : `'${value}'`;
                params.append(`filter[${field}]`, formattedValue);
            });
        });

        return params.toString();
    };

    // 计算当前页数据
    const startIndex = (pagination.current - 1) * pagination.pageSize;
    const filteredData = dataSource.filter(item => {
        return Object.keys(filter).every(field => {
            const fieldConditions = filter[field];
            const fieldValue = item[field];

            return Object.entries(fieldConditions).every(([condition, value]) => {
                switch (condition) {
                    case 'eq': return fieldValue === value;
                    case 'ne': return fieldValue !== value;
                    case 'gt': return fieldValue < value;
                    case 'lt': return fieldValue > value;
                    case 'gte': return fieldValue <= value;
                    case 'lte': return fieldValue >= value;
                    default: return true;
                }
            });
        });
    });


    const currentData = filteredData.slice(startIndex, startIndex + pagination.pageSize);
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
            <Space style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Filter (e.g. id[eq]=1)"
                    value={filterInput}
                    onChange={handleFilterChange}
                />
                <Input
                    placeholder="Page Size"
                    type="number"
                    onChange={(e) => {
                        const newSize = Number(e.target.value);

                        console.log("page", newSize)
                        if (newSize > 0) { // 确保输入的 pageSize 是正数
                            setPagination({
                                ...pagination,
                                current: 1,
                                pageSize: newSize,
                            });
                        }
                    }}
                />
                <Button type="primary"  onClick={handleFilterSubmit} style={{ marginBottom: 16 }}>
                    Apply Filter
                </Button>
                <Button type="primary" onClick={handleClearFilter} style={{ marginBottom: 16, marginLeft: 8 ,backgroundColor: 'red'}}>
                    Clear Filter
                </Button>
            </Space>
            <Table
                dataSource={currentData}
                loading={loading}
                rowKey="id"
                style={{ marginTop: '20px', overflow: 'auto'  }}
                className={styles.customTable}
                scroll={{ x: 'max-content' }} // 允许横向滚动
                pagination={false} // 禁用表格内置分页
                onChange={handleTableChange}
            >
                <Table.Column title="ID" dataIndex="id" fixed={"left"} sorter={{ compare: (a, b) => a.id - b.id, multiple: 1 }} />
                <Table.Column title="Name" dataIndex="name" fixed={"left"} sorter={{ compare: (a, b) => a.name.localeCompare(b.name), multiple: 2 }}/>
                <Table.Column title="X" dataIndex={['coordinate', 'x']} sorter={{ compare: (a, b) => a.coordinate.x - b.coordinate.x, multiple: 3 }} />
                <Table.Column title="Y" dataIndex={['coordinate', 'y']} sorter={{ compare: (a, b) => a.coordinate.y - b.coordinate.y, multiple: 4 }}  />
                <Table.Column title="Creation Date" dataIndex="creationDate" sorter={{ compare: (a, b) => new Date(a.creationDate) - new Date(b.creationDate), multiple: 5 }}  />
                <Table.Column title="Salary" dataIndex="salary" sorter={{ compare: (a, b) => a.salary - b.salary, multiple: 6 }}  />
                <Table.Column title="Start Date" dataIndex="startDate" sorter={{ compare: (a, b) => new Date(a.startDate) - new Date(b.startDate), multiple: 7 }} />
                <Table.Column title="End Date" dataIndex="endDate" sorter={{ compare: (a, b) => new Date(a.endDate) - new Date(b.endDate), multiple: 8 }} />
                <Table.Column title="Status" dataIndex="status" sorter={{ compare: (a, b) => a.status.localeCompare(b.status), multiple: 9 }}  />
                <Table.Column title="Weight" dataIndex={['person', 'weight']} sorter={{ compare: (a, b) => a.person.weight - b.person.weight, multiple: 10 }}  />
                <Table.Column title="Passport ID" dataIndex={['person', 'passportId']} sorter={{ compare: (a, b) => a.person.passportId - b.person.passportId, multiple: 11 }}/>
                <Table.Column title="Eye Color" dataIndex={['person', 'eyeColor']} sorter={{ compare: (a, b) => a.person.eyeColor.localeCompare(b.person.eyeColor), multiple: 12 }} />
                <Table.Column title="Hair Color" fixed={"right"} dataIndex={['person', 'hairColor']} sorter={{ compare: (a, b) => a.person.hairColor.localeCompare(b.person.hairColor), multiple: 13 }}  />
            </Table>
            <Pagination
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={dataSource.length}
                showTotal={(total) => showTotal(total)} // 显示总条目数
                onChange={(page, pageSize) => setPagination({ current: page, pageSize })} // 更新当前页和页面大小
                showQuickJumper={true} // 允许快速跳转到某一页
                style={{ marginTop: '16px', textAlign: 'right' }} // 右对齐
            />
        </div>
    );
};
// filterDropdown={() => renderFilterDropdown('coordinates.y')}

export default WorkersTable;
