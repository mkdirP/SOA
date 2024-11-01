// 用于储存查找所有worker和查找低于指定工资的worker的返回的table
import React from 'react';
import { Table, Input, Space } from 'antd';

const WorkersTable = ({ dataSource, loading, pagination, setPagination, setSorter, renderFilterDropdown }) => {
    return (
        <div>
            <Space style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Page"
                    type="number"
                    onChange={(e) => setPagination({ ...pagination, current: Number(e.target.value) })}
                    style={{ width: 100 }}
                />
                <Input
                    placeholder="Page Size"
                    type="number"
                    onChange={(e) => setPagination({ ...pagination, pageSize: Number(e.target.value) })}
                    style={{ width: 100 }}
                />
            </Space>
            <Table
                dataSource={dataSource}
                loading={loading}
                rowKey="id"
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: dataSource.length,
                    onChange: (page, pageSize) => setPagination({ current: page, pageSize }),
                }}
                onChange={(pagination, filters, sorter) => {
                    setPagination({
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                    });
                    setSorter(sorter);
                }}
            >
                <Table.Column title="ID" dataIndex="id" sorter={{ compare: (a, b) => a.id - b.id, multiple: 1 }} filterDropdown={() => renderFilterDropdown('id')} />
                <Table.Column title="Name" dataIndex="name" sorter={{ compare: (a, b) => a.name.localeCompare(b.name), multiple: 2 }} filterDropdown={() => renderFilterDropdown('name')} />
                <Table.Column title="X" dataIndex={['coordinates', 'x']} sorter={{ compare: (a, b) => a.coordinates.x - b.coordinates.x, multiple: 3 }} filterDropdown={() => renderFilterDropdown('coordinates.x')} />
                <Table.Column title="Y" dataIndex={['coordinates', 'y']} sorter={{ compare: (a, b) => a.coordinates.y - b.coordinates.y, multiple: 4 }} filterDropdown={() => renderFilterDropdown('coordinates.y')} />
                <Table.Column title="Creation Date" dataIndex="creationDate" sorter={{ compare: (a, b) => new Date(a.creationDate) - new Date(b.creationDate), multiple: 5 }} filterDropdown={() => renderFilterDropdown('creationDate')} />
                <Table.Column title="Salary" dataIndex="salary" sorter={{ compare: (a, b) => a.salary - b.salary, multiple: 6 }} filterDropdown={() => renderFilterDropdown('salary')} />
                <Table.Column title="Start Date" dataIndex="startDate" sorter={{ compare: (a, b) => new Date(a.startDate) - new Date(b.startDate), multiple: 7 }} filterDropdown={() => renderFilterDropdown('startDate')} />
                <Table.Column title="End Date" dataIndex="endDate" sorter={{ compare: (a, b) => new Date(a.endDate) - new Date(b.endDate), multiple: 8 }} filterDropdown={() => renderFilterDropdown('endDate')} />
                <Table.Column title="Status" dataIndex="status" sorter={{ compare: (a, b) => a.status.localeCompare(b.status), multiple: 9 }} filterDropdown={() => renderFilterDropdown('status')} />
                <Table.Column title="Weight" dataIndex={['person', 'weight']} sorter={{ compare: (a, b) => a.person.weight - b.person.weight, multiple: 10 }} filterDropdown={() => renderFilterDropdown('person.weight')} />
                <Table.Column title="Passport ID" dataIndex={['person', 'passportID']} sorter={{ compare: (a, b) => a.person.passportID.localeCompare(b.person.passportID), multiple: 11 }} filterDropdown={() => renderFilterDropdown('person.passportID')} />
                <Table.Column title="Eye Color" dataIndex={['person', 'eyeColor']} sorter={{ compare: (a, b) => a.person.eyeColor.localeCompare(b.person.eyeColor), multiple: 12 }} filterDropdown={() => renderFilterDropdown('person.eyeColor')} />
                <Table.Column title="Hair Color" dataIndex={['person', 'hairColor']} sorter={{ compare: (a, b) => a.person.hairColor.localeCompare(b.person.hairColor), multiple: 13 }} filterDropdown={() => renderFilterDropdown('person.hairColor')} />
            </Table>
        </div>
    );
};

export default WorkersTable;
