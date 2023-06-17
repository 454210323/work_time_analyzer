import { Calendar, message, Badge, Switch, Modal, Form } from 'antd';
import { useState, useEffect } from 'react';
import { API_URL } from '../configs/config'
import dayjs from 'dayjs';
import WorkTimeInput from './WorkTimeInput';

const CalendarView = () => {

    const [form] = Form.useForm();

    const [data, setData] = useState([]);
    const [selectedYM, setSelectedYM] = useState(dayjs().format('YYYY-MM'))
    const [selectedYMD, setSelectYMD] = useState(dayjs())
    const [isModify, setIsModify] = useState(false)
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${API_URL}/work_data/month/${selectedYM}`);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setData(data);
            } catch (error) {
                message.error(`Fetch error: ${error.message}`);
            }
        };
        fetchData();
    }, [selectedYM]);


    const cellRender = (value) => {
        const formatValue = value.format('YYYY-MM-DD');
        const currentDateData = data.find(item => item.date === formatValue);
        if (currentDateData) {
            return <Badge status='success' text={currentDateData.data} />
        }
        return <div></div>;
    };

    const onChange = (checked) => {
        setIsModify(checked)
    };


    const handleCancel = () => {
        form.resetFields();
        setOpen(false);
    };

    const onSelectIfModify = () => {
        setOpen(true);
    }

    const onSelectIfView = (value) => {
        const formatValue = value.format('YYYY-MM-DD');
        const currentDateData = data.find(item => item.date === formatValue);
        if (currentDateData) {
            message.success(`Data on ${formatValue}: ${currentDateData.data}`);
        } else {
            message.info(`No data on ${formatValue}`);
        }
    }

    const onSelect = (value) => {
        setSelectYMD(value)
        setSelectedYM(value.format('YYYY-MM'))
        if (isModify) {
            onSelectIfModify()
        } else {
            onSelectIfView(value)
        }
    };

    return (
        <>
            <Switch checkedChildren='Modify' unCheckedChildren='View' onChange={onChange} />
            <Calendar cellRender={cellRender} onSelect={onSelect} />
            <Modal
                title="Input you work time"
                open={open}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
            >
                <WorkTimeInput form={form} date={selectedYMD} setOpen={setOpen} setConfirmLoading={setConfirmLoading} />
            </Modal>
        </>
    );
};

export default CalendarView;
