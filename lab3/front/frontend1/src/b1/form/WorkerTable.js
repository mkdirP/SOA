// 用于储存查找所有worker和查找低于指定工资的worker的返回的table
import React from 'react';
import { Table, Input, Space } from 'antd';

const WorkerTable = ({ dataSource }) => {
    return (
        <div>
            <Table
                dataSource={dataSource}
                rowKey="id"
                style={{ marginTop: '20px', overflow: 'auto'  }}
                scroll={{ x: 'max-content'}} // 允许横向滚动
            >
                <Table.Column title="ID" fixed={"left"} dataIndex="id" />
                <Table.Column title="Name" fixed={"left"} dataIndex="name"  />
                <Table.Column title="X" dataIndex={['coordinate', 'x']} />
                <Table.Column title="Y" dataIndex={['coordinate', 'y']} />
                <Table.Column title="Creation Date" dataIndex="creationDate" />
                <Table.Column title="Salary" dataIndex="salary"  />
                <Table.Column title="Start Date" dataIndex="startDate"  />
                <Table.Column title="End Date" dataIndex="endDate" />
                <Table.Column title="Status" dataIndex="status" />
                <Table.Column title="Weight" dataIndex={['person', 'weight']} />
                <Table.Column title="Passport ID" dataIndex={['person', 'passportId']}/>
                <Table.Column title="Eye Color" dataIndex={['person', 'eyeColor']} />
                <Table.Column title="Hair Color" fixed={"right"} dataIndex={['person', 'hairColor']} />
            </Table>
        </div>
    );
};

export default WorkerTable;
