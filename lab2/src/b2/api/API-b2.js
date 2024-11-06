import axios from "axios";

const API_BASE_URL = 'http://localhost:8081/b2_war_exploded/v1'; // 后端 API 地址

export const fireEmployeeById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/hrs/fire/${id}`);
        return response.data;

    } catch (error) {
        console.error('Error fetching worker by ID:', error);
        throw error;
    }
};

export const moveEmployeeById = async (workerId, idFrom, idTo) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/hrs/move/{workerId}/{idFrom}/{idTo}` );
        return response.data; // 返回数组

    } catch (error) {
        console.error('Error fetching worker by ID:', error);
        throw error;
    }
};