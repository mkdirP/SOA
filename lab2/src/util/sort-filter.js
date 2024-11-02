import { useState } from 'react';
import {Button, Input} from "antd";

// 处理过滤条件的更新
export const useSortAndFilter = (initialFilters = {}) => {
    const [filters, setFilters] = useState(initialFilters);
    const [inputValues, setInputValues] = useState({});

    const handleFilterChange = (field, condition, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [field]: {
                condition,
                value: !isNaN(Number(value)) ? Number(value) : value // 如果是有效数字，使用数字；否则使用原值
            },
        }));
    };

    const handleInputChange = (field, value) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            [field]: value,
        }));
    };

    const handleDeleteFilter = (field) => {
        handleFilterChange(field, null, null); // 删除过滤器
        handleInputChange(field, ''); // 清空输入框
    };

    return {
        filters,
        inputValues,
        handleFilterChange,
        handleInputChange,
        handleDeleteFilter,
    };
};

// 数据过滤和排序的逻辑
export const filterAndSortData = (data, filters, sorter, pagination) => {
    const filteredData = data.filter((worker) => {
        return Object.keys(filters).every((field) => {
            const { condition, value } = filters[field];
            const fieldValue = field.includes('.')
                ? field.split('.').reduce((o, i) => o[i], worker)
                : worker[field];

            switch (condition) {
                case 'eq': return fieldValue === value;
                case 'ne': return fieldValue !== value;
                case 'gt': return fieldValue > value;
                case 'lt': return fieldValue < value;
                case 'gte': return fieldValue >= value;
                case 'lte': return fieldValue <= value;
                default: return true;
            }
        });
    });

    const sortedData = filteredData.sort((a, b) => {
        let result = 0;
        if (sorter.field) {
            const fieldValueA = sorter.field.includes('.')
                ? sorter.field.split('.').reduce((o, i) => o[i], a)
                : a[sorter.field];
            const fieldValueB = sorter.field.includes('.')
                ? sorter.field.split('.').reduce((o, i) => o[i], b)
                : b[sorter.field];

            if (sorter.order === 'ascend') {
                result = fieldValueA > fieldValueB ? 1 : -1;
            } else if (sorter.order === 'descend') {
                result = fieldValueA < fieldValueB ? 1 : -1;
            }
        }
        return result;
    });

    return sortedData.slice(
        (pagination.current - 1) * pagination.pageSize,
        pagination.current * pagination.pageSize
    );
};

// 渲染列的过滤器
export const renderFilterDropdown = (field, inputValue, handleInputChange, handleFilterChange, handleDeleteFilter) => (
    <div style={{ padding: 8 }}>
        <Input
            placeholder={`${field} (eq|ne|gt|lt|gte|lte)=value`}
            value={inputValue || ''} // 绑定输入框值
            onChange={(e) => {
                const value = e.target.value;
                handleInputChange(field, value); // 更新输入框值
                const [condition, filterValue] = value.split('=');
                handleFilterChange(field, condition, filterValue);
            }}
            style={{ marginBottom: 8, display: 'block' }}
        />
        <Button
            type="danger"
            onClick={() => handleDeleteFilter(field)}
            size="small"
            style={{ width: '100%' }}
        >
            Delete Filter
        </Button>
    </div>
);
