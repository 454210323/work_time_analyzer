import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Tooltip, Button, message } from 'antd';
import { API_URL } from '../configs/config'
import useFetch from '../utils/useFetch';
const { TextArea } = Input;
const { Option } = Select;

const WorkTimeInput = ({ form, date, setOpen, setConfirmLoading }) => {


  const [majorCategory, setMajorCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [subSubCategory, setSubSubCategory] = useState([]);

  const [selectedMajorCategory, setSelectedMajorCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState(null);

  const { loading: majorLoading } = useFetch(`${API_URL}/category/null`, setMajorCategory);
  const { loading: subLoading } = useFetch(`${API_URL}/category/${selectedMajorCategory || 'null'}`, setSubCategory);
  const { loading: subSubLoading } = useFetch(`${API_URL}/category/${selectedSubCategory || 'null'}`, setSubSubCategory);


  const onFinish = async (values) => {
    setConfirmLoading(true);
    values.majorCategory = selectedMajorCategory;
    values.subCategory = selectedSubCategory;
    values.subSubCategory = selectedSubSubCategory;
    const response = await fetch(`${API_URL}/work_data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    form.resetFields();
    setOpen(false);
    setConfirmLoading(false);
    const result = await response.json();
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="date" label="Current Date">
        <Tooltip title={`Current Date is ${date.format('YYYY-MM-DD')}`}>
          <span>{date.format('YYYY-MM-DD')}</span>
        </Tooltip>
      </Form.Item>

      <Form.Item name="majorCategory" label="" rules={[{ required: true, message: 'Please select a major category!' }]}>
        <Select placeholder="Major Category" onChange={setSelectedMajorCategory}>
          {majorCategory.map(category => (
            <Option key={category.id} value={category.id}>{category.name}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="subCategory" label="" rules={[{ required: true, message: 'Please select a sub category!' }]}>
        <Select placeholder="Sub Category" onChange={setSelectedSubCategory}>
          {subCategory.map(category => (
            <Option key={category.id} value={category.id}>{category.name}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="subSubCategory" label="" rules={[{ required: true, message: 'Please select a sub-sub category!' }]}>
        <Select placeholder="Sub-sub Category" onChange={setSelectedSubSubCategory}>
          {subSubCategory.map(category => (
            <Option key={category.id} value={category.id}>{category.name}</Option>
          ))}
        </Select>
      </Form.Item>


      <Form.Item
        name="workTime"
        label=''
        rules={[
          { required: true, message: 'Please enter the work time!' },
          // { type: 'number', min: 0, max: 24, message: 'Please enter a valid number between 0 and 24' },
        ]}
      >
        <Input style={{ width: 180, }} placeholder="Time (in hours)" type="number" suffix="H" />
      </Form.Item>

      <Form.Item
        name="workContent"
        label=''
        rules={[
          { required: true, message: 'Please enter the work content!' },
          { max: 500, message: 'Work content should not exceed 500 characters' },
        ]}
      >
        <TextArea placeholder="Work Content" rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button style={{ marginLeft: '10px' }} onClick={handleReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );

};

export default WorkTimeInput;
