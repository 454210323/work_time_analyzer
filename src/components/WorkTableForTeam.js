import React, { useState, useEffect } from 'react';
import { Table, message, Statistic } from 'antd';
import { API_URL } from '../configs/config'

const WorkTableForTeam = ({ user_id, selectedMonth }) => {

    const [workDatas, setWorkDatas] = useState([]);
    const [sumWorkTime, setSumWorkTime] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${API_URL}/work_data/month/${user_id}/${selectedMonth}`);
            if (!res.ok) {
                message.error('Network response was not ok');
                return;
            }
            const data = await res.json();
            const formattedData = data.flatMap(item =>
                item.data.map(work => ({
                    date: item.date,
                    major_category: work.major_category.category_name,
                    major_category_id: work.major_category.id,
                    sub_category: work.sub_category.category_name,
                    sub_category_id: work.sub_category.id,
                    sub_sub_category: work.sub_sub_category.category_name,
                    sub_sub_category_id: work.sub_sub_category.id,
                    work_time: work.work_time,
                    work_content: work.work_content
                }))
            );
            setWorkDatas(formattedData);
            setSumWorkTime(formattedData.reduce((prev, curr) => prev + curr.work_time, 0));
        };
        fetchData();
    }, [user_id, selectedMonth]);

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            filters: [...new Set(workDatas.map(item => item.date))].map(date => ({ text: date, value: date })),
            onFilter: (value, workData) => workData.date === value,
            sorter: (a, b) => new Date(a.date) - new Date(b.date),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Major Category',
            dataIndex: 'major_category',
            key: 'major_category',
            filters: [...new Set(workDatas.map(item => item.major_category))].map(category => ({ text: category, value: category })),
            onFilter: (value, workData) => workData.major_category === value,
            sorter: (a, b) => a.major_category_id - b.major_category_id,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Sub Category',
            dataIndex: 'sub_category',
            key: 'sub_category',
            filters: [...new Set(workDatas.map(item => item.sub_category))].map(category => ({ text: category, value: category })),
            onFilter: (value, workData) => workData.sub_category === value,
            sorter: (a, b) => a.sub_category_id - b.sub_category_id,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Sub-sub Category',
            dataIndex: 'sub_sub_category',
            key: 'sub_sub_category',
            filters: [...new Set(workDatas.map(item => item.sub_sub_category))].map(category => ({ text: category, value: category })),
            onFilter: (value, workData) => workData.sub_sub_category === value,
            sorter: (a, b) => a.sub_sub_category_id - b.sub_sub_category_id,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Work Time',
            dataIndex: 'work_time',
            key: 'work_time',
            sorter: (a, b) => a.work_time - b.work_time,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Work Content',
            dataIndex: 'work_content',
            key: 'work_content',
            sorter: (a, b) => a.work_content.length - b.work_content.length,
            sortDirections: ['descend', 'ascend'],
        }
    ];

    const handleTableChange = (pagination, filters, sorter, extra) => {
        if (extra.action === "filter") {
            const currentData = extra.currentDataSource;
            setSumWorkTime(currentData.reduce((prev, curr) => prev + curr.work_time, 0));
        }
    }

    return (
        <>
            <Table dataSource={workDatas} columns={columns} onChange={handleTableChange} pagination={false} />
            <Statistic title="Total Work Time" value={sumWorkTime + 'H'} />
        </>
    )
}

export default WorkTableForTeam;
