import React from 'react'
import List from './component/List';
import { Popover } from 'antd'

interface Props {
}

const Recipe: React.FC<Props> = (props) => {
    return (
        <div className="wrapper">
            <Popover content='222' title="Title">
                <h2 style={{ margin: 20 }}>编辑列表</h2>
            </Popover>
            <List />
        </div>
    )
}

export default Recipe;