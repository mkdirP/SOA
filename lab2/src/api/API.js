import axios from 'axios';
// import * as fs from "fs";
// import * as https from "https";

const API_BASE_URL = 'https://127.0.0.1:18443/api/v1'; // 后端 API 地址

// const fs = require('fs');
// const https = require('https');
//
// const agent = new https.Agent({
//     ca: fs.readFileSync('../selfsigned.crt'),
// });

export const fetchWorkers = async (filter, sort) => {
    try {
        const params = {
            filter: { ...filter },
            // sort: sort.join(',')
        };
        const response = await axios.get(`${API_BASE_URL}/workers`, { params });//, { params }
        return response.data;
    } catch (error) {
        console.error('Error fetching workers:', error);
        throw error;
    }
};

export const addWorker = async (workerData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/workers`, workerData);
        return response.data;
    } catch (error) {
        console.error('Error adding worker:', error);
        throw error;
    }
};

export const getWorkerById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/workers/${id}` ,{
            // httpsAgent: agent,
            headers: {
                'X-Client-Cert': '-----BEGIN CERTIFICATE-----\n\n-----END CERTIFICATE', // 指定接受XML格式的响应

            },
            responseType: "document", // 确保将响应类型设置为XML文档
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching worker by ID:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        } else {
            console.error('Error message:', error.message);
        }
        throw error;
    }
};

export const updateWorkerById = async (id, workerData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/workers/${id}`, workerData);
        return response.data;
    } catch (error) {
        console.error('Error updating worker:', error);
        throw error;
    }
};

export const deleteWorker = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/workers/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting worker:', error);
        throw error;
    }
};

export const filterWorkersBySalary = async (salary, filter) => {
    try {
        const params = {
            filter: { ...filter },
            sort: ['id'] // Default sort
        };
        const response = await axios.get(`${API_BASE_URL}/workers/low-salary/${salary}`, { params });
        return response.data;
    } catch (error) {
        console.error('Error filtering workers by salary:', error);
        throw error;
    }
};

export const groupWorkersByName = async (filter) => {
    try {
        const params = {
            filter: { ...filter },
            sort: ['-name'] // Default sort
        };
        const response = await axios.get(`${API_BASE_URL}/workers/group-by-name`, { params });
        return response.data;
    } catch (error) {
        console.error('Error grouping workers by name:', error);
        throw error;
    }
};

export const getAverageSalary = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/workers/avg-salary`);
        return response.data;
    } catch (error) {
        console.error('Error fetching average salary:', error);
        throw error;
    }
};
