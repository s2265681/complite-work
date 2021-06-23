import React from 'react';
import { Card, Row, Col } from 'antd';
import './index.css'


const ItemList = ({itemData})=>{
    return (
      <Card className="ItemContainer">
      <Row gutter={[16, 16]} className="RowList">
        {itemData.map(el=> 
          <Col xs={18} sm={12} md={8} lg={6} xl={6}>
            <div className="everyDiv">
              <img src={el.itemUrl} alt="" />
              <div>{el.title}</div>
              <div>{el.content}</div>
            </div>
          </Col>
        )}
      </Row>
    </Card>
    )
}

export default ItemList;