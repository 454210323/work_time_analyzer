import { Calendar, message, Badge, Switch, Modal, Form } from 'antd';
import { useState, useEffect } from 'react';
import { API_URL } from '../configs/config'
import dayjs from 'dayjs';
import WorkTimeInput from './WorkTimeInput';
import WorkTable from './WorkTable';

const CalendarView = () => {


    const [data, setData] = useState([]);
    const [selectedYM, setSelectedYM] = useState(dayjs().format('YYYY-MM'))
    const [selectedYMD, setSelectedYMD] = useState(dayjs().format('YYYY-MM-DD'))
    const [isModify, setIsModify] = useState(false)
    const [open, setOpen] = useState(false);

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
    }, [selectedYM, open]);


    const cellRender = (value) => {
        const formatValue = value.format('YYYY-MM-DD');
        const currentDateData = data.find(item => item.date === formatValue);
        if (currentDateData) {
            return (
                <ul style={{ listStyleType: "none", margin: "0", padding: "0" }}>
                    {currentDateData.data.map((item) => (
                        <li key={item.seq}>
                            <Badge status={item.type} text={item.work_content} />
                        </li>
                    ))}
                </ul>
            );
        }
        return <div></div>;
    };

    const onChange = (checked) => {
        setIsModify(checked)
    };


    const handleCancel = () => {
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
        setSelectedYMD(value.format('YYYY-MM-DD'))
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
            {/* <Modal
                title="Input you work time"
                open={open}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
            >
                <WorkTimeInput form={form} date={selectedYMD} setOpen={setOpen} setConfirmLoading={setConfirmLoading} />
            </Modal> */}
            <Modal
                title="Check you work time"
                width={1000}
                open={open}
                onCancel={handleCancel}
                footer={null}
            >
                <WorkTable date={selectedYMD} />
            </Modal>
        </>
    );
};

export default CalendarView;
