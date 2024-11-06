import axios from "axios";
import {parseXML} from "../../b1/api/API-b1";

const API_BASE_URL = 'http://localhost:8081/b2_war_exploded'; // 后端 API 地址

export const fireEmployeeById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/HRs/${id}` ,{
            // httpsAgent: agent,
            headers: {
                'Accept': 'application/xml', // 期望接收 XML 格式
                'Content-Type': 'application/xml' // 请求内容类型为 XML
            },
        });
        const worker = parseXML(response.data); // 解析 XML
        return worker; // 返回数组

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