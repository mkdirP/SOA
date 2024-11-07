import React, { useState } from 'react';
import {Form, Input, Button, notification, Table, message} from 'antd';
import { moveEmployeeById } from '../api/API-b2';

const MoveEmployeeById = () => {
    const [loading, setLoading] = useState(false);

    const moveEmployee = async (values) => {
        const { workerId, idFrom, idTo } = values;
        setLoading(true);
        try {
            await moveEmployeeById(workerId, idFrom, idTo );
            message.success('Worker has been successfully fired');
        } catch (error) {
            notification.error({ message: 'Failed to fire worker' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Move Employee By ID</h2>
            <Form layout="vertical" onFinish={moveEmployee}>
                <Form.Item
                    label="Worker ID"
                    name="workerId"
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
                <Form.Item
                    label="ID from organization .."
                    name="idTo"
                    rules={[
                        { required: true, message: 'Please input the ID from ...' },
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
                <Form.Item
                    label="ID to organization .."
                    name="idFrom"
                    rules={[
                        { required: true, message: 'Please input the ID to ...' },
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
                        Move employee
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default MoveEmployeeById;
