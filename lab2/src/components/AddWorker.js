import React, { useState } from 'react';
import { notification } from 'antd';
import { addWorker } from '../api/API';
import WorkerForm from '../form/WorkerForm';

const AddWorker = () => {
    const [loading, setLoading] = useState(false);
    const [addedWorker, setAddedWorker] = useState(null); // 新增状态来存储添加的工人信息

    const onFinish = async (values) => {
        const requestBody = {
            name: values.name,
            coordinates: {
                x: values.coordinates.x,
                y: values.coordinates.y,
            },
            salary: values.salary,
            startDate: values.startDate,
            endDate: values.endDate,
            status: values.status,
            person: {
                weight: values.person.weight,
                passportID: values.person.passportID,
                eyeColor: values.person.eyeColor,
                hairColor: values.person.hairColor,
            },
        };

        setLoading(true);
        try {
            const response = await addWorker(requestBody); // 获取返回的工人信息
            setAddedWorker(response.data); // 假设API返回的工人信息在response.data中
            notification.success({ message: 'Worker added successfully' });
        } catch (error) {
            notification.error({ message: 'Failed to add worker' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Add Worker</h2>
            <WorkerForm onFinish={onFinish} loading={loading} isUpdate={false} />
            {addedWorker && ( // 如果有新添加的工人信息则显示
                <div style={{ marginTop: '20px' }}>
                    <h3>Newly Added Worker</h3>
                    <p>Name: {addedWorker.name}</p>
                    <p>Coordinates: ({addedWorker.coordinates.x}, {addedWorker.coordinates.y})</p>
                    <p>Salary: {addedWorker.salary}</p>
                    <p>Start Date: {addedWorker.startDate}</p>
                    <p>End Date: {addedWorker.endDate}</p>
                    <p>Status: {addedWorker.status}</p>
                    <p>Weight: {addedWorker.person.weight}</p>
                    <p>Passport ID: {addedWorker.person.passportID}</p>
                    <p>Eye Color: {addedWorker.person.eyeColor}</p>
                    <p>Hair Color: {addedWorker.person.hairColor}</p>
                </div>
            )}
        </div>
    );
};

export default AddWorker;
