import React from 'react'
// import {Button,Table,Divider} from 'antd';
import { Button, Table } from 'rockui';
import { Link } from "react-router-dom";
import { Popover } from 'antd'
import './index.css'

interface Props {
}

let a = true

const Recipe: React.FC<Props> = (props) => {

    const data = [{
        id: 1,  // 食谱id
        recipeName: '拔丝地瓜',
        recipePic: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=892160461,3145855963&fm=26&gp=0.jpg",
        status: '1',  // 状态 ： 开发中 |  已上线  上架 1 下架 0 , 上架之后只有查看， 下架后是编辑
        content: "拔丝地瓜真好吃"
    }]

    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: '名称',
        dataIndex: 'recipeName',
        key: 'recipeName',
    }, {
        title: '图片',
        dataIndex: 'recipePic',
        key: 'recipePic',
        render: (t: string) => <img style={{ width: 150, height: 150 }} src={t} alt={t}></img>
    }, {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
        width: 500
    }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (t: string) => t === '1' ? '已上架' : '开发中'
    }, {
        title: '操作',
        key: 'operation',
        render: (t: any, r: any) => {
            if (r.status === '1') {
                return <>
                    <Button btnType="link">查看</Button>
                    {/**<Divider type="vertical"/> */}

                    <Button btnType="link">下架</Button>
                </>
            } else {
                return <>
                    <Button btnType="link">编辑</Button>
                    {/**<Divider type="vertical"/> */}
                    <Button btnType="link">上架</Button>
                </>
            }
        }
    }]

    return (
        <div className="wrapper-list">
            <div className="header">
                <h3>内容列表</h3>
                {/* <Link to="editRecipe"> */}
                <Popover content="sss">
                    <Button btnType="primary">新增食谱</Button>
                </Popover>
                {/* </Link> */}
            </div>
            <Table
                columns={columns}
                dataSource={data}
            // rowKey="id"
            />
        </div>
    )
}

export default Recipe;