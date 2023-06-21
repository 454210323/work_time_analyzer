import React, { useState, useEffect } from "react";
import { Form, Input, Select, Tooltip, Button } from "antd";
import { API_URL } from "../configs/config";
import useFetch from "../utils/useFetch";
import { useSelector } from "react-redux";

const { TextArea } = Input;
const { Option } = Select;

const WorkTimeInput = ({
  form,
  selectedDate,
  data,
  setOpen,
  setConfirmLoading,
}) => {
  const { user } = useSelector((state) => state);

  const [majorCategory, setMajorCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [subSubCategory, setSubSubCategory] = useState([]);

  const [selectedMajorCategory, setSelectedMajorCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState(null);

  const { loading: majorLoading } = useFetch(
    `${API_URL}/category?parent_category_id=`,
    setMajorCategory
  );
  const { loading: subLoading } = useFetch(
    `${API_URL}/category?parent_category_id=${selectedMajorCategory}`,
    setSubCategory
  );
  const { loading: subSubLoading } = useFetch(
    `${API_URL}/category?parent_category_id=${selectedSubCategory}`,
    setSubSubCategory
  );

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        work_date: selectedDate,
        major_category_id: data.major_category.id,
        sub_category_id: data.sub_category.id,
        sub_sub_category_id: data.sub_sub_category.id,
        work_time: data.work_time,
        work_content: data.work_content,
      });
      setSelectedMajorCategory(data.major_category.id);
      setSelectedSubCategory(data.sub_category.id);
      setSelectedSubSubCategory(data.sub_sub_category.id);
    } else {
      form.resetFields();
    }
  }, [data, form]);

  const onFinish = async (values) => {
    setConfirmLoading(true);
    values.user_id = user.id;
    values.work_date = selectedDate;
    values.seq = data ? data.seq : null;
    values.major_category_id = selectedMajorCategory;
    values.sub_category_id = selectedSubCategory;
    values.sub_sub_category_id = selectedSubSubCategory;

    const url = `${API_URL}/work_data`;
    const method = data ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
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
      <Form.Item name="work_date" label="Current Date">
        <Tooltip title={`Current Date is ${selectedDate}`}>
          <span>{selectedDate}</span>
        </Tooltip>
      </Form.Item>

      <Form.Item
        name="major_category_id"
        label=""
        rules={[{ required: true, message: "Please select a major category!" }]}
      >
        <Select
          placeholder="Major Category"
          onChange={setSelectedMajorCategory}
        >
          {majorCategory.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.category_name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="sub_category_id"
        label=""
        rules={[{ required: true, message: "Please select a sub category!" }]}
      >
        <Select placeholder="Sub Category" onChange={setSelectedSubCategory}>
          {subCategory.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.category_name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="sub_sub_category_id"
        label=""
        rules={[
          { required: true, message: "Please select a sub-sub category!" },
        ]}
      >
        <Select
          placeholder="Sub-sub Category"
          onChange={setSelectedSubSubCategory}
        >
          {subSubCategory.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.category_name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="work_time"
        label=""
        normalize={(value) => parseFloat(value)}
        rules={[
          { required: true, message: "Please enter the work time!" },
          { type: "number",min:0,max:24, message: "Please enter a 0~24 number" },
        ]}
      >
        <Input
          style={{ width: 180 }}
          placeholder="Time (in hours)"
          type="number"
          suffix="H"
        />
      </Form.Item>

      <Form.Item
        name="work_content"
        label=""
        rules={[
          { required: true, message: "Please enter the work content!" },
          {
            max: 500,
            message: "Work content should not exceed 500 characters",
          },
        ]}
      >
        <TextArea placeholder="Work Content" rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button style={{ marginLeft: "10px" }} onClick={handleReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default WorkTimeInput;
