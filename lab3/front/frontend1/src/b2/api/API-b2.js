import axios from "axios";

const API_BASE_URL = 'http://localhost:8090/client'; // 后端 API 地址

export const fireEmployeeById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/fire/${id}`);
        console.log('Fire worker id:', id);
        return response.data;

    } catch (error) {
        console.error('Error fetching worker by ID:', error);
        throw error;
    }
};

export const moveEmployeeById = async (workerId, idFrom, idTo) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/move/${workerId}/${idFrom}/${idTo}` ,{
            // httpsAgent: agent,
            // headers: {
            //     'Accept': 'application/json', // 期望接收 XML 格式
            //     'Content-Type': 'application/json' // 请求内容类型为 XML
            // },
        });

        console.log('from:', idFrom);
        console.log('to:', idTo);
        return response.data; // 返回数组

    } catch (error) {
        console.log('id:', workerId);
        console.log('from:', idFrom);
        console.log('to:', idTo);
        console.error('Error fetching worker by ID:', error);
        throw error;
    }
};