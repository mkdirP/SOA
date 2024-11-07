import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/b1-1.0/v1'; // 后端 API 地址

export const parseXML = (xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    const workers = Array.from(xmlDoc.getElementsByTagName("Worker")); // 获取所有 Worker 元素

    return workers.map(worker => ({
        id: worker.getElementsByTagName("id")[1].textContent,
        name: worker.getElementsByTagName("name")[0].textContent,
        creationDate: worker.getElementsByTagName("creationDate")[0].textContent,
        salary: worker.getElementsByTagName("salary")[0].textContent,
        startDate: worker.getElementsByTagName("startDate")[0].textContent,
        // endDate: worker.getElementsByTagName("endDate")[0].textContent,
        endDate: worker.getElementsByTagName("endDate")[0]?.textContent || 'N/A',
        status: worker.getElementsByTagName("status")[0].textContent,
        organization: worker.getElementsByTagName("organization")[0].textContent,
        person: {
            eyeColor: worker.getElementsByTagName("eyeColor")[0].textContent,
            hairColor: worker.getElementsByTagName("hairColor")[0].textContent,
            passportId: worker.getElementsByTagName("passportId")[0].textContent,
            weight: worker.getElementsByTagName("weight")[0].textContent,
        },
        coordinate: {
            x: worker.getElementsByTagName("x")[0].textContent,
            y: worker.getElementsByTagName("y")[0].textContent,
        },
    }));
};
export const parseXMLGroup = (xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");

    const groupName  = Array.from(xmlDoc.getElementsByTagName("GroupName")); // 获取所有 Worker 元素
    return groupName.map(group => ({
        name: group.getElementsByTagName("name")[0].textContent,
        count: parseInt(group.getElementsByTagName("count")[0].textContent, 10)
    }));

};

// no-sort-filter
export const fetchWorkers = async (sorterString='', urlParams) => {
    try {
        const params = {};
        if (sorterString && typeof sorterString === 'string'){
            params.sort = sorterString.replace(/%2C/g, ',');
        }

        // 处理过滤参数（urlParams）
        if (urlParams) {
            // 使用 URLSearchParams 将查询字符串解析为键值对
            const urlParamsObj = new URLSearchParams(urlParams);
            for (const [key, value] of urlParamsObj.entries()) {
                params[key] = value;
            }
        }

        const response = await axios.get(`${API_BASE_URL}/workers`,{
            params,
                headers: {
                    'Accept': 'application/xml', // 期望接收 XML 格式
                    'Content-Type': 'application/xml' // 请求内容类型为 XML
            }
        });

        const workers = parseXML(response.data); // 解析 XML
        console.log('Parsed workers:', workers);
        return workers; // 返回数组
    } catch (error) {
        console.error('Error fetching workers:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        } else {
            console.error('Error message:', error.message);
        }
        throw error;
    }
};

// ok
export const addWorker = async (workerData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/workers`, workerData, {
            headers: {
                'Accept': 'application/xml', // 期望接收 XML 格式
                'Content-Type': 'application/xml' // 请求内容类型为 XML
            }
        });

        const workers = parseXML(response.data); // 解析 XML
        console.log(workers);
        return workers; // 返回数组

    } catch (error) {
        console.error('Error adding worker:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        } else {
            console.error('Error message:', error.message);
        }
        throw error;
    }
};

// ok
export const getWorkerById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/workers/${id}` ,{
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

export const updateWorkerById = async (id, xmlData) => {
    try {
        await axios.put(`${API_BASE_URL}/workers/${id}`, xmlData, {
            headers: {
                'Accept': 'application/xml', // 期望接收 XML 格式
                'Content-Type': 'application/xml' // 请求内容类型为 XML
            }});

        return true;

    } catch (error) {
        console.error('Error updating worker:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        } else {
            console.error('Error message:', error.message);
        }
        throw error;
    }
};

// ok
export const deleteWorker = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/workers/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting worker:', error);
        throw error;
    }
};

// no-sort-filter
export const filterWorkersBySalary = async (salary, sorterString='', urlParams) => {
    try {
        const params = {};
        if (sorterString && typeof sorterString === 'string'){
            params.sort = sorterString.replace(/%2C/g, ',');
        }

        // 处理过滤参数（urlParams）
        if (urlParams) {
            // 使用 URLSearchParams 将查询字符串解析为键值对
            const urlParamsObj = new URLSearchParams(urlParams);
            for (const [key, value] of urlParamsObj.entries()) {
                params[key] = value;
            }
        }

        const response = await axios.get(`${API_BASE_URL}/workers/low-salary/${salary}`, {
            params,
            headers: {
                'Accept': 'application/xml', // 期望接收 XML 格式
                'Content-Type': 'application/xml' // 请求内容类型为 XML
            }
        });
        const workers = parseXML(response.data); // 解析 XML
        console.log('Parsed workers:', workers);
        return workers; // 返回数组
    } catch (error) {
        console.error('Error filtering workers by salary:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        } else {
            console.error('Error message:', error.message);
        }
        throw error;
    }
};

export const groupWorkersByName = async (filter) => {
    try {
        const params = {
            filter: { ...filter },
            // sort: ['-name'] // Default sort
        };
        const response = await axios.get(`${API_BASE_URL}/workers/group-by-name`, { params });
        const workers = parseXMLGroup(response.data); // 解析 XML
        console.log('Parsed workers:', workers);
        return workers; // 返回数组
    } catch (error) {
        console.error('Error grouping workers by name:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        } else {
            console.error('Error message:', error.message);
        }
        throw error;
    }
};

// ok
export const getAverageSalary = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/workers/avg-salary`);
        // 使用正则表达式提取中间的数字部分
        const xmlData = response.data;
        const match = xmlData.match(/<avg-salary>([\d.]+)<\/avg-salary>/);

        if (match && match[1]) {
            const avgSalary = parseFloat(match[1]);
            console.log("Average Salary:", avgSalary);
            return avgSalary;
        } else {
            console.error("Failed to extract average salary.");
        }

    } catch (error) {
        console.error('Error fetching average salary:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        } else {
            console.error('Error message:', error.message);
        }
        throw error;
    }
};
