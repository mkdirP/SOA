import React, { useState } from 'react';
import { Button, notification } from 'antd';
import { getAverageSalary } from '../api/API-b1';

const AverageSalary = () => {
    const [averageSalary, setAverageSalary] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchAverageSalary = async () => {
        setLoading(true);
        try {
            const avgSalary = await getAverageSalary();
            setAverageSalary(avgSalary);
        } catch (error) {
            notification.error({ message: 'Failed to fetch average salary' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Average Salary: {averageSalary}</h2>
            <Button type="primary" onClick={fetchAverageSalary} loading={loading}>
                Get Average Salary
            </Button>
        </div>
    );
};

export default AverageSalary;
