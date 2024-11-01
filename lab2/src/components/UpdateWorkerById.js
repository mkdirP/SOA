// UpdateWorker.js
import React, { useState } from 'react';
import { notification } from 'antd';
import { updateWorkerById } from '../api/API';
import WorkerForm from '../form/WorkerForm';
import { XMLBuilder } from 'fast-xml-parser';

const UpdateWorker = () => {
    const [loading, setLoading] = useState(false);
    const [updatedWorker, setUpdatedWorker] = useState(null); // 新增状态来存储更新后的工人信息

    const onFinish = async (values) => {
        const { id, name, coordinates, salary, startDate, endDate, status, person } = values;

        if (id <= 0) {
            notification.error({ message: 'ID must be greater than 0' });
            return;
        }

        const requestBody = {
            name,
            coordinates: {
                x: coordinates.x,
                y: coordinates.y,
            },
            salary,
            startDate,
            endDate,
            status,
            person: {
                weight: person.weight,
                passportID: person.passportID,
                eyeColor: person.eyeColor,
                hairColor: person.hairColor,
            },
        };

        // 将请求体转换为 XML 格式
        const builder = new XMLBuilder();
        const xmlBody = builder.build({ Worker: requestBody });

        setLoading(true);
        try {
            const response = await updateWorkerById(id, xmlBody); // 获取返回的更新后的工人信息
            setUpdatedWorker(response.data); // 假设API返回的更新后的工人信息在response.data中
            notification.success({ message: 'Worker updated successfully' });
        } catch (error) {
            notification.error({ message: 'Failed to update worker' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Update Worker by ID</h2>
            <WorkerForm onFinish={onFinish} loading={loading} isUpdate={true} />
            {updatedWorker && ( // 如果有更新后的工人信息则显示
                <div style={{ marginTop: '20px' }}>
                    <h3>Updated Worker</h3>
                    <p>ID: {updatedWorker.id}</p>
                    <p>Name: {updatedWorker.name}</p>
                    <p>Coordinates: ({updatedWorker.coordinates.x}, {updatedWorker.coordinates.y})</p>
                    <p>Salary: {updatedWorker.salary}</p>
                    <p>Start Date: {updatedWorker.startDate}</p>
                    <p>End Date: {updatedWorker.endDate}</p>
                    <p>Status: {updatedWorker.status}</p>
                    <p>Weight: {updatedWorker.person.weight}</p>
                    <p>Passport ID: {updatedWorker.person.passportID}</p>
                    <p>Eye Color: {updatedWorker.person.eyeColor}</p>
                    <p>Hair Color: {updatedWorker.person.hairColor}</p>
                </div>
            )}
        </div>
    );
};

export default UpdateWorker;
