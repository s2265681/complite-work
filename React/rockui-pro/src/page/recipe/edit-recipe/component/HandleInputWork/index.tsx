import React from 'react'
import './index.css'
import { Form, Input, Button, Checkbox,Select,Radio,Upload } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 9 },
};

interface Props{
}

const HandleInputWork:React.FC<Props>=(props)=>{

    return (
        <div className="wrapper">
        <Form.List name="recipeIngredientList[0].foodName">
            {(fields, { add, remove }) => {
            return (
                <div>
                {fields.map((field, index) => (
                    <Form.Item
                    label={index === 0 ? '' : ''}
                    required={false}
                    key={field.key}

                    >
                    <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        // name='foodname'
                        rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Please input passenger's name or delete this field.",
                        },
                        ]}
                        noStyle
                    >
                        <Input placeholder="passenger name" style={{ width: '60%' }} />
                    </Form.Item>
                    {fields.length > 1 ? (
                        <MinusCircleOutlined
                        className="dynamic-delete-button"
                        style={{ margin: '0 8px' }}
                        onClick={() => {
                            remove(field.name);
                        }}
                        />
                    ) : null}
                    </Form.Item>
                ))}
                <Form.Item>
                    <Button
                    type="dashed"
                    onClick={() => {
                        add();
                    }}
                    style={{ width: '60%' }}
                    >
                    <PlusOutlined /> Add field
                    </Button>
                </Form.Item>
                </div>
            );
            }}
        </Form.List>
        </div>
    )
}

export default HandleInputWork;