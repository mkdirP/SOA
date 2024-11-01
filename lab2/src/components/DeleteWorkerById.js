import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { deleteWorker } from '../api/API'; // 假设有 deleteWorker API 方法

const DeleteWorkerById = ({ onRefresh }) => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const { id } = values;

        try {
            await deleteWorker(id); // 调用删除工人的 API
            message.success('Worker has been successfully deleted');
            onRefresh(); // 刷新工人列表
            form.resetFields(); // 清空表单
        } catch (error) {
            message.error('Failed to delete worker, please check if the ID is correct');
        }
    };

    return (
        <div>
            <h2>Delete Worker By ID</h2>
            <Form layout="vertical" form={form} onFinish={onFinish}>
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
                    <Button type="primary" htmlType="submit">
                        Delete Worker
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default DeleteWorkerById;
