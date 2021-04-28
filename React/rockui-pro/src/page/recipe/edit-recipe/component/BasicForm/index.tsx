import React from 'react'
import { HashRouter as Router , Route, Link } from "react-router-dom";
import { Form, Input, Button, Checkbox,Select,Radio,Upload } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import HandleInputWork from '../HandleInputWork';
import LabelBtn from '../LabelBtn';
const {TextArea} = Input
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 9 },
};
const tailLayout = {
   wrapperCol: { offset:2, span: 8 },
};
interface Props{

}
const BasicForm:React.FC<Props>=(props)=> {

    const onFinish = (values: any)=> {
        console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
    
      const normFile = (e: { fileList: any; }) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      };
    return (
        <div>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="食谱名称"
                    name="username"
                    rules={[{ required: true, message: '食谱名称不能为空!' }]}
                    >
                    <Input placeholder="请填写食谱名称"/>
                </Form.Item>
                <Form.Item
                    label="设备品类"
                    name="devType"
                    rules={[{ required: true, message: '设备品类不能为空!' }]}
                    >
                    <Select placeholder="请选择设备品类">
                        <Select.Option value="1">高压锅</Select.Option>
                        <Select.Option value="2">电饼铛</Select.Option>
                    </Select>
                </Form.Item>    
                <Form.Item label="图文类型" 
                name="recipeType"
                rules={[{ required: true, message: '图文类型不能为空!' }]}
                initialValue="1"
                >
                <Radio.Group>
                  <Radio value="1">图文</Radio>
                  <Radio value="0">视频</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="recipePic"
                label="食品封面"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: '食品封面不能为空!' }]}
                extra="支持240*375px,jpg/jepg/png格式,最大不超过5M"
                >
                <Upload name="file" action="https://bizapi.csdn.net/blog-console-api/v3/upload/img?shuiyin=2" listType="picture">
                    <Button>
                       <UploadOutlined />上传文件
                    </Button>
                </Upload>
                </Form.Item>
                <Form.Item
                    label="介绍说明"
                    name="content"
                    rules={[{ required: true, message: '介绍说明不能为空!' }]}
                    >
                     <TextArea placeholder="请填写介绍说明"/>
                </Form.Item>
                <Form.Item
                    label="小贴士"
                    name="tip"
                    >
                      <TextArea placeholder="请填写小贴士"/>
                </Form.Item>
                <Form.Item
                 label="选择标签"
                 name='tagIdList'
                 valuePropName="value"
                 initialValue={[]}
                 rules={[{ required: true, message: '标签不能为空!' }]}
                >
                    <LabelBtn/>
                </Form.Item>
                <Form.Item 
                 name="recipeIngredientList"
                 label="食材准备"     
                 initialValue={[]}            
                 rules={[{ required: true, message: '食材准备不能为空!' }]}
                >
                   <HandleInputWork/>
               </Form.Item>

                <Form.Item {...tailLayout}>
                   <Link to="/recipe">
                    <Button type="default" style={{marginRight:20}}>取消</Button>
                    </Link>
                    <Button type="primary" htmlType="submit">
                      保存
                    </Button>
              </Form.Item>
            </Form>
        </div>
    )
}

export default BasicForm;