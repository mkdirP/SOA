import React, { useState } from 'react';
import { notification } from 'antd';
import { addWorker } from '../api/API-b1';
import WorkerForm from '../form/WorkerForm';
import {js2xml} from "xml-js";
import WorkerTable from "../form/WorkerTable";

const AddWorker = () => {
    const [loading, setLoading] = useState(false);
    const [addedWorker, setAddedWorker] = useState(null); // 新增状态来存储添加的工人信息

    const postWorker = async (values) => {
        // 将日期格式化为 "YYYY-MM-DD"
        const formattedStartDate = values.startDate ? values.startDate.format("YYYY-MM-DD") : null;
        const formattedEndDate = values.endDate ? values.endDate.format("YYYY-MM-DD") : null;

        const requestBody = {
            WorkerDTO: {
                id:1,
                name: values.name,
                coordinates: {
                    x: values.coordinates.x,
                    y: values.coordinates.y,
                },
                salary: values.salary,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                status: values.status,
                person: {
                    weight: values.person.weight,
                    passportID: values.person.passportID,
                    eyeColor: values.person.eyeColor,
                    hairColor: values.person.hairColor,
                },
            }
        };

        // 使用 xml-js 库将 JSON 转为 XML
        const xmlOptions = { compact: true, ignoreComment: true, spaces: 4 };
        const xmlData = js2xml(requestBody, xmlOptions);

        console.log("xml Data:\n", xmlData);

        setLoading(true);
        try {
            const response = await addWorker(xmlData); // 获取返回的工人信息

            console.log("add worker response", response);

            setAddedWorker(response); // 假设API返回的工人信息在response.data中
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
            <WorkerForm onFinish={postWorker} loading={loading} isUpdate={false} />
            {addedWorker && ( // 如果有新添加的工人信息则显示
                <WorkerTable
                    dataSource={addedWorker}
                    rowKey="field"
                />
            )}
        </div>
    );
};

export default AddWorker;
