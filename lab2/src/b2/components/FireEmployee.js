import React, { useState } from 'react';
import { Form, Input, Button, notification, Table } from 'antd';
import { fireEmployeeById } from '../api/API-b2';
import WorkerTable from "../../b1/form/WorkerTable";

const FireEmployeeById = () => {
    const [workerData, setWorkerData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fireEmployee = async (values) => {
        const { id } = values;
        setLoading(true);
        try {
            const response = await fireEmployeeById(id);

            console.log(response);
            setWorkerData(response);
        } catch (error) {
            notification.error({ message: 'Failed to fetch worker data' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Get Worker By ID</h2>
            <Form layout="vertical" onFinish={fireEmployee}>
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
                        Fire employee
                    </Button>
                </Form.Item>
            </Form>

            {workerData && (
                <WorkerTable
                    dataSource={workerData}
                    rowKey="field"
                />
            )}
        </div>
    );
};

export default FireEmployeeById;