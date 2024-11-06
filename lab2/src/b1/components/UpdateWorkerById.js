// UpdateWorker.js
import React, { useState } from 'react';
import { notification } from 'antd';
import {getWorkerById, updateWorkerById, parseXML, parseXMLa} from '../api/API-b1';
import WorkerForm from '../form/WorkerForm';
import WorkerTable from "../form/WorkerTable";
import {js2xml} from "xml-js";

const UpdateWorker = () => {
    const [loading, setLoading] = useState(false);
    const [updatedWorker, setUpdatedWorker] = useState(null); // 新增状态来存储更新后的工人信息

    const updateWorker  = async (values) => {

        const originalWorkerData = await getWorkerById(values.id);

        // 将日期格式化为 "YYYY-MM-DD"
        const formattedStartDate = values.startDate ? values.startDate.format("YYYY-MM-DD") : null;
        const formattedEndDate = values.endDate ? values.endDate.format("YYYY-MM-DD") : null;

        console.log("end", values.endDate);

        setLoading(true);
        const requestBody = {
            WorkerDTO: {
                id:1,
                name: values.name || originalWorkerData[0].name,
                coordinates: {
                    x: values.coordinates?.x ?? originalWorkerData[0].coordinate.x,
                    y: values.coordinates?.y ?? originalWorkerData[0].coordinate.y,
                },
                salary: values.salary ?? originalWorkerData[0].salary,
                startDate: formattedStartDate ?? originalWorkerData[0].startDate,
                endDate: formattedEndDate ?? originalWorkerData[0].endDate,
                status: values.status ?? originalWorkerData[0].status,
                person: {
                    weight:  values.person?.weight ?? originalWorkerData[0].person.weight,
                    passportID: values.person?.passportID ?? originalWorkerData[0].person.passportId,
                    eyeColor: values.person?.eyeColor ?? originalWorkerData[0].person.eyeColor,
                    hairColor: values.person?.hairColor ?? originalWorkerData[0].person.hairColor,
                },
            }
        };

        console.log("requestBody",requestBody)

        // 使用 xml-js 库将 JSON 转为 XML
        const xmlOptions = { compact: true, ignoreComment: true, spaces: 4 };
        const xmlData = js2xml(requestBody, xmlOptions);

        setLoading(true);
        try {
            await updateWorkerById(values.id, xmlData); // 获取返回的更新后的工人信息

            const updatedWorkerData = await getWorkerById(values.id);
            setUpdatedWorker(updatedWorkerData); // 假设返回的数据是一个数组，取第一个元素

            console.log("upda", updatedWorkerData);

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
            <WorkerForm onFinish={updateWorker} loading={loading} isUpdate={true} />
            {updatedWorker && (
                <WorkerTable
                    dataSource={updatedWorker}
                    rowKey="field"
                />
            )}
        </div>
    );
};

export default UpdateWorker;
