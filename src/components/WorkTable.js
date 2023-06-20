import React, { useState, useEffect } from 'react';
import { Table, Modal, Form, Button, message } from 'antd';
import WorkTimeInput from './WorkTimeInput';
import { API_URL } from '../configs/config'
import { useSelector } from 'react-redux';

const WorkTable = ({ date }) => {
    const { user } = useSelector((state) => state);
    const [form] = Form.useForm();

    const [open, setOpen] = useState(false);
    const [rowData, setRowData] = useState(null);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [workData, setWorkData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_URL}/work_data/day/${user.id}/${date}`);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setWorkData(data)
            } catch (error) {
                message.error(`Fetch error: ${error.message}`);
            }
        };
        if (user.id) {
            fetchData();
        }
    }, [user.id, date, open]);

    const columns = [
        {
            title: 'Seq',
            dataIndex: 'seq',
            key: 'seq',
        },
        {
            title: 'Major Category',
            dataIndex: 'major_category',
            key: 'major_category',
            render: major_category => <span>{major_category.category_name}</span>,
        },
        {
            title: 'Sub Category',
            dataIndex: 'sub_category',
            key: 'sub_category',
            render: sub_category => <span>{sub_category.category_name}</span>,
        },
        {
            title: 'Sub-sub Category',
            dataIndex: 'sub_sub_category',
            key: 'sub_sub_category',
            render: sub_sub_category => <span>{sub_sub_category.category_name}</span>,
        },
        {
            title: 'Work Time',
            dataIndex: 'work_time',
            key: 'work_time',
        },
        {
            title: 'Work Content',
            dataIndex: 'work_content',
            key: 'work_content',
        }
    ];

    const handleRowClick = (record) => {
        setRowData(record);
        setOpen(true);
    };

    const handleCloseModal = () => {
        form.resetFields()
        setRowData(null);
        setOpen(false);
    };

    return (
        <div>
            <h2>{date}</h2>
            <Table
                columns={columns}
                dataSource={workData?.[0]?.data}
                rowKey="seq"
                onRow={(record, rowIndex) => {
                    return {
                        onClick: () => handleRowClick(record),
                    };
                }}
            />
            <Modal
                title="Input you work time"
                open={open}
                confirmLoading={confirmLoading}
                onCancel={handleCloseModal}
                footer={null}
            >
                <WorkTimeInput form={form} selectedDate={date} data={rowData} setOpen={setOpen} setConfirmLoading={setConfirmLoading} />
            </Modal>
            <br />
            <Button type="primary" onClick={() => { setRowData(null); setOpen(true); }}>Add New Work Data</Button>
        </div>
    );
};

export default WorkTable;
