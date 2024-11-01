import axios from 'axios';

const API_BASE_URL = 'http://localhost:18080/api/v1'; // 后端 API 地址

export const fetchWorkers = async (params) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/workers`, { params });
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
        const response = await axios.get(`${API_BASE_URL}/workers/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching worker by ID:', error);
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

export const filterWorkersBySalary = async (salary) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/workers/low-salary/${salary}`);
        return response.data;
    } catch (error) {
        console.error('Error filtering workers by salary:', error);
        throw error;
    }
};

export const groupWorkersByName = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/workers/group-by-name`);
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
