import React, { useEffect } from 'react';
import { Form, Button } from 'antd';
import { Select, OptionsFetcher } from '../src';

import('antd/es/form/style');
import('antd/es/button/style');

export default {
  title: 'Widgets',
};

const fetchOptions: OptionsFetcher = keyword =>
  new Promise(resolve =>
    setTimeout(
      () =>
        resolve(
          Array(10)
            .fill(1)
            .map((_, index) => ({
              key: `${index}`,
              label: `${keyword ?? ''}-label${index}`,
              value: index,
            }))
        ),
      1000
    )
  );

export const SelectExamples = () => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFields([
      {
        name: 'test',
        value: [2, 3, 6],
      },
    ]);
  }, [form]);
  function handleSubmit() {
    // eslint-disable-next-line no-console
    console.log(form.getFieldsValue());
  }
  return (
    <Form form={form}>
      <Form.Item name="test">
        <Select<number[]>
          mode="multiple"
          allowClear
          fetchOptions={fetchOptions}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
