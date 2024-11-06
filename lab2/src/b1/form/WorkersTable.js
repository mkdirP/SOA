// 用于储存查找所有worker和查找低于指定工资的worker的返回的table
import React, {useState} from 'react';
import {Table, Input, Space, Pagination} from 'antd';
import { createStyles } from 'antd-style';

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
const WorkersTable = ({ dataSource, loading }) => {
    const showTotal = (total) => {
        return `共 ${total} 条`;
    };
    const { styles } = useStyle();
    const [pagination, setPagination] = useState({current: 1, pageSize: 10,});
    // 计算当前页数据
    const startIndex = (pagination.current - 1) * pagination.pageSize;
    const currentData = dataSource.slice(startIndex, startIndex + pagination.pageSize);

    return (
        <div>
            <Space style={{ marginBottom: 16 }}>
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
            </Space>
            <Table
                dataSource={currentData}
                loading={loading}
                rowKey="id"
                style={{ marginTop: '20px', overflow: 'auto'  }}
                className={styles.customTable}
                scroll={{ x: 'max-content' }} // 允许横向滚动
                pagination={false} // 禁用表格内置分页
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
                // showSizeChanger={true} // 允许用户更改页面大小
                showQuickJumper={true} // 允许快速跳转到某一页
                style={{ marginTop: '16px', textAlign: 'right' }} // 右对齐
            />
        </div>
    );
};
// filterDropdown={() => renderFilterDropdown('coordinates.y')}

export default WorkersTable;
