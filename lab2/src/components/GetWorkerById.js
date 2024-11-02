import React, { useState } from 'react';
import { Form, Input, Button, notification, Table } from 'antd';
import { getWorkerById } from '../api/API';
import { XMLParser } from 'fast-xml-parser';

const GetWorkerById = () => {
    const [workerData, setWorkerData] = useState(null);
    const [loading, setLoading] = useState(false);



    const fetchWorkerById = async (values) => {
        const { id } = values;

        setLoading(true);
        try {
            const response = await getWorkerById(id);

            // 解析 XML 数据
            // const parser = new XMLParser();
            // const jsonData = parser.parse(response);
            console.log(response); // 这里将是XML字符串或XML文档对象

            // 将解析后的数据存储到状态
            setWorkerData(response);
        } catch (error) {
            notification.error({ message: 'Failed to fetch worker data' });
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { title: 'Field', dataIndex: 'field', key: 'field' },
        { title: 'Value', dataIndex: 'value', key: 'value' },
    ];

    const dataSource = workerData
        ? [
            { field: 'ID', value: workerData.id },
            { field: 'Name', value: workerData.name },
            { field: 'Coordinates X', value: workerData.coordinates.x },
            { field: 'Coordinates Y', value: workerData.coordinates.y },
            { field: 'Creation Date', value: workerData.creationDate },
            { field: 'Salary', value: workerData.salary },
            { field: 'Start Date', value: workerData.startDate },
            { field: 'End Date', value: workerData.endDate },
            { field: 'Status', value: workerData.status },
            { field: 'Weight', value: workerData.person.weight },
            { field: 'Passport ID', value: workerData.person.passportID },
            { field: 'Eye Color', value: workerData.person.eyeColor },
            { field: 'Hair Color', value: workerData.person.hairColor },
        ]
        : [];

    return (
        <div>
            <h2>Get Worker By ID</h2>
            <Form layout="vertical" onFinish={fetchWorkerById}>
                <Form.Item
                    label="Worker ID"
                    name="id"
                    rules={[
                        { required: true, message: 'Please input the worker ID' },
                        {
                            validator(_, value) {
                                if (!value || (Number.isInteger(Number(value)) && Number(value) > 0)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('ID must be a positive integer'));
                            },
                        },
                    ]}
                    style={{  width: '20%' }}
                >
                    <Input type="number"/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Get Worker
                    </Button>
                </Form.Item>
            </Form>

            {workerData && (
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    rowKey="field"
                    style={{ marginTop: '20px' }}
                />
            )}
        </div>
    );
};

export default GetWorkerById;
