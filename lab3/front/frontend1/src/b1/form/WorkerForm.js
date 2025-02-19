import React from 'react';
import { Form, Input, Button, InputNumber, DatePicker, Select } from 'antd';

const { Option } = Select;
// add and update request table
const WorkerForm = ({ onFinish, loading, isUpdate }) => {
    return (
        <Form layout="vertical" onFinish={onFinish} >
            {isUpdate && (
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
            )}

            <Form.Item
                label="Name"
                name="name"
                rules={isUpdate ? [{ required: false }] :[{ required: true, message: 'Please input the worker name' }]}
                style={{  width: '20%' }}
            >
                <Input />
            </Form.Item>

            <Form.Item label="Coordinates" style={{ marginBottom: 0 }}>
                <Form.Item
                    name={['coordinates', 'x']}
                    label="X"
                    rules={isUpdate ? [{ required: false }] :[
                        { required: true, message: 'Please input the X coordinate' },
                        {
                            validator(_, value) {
                                if (!value || (Number.isInteger(Number(value)) && Number(value) > 0)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('X must be a positive integer'));
                            },
                        },
                    ]}
                    style={{ display: 'inline-block', width: '20%' }}
                >
                    <Input type="number"/>
                </Form.Item>

                <Form.Item
                    name={['coordinates', 'y']}
                    label="Y"
                    rules={[
                        { required: false }, // Y coordinate is optional
                        { type: 'number', message: 'Y coordinate must be a valid number', transform: (value) => (value ? Number(value) : value) },
                    ]}
                    style={{ display: 'inline-block', width: '20%', marginLeft: '50px' }}
                >
                    <Input type="number"/>
                </Form.Item>
            </Form.Item>

            <Form.Item
                label="Salary"
                name="salary"
                rules={isUpdate ? [{ required: false }] :[{ required: true, message: 'Please input the salary' },
                    {
                        validator(_, value) {
                            if (!value || (Number.isInteger(Number(value)) && Number(value) > 0)) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Salary must be a positive integer'));
                        },
                    },]}
                style={{  width: '20%' }}
            >
                <Input type="number"/>
            </Form.Item>

            <Form.Item
                label="Start Date"
                name="startDate"
                rules={isUpdate ? [{ required: false }] :[{ required: true, message: 'Please input the start date' }]}
            >
                <DatePicker showTime format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item
                label="End Date"
                name="endDate"
                rules={[{ required:false }]}
            >
                <DatePicker showTime format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item
                label="Status"
                name="status"
                rules={isUpdate ? [{ required: false }] :[{ required: true, message: 'Please select the worker status' }]}
                style={{  width: '46%' }}
            >
                <Select>
                    <Option value="FIRED">FIRED</Option>
                    <Option value="RECOMMENDED_FOR_PROMOTION">RECOMMENDED_FOR_PROMOTION</Option>
                    <Option value="REGULAR">REGULAR</Option>
                    <Option value="PROBATION">PROBATION</Option>
                </Select>
            </Form.Item>

            <Form.Item label="Person Information" style={{ marginBottom: 0 }}>
                <Form.Item
                    name={['person', 'weight']}
                    label="Weight"
                    rules={isUpdate ? [{ required: false }] :[
                        { type: 'number', min: 1, message: 'Weight must be greater than or equal to 0' },
                        { required: true, message: 'Please input the weight' },
                    ]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    name={['person', 'passportID']}
                    label="Passport ID"
                    rules={isUpdate ? [{ required: false }] :[{ required: true, message: 'Please input the passport ID' }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginLeft: '16px' }}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name={['person', 'eyeColor']}
                    label="Eye Color"
                    rules={isUpdate ? [{ required: false }] : [{ required: true, message: 'Please select the eye color' }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
                    <Select>
                        <Option value="GREEN">GREEN</Option>
                        <Option value="RED">RED</Option>
                        <Option value="BLACK">BLACK</Option>
                        <Option value="WHITE">WHITE</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name={['person', 'hairColor']}
                    label="Hair Color"
                    rules={ isUpdate ? [{ required: false }] : [{ required: true, message: 'Please select the hair color' }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginLeft: '16px' }}>
                    <Select>
                        <Option value="RED">RED</Option>
                        <Option value="BLUE">BLUE</Option>
                        <Option value="ORANGE">ORANGE</Option>
                        <Option value="WHITE">WHITE</Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {isUpdate ? 'Update Worker' : 'Add Worker'}
                    </Button>
                </Form.Item>
            </Form.Item>

        </Form>
    );
};

export default WorkerForm;
