import React, { useState } from 'react';
import { Button, notification } from 'antd';
import { getAverageSalary } from '../api/API';

const AverageSalary = () => {
    const [averageSalary, setAverageSalary] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchAverageSalary = async () => {
        setLoading(true);
        try {
            const response = await getAverageSalary();
            setAverageSalary(response.average);
        } catch (error) {
            notification.error({ message: 'Failed to fetch average salary' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Average Salary</h2>
            <Button type="primary" onClick={fetchAverageSalary} loading={loading}>
                Get Average Salary
            </Button>
            {averageSalary !== null && <p>Average Salary: {averageSalary}</p>}
        </div>
    );
};

export default AverageSalary;
